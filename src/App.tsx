import { Routes, Route } from "react-router-dom";
import Layout from "./layouts";
import { fetchHistoricalPrice } from "./service";
import { useEffect } from "react";
import { useAppDispatch } from "./store";
import { setHistoricalPrices, setCurrentPrice } from "./store";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchHistoricalPrice().then((prices) => {
      dispatch(setHistoricalPrices(prices));
      const currentPrice = prices[prices.length - 1]?.[1] || 0;
      dispatch(setCurrentPrice(currentPrice));
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}

export default App;
