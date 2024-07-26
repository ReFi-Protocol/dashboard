import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { SolanaProvider } from "./web3/solana/SolanaProvider";
import App from "./App";
import { store } from "./store";
import "./index.css";
import { EvmProvider } from "./web3/evm/EvmProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <EvmProvider>
          <SolanaProvider>
            <App />
          </SolanaProvider>
        </EvmProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
