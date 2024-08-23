import { Routes, Route } from "react-router-dom";
import Layout from "./layouts";
import { fetchHistoricalPrice, fetchRefiInfo } from "./service";
import { useEffect } from "react";
import { useAppDispatch } from "./store";
import {
  setHistoricalPrices,
  setCurrentPrice,
  setFullyDilutedValuation,
} from "./store";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchHistoricalPrice().then((prices) => {
      dispatch(setHistoricalPrices(prices));
    });
    fetchRefiInfo().then((info) => {
      const { current_price, fully_diluted_valuation } = info.market_data;

      dispatch(setCurrentPrice(current_price["usd"]));
      dispatch(setFullyDilutedValuation(fully_diluted_valuation["usd"]));
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}

export default App;
