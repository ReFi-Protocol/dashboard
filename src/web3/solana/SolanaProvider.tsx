import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";
import { Adapter } from "@solana/wallet-adapter-base";
import {
  AlphaWalletAdapter,
  AvanaWalletAdapter,
  BitgetWalletAdapter,
  BitpieWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  CoinhubWalletAdapter,
  FractalWalletAdapter,
  HuobiWalletAdapter,
  HyperPayWalletAdapter,
  KeystoneWalletAdapter,
  KrystalWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
  NekoWalletAdapter,
  NightlyWalletAdapter,
  NufiWalletAdapter,
  OntoWalletAdapter,
  ParticleAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SaifuWalletAdapter,
  SalmonWalletAdapter,
  SkyWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,
  SpotWalletAdapter,
  TokenaryWalletAdapter,
  TokenPocketWalletAdapter,
  TorusWalletAdapter,
  TrezorWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
  XDEFIWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import React, { useMemo } from "react";
import { env } from "../../env";
import { CLUSTER, ORIGIN } from "./const";

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  const wallets: Adapter[] = useMemo(() => {
    return [
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: CLUSTER,
        options: {
          projectId: env.REACT_APP_WALLETCONNECT_PROJECT_ID,
          metadata: {
            name: "",
            description: "",
            icons: [],
            url: ORIGIN,
          },
        },
      }),
      new TorusWalletAdapter(),
      new TrustWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new HuobiWalletAdapter(),
      new MathWalletAdapter(),
      new Coin98WalletAdapter(),
      new CloverWalletAdapter(),
      new BitgetWalletAdapter(),
      new NekoWalletAdapter(),
      new NightlyWalletAdapter(),
      new SalmonWalletAdapter(),
      new ParticleAdapter(),
      new AlphaWalletAdapter(),
      new AvanaWalletAdapter(),
      new BitpieWalletAdapter(),
      new CoinhubWalletAdapter(),
      new FractalWalletAdapter(),
      new KeystoneWalletAdapter(),
      new KrystalWalletAdapter(),
      new HyperPayWalletAdapter(),
      new LedgerWalletAdapter(),
      new NufiWalletAdapter(),
      new OntoWalletAdapter(),
      new SafePalWalletAdapter(),
      new SaifuWalletAdapter(),
      new SkyWalletAdapter(),
      new SolongWalletAdapter(),
      new SpotWalletAdapter(),
      new TokenaryWalletAdapter(),
      new TrezorWalletAdapter(),
      new TokenPocketWalletAdapter(),
      new XDEFIWalletAdapter(),
    ];
  }, []);

  return (
    <UnifiedWalletProvider
      wallets={wallets}
      config={{
        theme: "dark",
        autoConnect: true,
        env: CLUSTER,
        metadata: {
          name: "Dashboard",
          description: "Dashboard",
          url: ORIGIN,
          iconUrls: [],
        },
        walletlistExplanation: {
          href: "https://station.jup.ag/docs/additional-topics/wallet-list",
        },
      }}
    >
      {children}
    </UnifiedWalletProvider>
  );
};
