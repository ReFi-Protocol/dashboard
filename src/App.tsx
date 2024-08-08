import { Routes, Route } from "react-router-dom";
import Layout from "./layouts";
import { ConnectKitButton } from "connectkit";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { useUmi } from "./web3/solana/hook";
import { mintNftFromCandyMachine } from "./web3/solana/service/create-nft";
import { publicKey } from "@metaplex-foundation/umi";
import { CANDY_MACHINE_ADDRESS } from "./web3/solana/const";

function App() {
  const umi = useUmi();

  async function handleClick() {
    const mint = await mintNftFromCandyMachine(
      umi,
      publicKey(CANDY_MACHINE_ADDRESS),
    );

    console.log(mint);
  }

  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}

export default App;
