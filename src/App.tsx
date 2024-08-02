import { Routes, Route, Navigate } from "react-router-dom";

import MarketplaceLayout from "./layouts/marketplace";

function App() {
  return (
    <Routes>
      <Route path="marketplace/*" element={<MarketplaceLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;
