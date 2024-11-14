"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/services/web3/wagmiConfig";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Toaster } from "./ui/toaster";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useInitializeNativeCurrencyPrice } from "@/hooks";

const Dapp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export const DappWithProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar height="4px" color="#22d3ee" />
        <RainbowKitProvider>
          <Dapp>{children}</Dapp>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
