import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { web3config } from "./config";
import { WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export const EvmProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={web3config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
