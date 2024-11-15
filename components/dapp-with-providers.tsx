"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/services/web3/wagmiConfig";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Toaster } from "./ui/toaster";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useInitializeNativeCurrencyPrice } from "@/hooks";
import "@rainbow-me/rainbowkit/styles.css";
import { Header } from "./header";
import { Footer } from "./footer";

const Dapp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {children}
          <Footer />
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
