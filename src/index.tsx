import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { SolanaProvider } from "./web3/solana/SolanaProvider";
import App from "./App";
import "./index.css";
import ReactGA from "react-ga4";
import { EvmProvider } from "./web3/evm/EvmProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./store";
import { GOOGLE_ID } from "./const";

ReactGA.initialize(GOOGLE_ID);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <EvmProvider>
        <SolanaProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </SolanaProvider>
      </EvmProvider>
    </BrowserRouter>
  </Provider>
);
