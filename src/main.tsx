import "./init";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { SolanaProvider } from "./web3/solana/SolanaProvider";
import App from "./App";
import "./index.css";
import { EvmProvider } from "./web3/evm/EvmProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <EvmProvider>
      <SolanaProvider>
        <App />
      </SolanaProvider>
    </EvmProvider>
  </BrowserRouter>,
);
