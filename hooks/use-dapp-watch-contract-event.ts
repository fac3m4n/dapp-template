import { useTargetNetwork } from "./use-target-network";
import { Abi, ExtractAbiEventNames } from "abitype";
import { Log } from "viem";
import { useWatchContractEvent } from "wagmi";
import { addIndexedArgsToEvent, useDeployedContractInfo } from "@/hooks";
import { ContractAbi, ContractName, UseDappEventConfig } from "@/utils";

/**
 * Wrapper around wagmi's useEventSubscriber hook which automatically loads (by name) the contract ABI and
 * address from the contracts present in deployedContracts.ts & externalContracts.ts
 * @param config - The config settings
 * @param config.contractName - deployed contract name
 * @param config.eventName - name of the event to listen for
 * @param config.onLogs - the callback that receives events.
 */
export const useDappWatchContractEvent = <
  TContractName extends ContractName,
  TEventName extends ExtractAbiEventNames<ContractAbi<TContractName>>,
>({
  contractName,
  eventName,
  onLogs,
}: UseDappEventConfig<TContractName, TEventName>) => {
  const { data: deployedContractData } = useDeployedContractInfo(contractName);
  const { targetNetwork } = useTargetNetwork();

  const addIndexedArgsToLogs = (logs: Log[]) => logs.map(addIndexedArgsToEvent);
  const listenerWithIndexedArgs = (logs: Log[]) => onLogs(addIndexedArgsToLogs(logs) as Parameters<typeof onLogs>[0]);

  return useWatchContractEvent({
    address: deployedContractData?.address,
    abi: deployedContractData?.abi as Abi,
    chainId: targetNetwork.id,
    onLogs: listenerWithIndexedArgs,
    eventName,
  });
};
