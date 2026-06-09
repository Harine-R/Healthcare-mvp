import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import BillAnalysis from "./pages/BillAnalysis";
import PrescriptionComparison from "./pages/PrescriptionComparison";
import CrowdPrediction from "./pages/CrowdPrediction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bill" element={<BillAnalysis />} />
        <Route path="/prescription" element={<PrescriptionComparison />} />
        <Route path="/crowd" element={<CrowdPrediction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;