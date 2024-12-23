import { wagmiConnectors } from "./wagmiConnectors";
import { Chain, createClient, fallback, http } from "viem";
import { hardhat, mainnet } from "viem/chains";
import { createConfig } from "wagmi";
import dappConfig from "@/dapp.config";
import { getAlchemyHttpUrl } from "@/utils";

const { targetNetworks } = dappConfig;

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
export const enabledChains = targetNetworks.find(
  (network: Chain) => network.id === 1
)
  ? targetNetworks
  : ([...targetNetworks, mainnet] as const);

export const wagmiConfig = createConfig({
  chains: enabledChains,
  connectors: wagmiConnectors,
  ssr: true,
  client({ chain }) {
    const alchemyHttpUrl = getAlchemyHttpUrl(chain.id);
    const rpcFallbacks = alchemyHttpUrl
      ? [http(alchemyHttpUrl), http()]
      : [http()];

    return createClient({
      chain,
      transport: fallback(rpcFallbacks),
      ...(chain.id !== (hardhat as Chain).id
        ? {
            pollingInterval: dappConfig.pollingInterval,
          }
        : {}),
    });
  },
});
