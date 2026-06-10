import { useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import ResultCard from "../components/ResultCard";
import { FaPills, FaCircleInfo, FaArrowRight, FaRotate } from "react-icons/fa6";

function PrescriptionComparison() {
  const [prescription1, setPrescription1] = useState("");
  const [prescription2, setPrescription2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleExample = () => {
    setPrescription1("Paracetamol, Amoxicillin, Ibuprofen");
    setPrescription2("Paracetamol, Azithromycin, Cetirizine");
  };

  const compare = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Split the comma or newline separated values into trimmed arrays of strings.
    const p1Array = prescription1
      .split(/[,\n]+/)
      .map((med) => med.trim())
      .filter(Boolean);

    const p2Array = prescription2
      .split(/[,\n]+/)
      .map((med) => med.trim())
      .filter(Boolean);

    if (p1Array.length === 0 || p2Array.length === 0) {
      alert("Please enter at least one medicine in both prescriptions.");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/compare-treatment", {
        prescription1: p1Array,
        prescription2: p2Array,
      });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to compare prescriptions");
    } finally {
      setLoading(false);
    }
  };

  const badgeType =
    result?.risk_indicator === "High"
      ? "danger"
      : result?.risk_indicator === "Medium"
      ? "warning"
      : "success";

  return (
    <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1 className="page-title">Prescription Comparison</h1>
          <p className="page-subtitle">
            Compare active substances, analyze overlap consistency, and find generic alternative suggestions.
          </p>
        </div>
        <button
          type="button"
          className="btn"
          style={{ background: "rgba(30, 41, 59, 0.5)", border: "1px solid var(--card-border)", padding: "8px 16px", fontSize: "0.85rem" }}
          onClick={handleExample}
        >
          <FaRotate /> Load Example
        </button>
      </div>

      <div className="split-pane">
        {/* Input Textareas */}
        <div className="glass-card">
          <h2 className="card-title" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <FaPills style={{ color: "var(--color-primary)" }} />
            <span>Prescription Auditing</span>
          </h2>
          <form onSubmit={compare}>
            <div className="form-group" style={{ marginBottom: "16px" }}>
              <label className="form-label">Prescription 1 (Medicines)</label>
              <textarea
                className="form-textarea"
                placeholder="Enter medicines (e.g. Paracetamol, Amoxicillin, Ibuprofen)"
                value={prescription1}
                onChange={(e) => setPrescription1(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label className="form-label">Prescription 2 (Medicines)</label>
              <textarea
                className="form-textarea"
                placeholder="Enter medicines to compare (e.g. Paracetamol, Azithromycin, Cetirizine)"
                value={prescription2}
                onChange={(e) => setPrescription2(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Comparing..." : "Compare Treatments"}
            </button>
          </form>
        </div>

        {/* Comparison Outputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {loading && (
            <div className="glass-card" style={{ padding: "40px" }}>
              <Loader message="Performing therapeutic class validation..." />
            </div>
          )}

          {!loading && !result && (
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
              <img
                src="/assets/prescription.png"
                alt="Comparison Ready"
                style={{
                  maxWidth: "100%",
                  maxHeight: "180px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  boxShadow: "0 8px 24px rgba(14, 165, 233, 0.15)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              />
              <h3 className="card-title" style={{ color: "var(--text-muted)" }}>Ready for Comparison</h3>
              <p style={{ fontSize: "0.85rem", maxWidth: "320px", marginTop: "6px" }}>
                Add prescription medicine names (comma or line separated) on the left to review alignment.
              </p>
            </div>
          )}

          {!loading && result && (
            <ResultCard
              title="Comparison Summary"
              badgeText={result.similarity_level}
              badgeType={badgeType}
            >
              <div className="result-summary">
                {result.patient_summary}
              </div>

              <div className="metrics-grid">
                <div className="metric-box">
                  <div className="metric-label">Similarity</div>
                  <div className="metric-value highlight-primary">{result.similarity_percentage}%</div>
                </div>

                <div className="metric-box">
                  <div className="metric-label">Consistency</div>
                  <div className={`metric-value ${result.treatment_consistency === "High" ? "highlight-success" : result.treatment_consistency === "Moderate" ? "highlight-primary" : "highlight-danger"}`}>
                    {result.treatment_consistency}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: "700", marginBottom: "10px" }}>Comparison Breakdown</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ fontSize: "0.85rem" }}>
                    <strong style={{ color: "var(--color-success)" }}>Common Medicines:</strong>{" "}
                    {result.common_medicines.length > 0 ? result.common_medicines.join(", ") : "None"}
                  </div>
                  <div style={{ fontSize: "0.85rem" }}>
                    <strong style={{ color: "var(--color-primary)" }}>Only in Rx 1:</strong>{" "}
                    {result.only_in_first.length > 0 ? result.only_in_first.join(", ") : "None"}
                  </div>
                  <div style={{ fontSize: "0.85rem" }}>
                    <strong style={{ color: "var(--color-warning)" }}>Only in Rx 2:</strong>{" "}
                    {result.only_in_second.length > 0 ? result.only_in_second.join(", ") : "None"}
                  </div>
                </div>
              </div>

              {result.medicine_details && result.medicine_details.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: "700", marginBottom: "8px" }}>Differing Drug Details</h4>
                  <div className="table-container">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Medicine</th>
                          <th>Category</th>
                          <th>Clinical Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.medicine_details.map((item, index) => (
                          <tr key={index}>
                            <td style={{ fontWeight: 600 }}>{item.medicine}</td>
                            <td>{item.category}</td>
                            <td>{item.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {Object.keys(result.alternative_suggestions).length > 0 && (
                <div style={{ marginBottom: "20px", padding: "12px", background: "rgba(14, 165, 233, 0.05)", border: "1px dashed rgba(14, 165, 233, 0.2)", borderRadius: "8px" }}>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "8px" }}>Alternative Drug Suggestions</h4>
                  {Object.entries(result.alternative_suggestions).map(([medicine, alternatives]) => (
                    <div key={medicine} style={{ fontSize: "0.85rem", marginBottom: "6px" }}>
                      <strong>{medicine} alternatives:</strong> {alternatives.join(", ")}
                    </div>
                  ))}
                </div>
              )}

              <ul className="result-list">
                <li className="result-list-item">
                  <FaCircleInfo />
                  <div>
                    <strong>Conclusion:</strong> {result.conclusion}
                  </div>
                </li>
                <li className="result-list-item">
                  <FaArrowRight />
                  <div>
                    <strong>Advice:</strong> {result.advice}
                  </div>
                </li>
              </ul>
            </ResultCard>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrescriptionComparison;