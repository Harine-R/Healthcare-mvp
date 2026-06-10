import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import BillAnalysis from "./pages/BillAnalysis";
import PrescriptionComparison from "./pages/PrescriptionComparison";
import CrowdPrediction from "./pages/CrowdPrediction";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bill" element={<BillAnalysis />} />
            <Route path="/prescription" element={<PrescriptionComparison />} />
            <Route path="/crowd" element={<CrowdPrediction />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;