import "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { type FC, type PropsWithChildren } from "react";

import PageWrapper from "@/components/page-wrapper";
import NotificationDialogProvider from "@/contexts/NotificationDialog";
import TokenModalProvider from "@/contexts/TokenModal";
import { useColorMode } from "@/hooks/useColorMode";
import { queryClient } from "@/lib/react-query";
import { Chakra } from "@/styles/ChakraCustomProvider";
import "@/styles/globals.css";

import { type Theme, lightTheme, midnightTheme } from "@rainbow-me/rainbowkit";

import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  // goerli,
  // mainnet,
  // optimism,
  // polygon,
  // base,
  // zora,
  sepolia
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import "bootstrap/dist/css/bootstrap.min.css";


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    // mainnet,
    // polygon,
    // optimism,
    arbitrum,
    // base,
    // zora,
    sepolia,
    // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});


// this wrapper is necessary, as it must be nested inside the ChakraProvider,
// in that point can correctly read the colorMode
const RainbowWrapper: FC<PropsWithChildren> = ({ children }) => {

  return (
    <RainbowKitProvider
      chains={chains}
      theme={lightTheme({
        ...lightTheme.accentColors.red
      })}
      showRecentTransactions={true}
    >
      {children}
    </RainbowKitProvider>
  );
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Chakra>
            <RainbowWrapper>
              <PageWrapper>
                <NotificationDialogProvider>
                  <TokenModalProvider>
                    <Component {...pageProps} />
                  </TokenModalProvider>
                </NotificationDialogProvider>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              </PageWrapper>
            </RainbowWrapper>
          </Chakra>
        </QueryClientProvider>
      </WagmiConfig>
    </>
  );
}

export { getServerSideProps } from "@/styles/ChakraCustomProvider";
