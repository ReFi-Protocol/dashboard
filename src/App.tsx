import { ConnectKitButton } from "connectkit";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

function App() {
  return (
    <div>
      <ConnectKitButton />
      <UnifiedWalletButton />
    </div>
  );
}

export default App;
