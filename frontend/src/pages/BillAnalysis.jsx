import { useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import ResultCard from "../components/ResultCard";
import { FaFileInvoiceDollar, FaCircleInfo, FaArrowRight } from "react-icons/fa6";

function BillAnalysis() {
  const [form, setForm] = useState({
    age: 25,
    sex: "male",
    bmi: 25.0,
    children: 0,
    smoker: "no",
    region: "southwest",
    actual_bill: 25000,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await API.post("/analyze-bill", form);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze bill");
    } finally {
      setLoading(false);
    }
  };

  const badgeType =
    result?.billing_risk === "High"
      ? "danger"
      : result?.billing_risk === "Medium"
      ? "warning"
      : "success";

  return (
    <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <div className="page-header">
        <h1 className="page-title">Medical Bill Analysis</h1>
        <p className="page-subtitle">
          Audit medical charges against machine learning regressions trained on demographics and health stats.
        </p>
      </div>

      <div className="split-pane">
        {/* Left Input Card */}
        <div className="glass-card">
          <h2 className="card-title" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <FaFileInvoiceDollar style={{ color: "var(--color-primary)" }} />
            <span>Patient Profile & Bill Details</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid two-cols">
              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  className="form-input"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sex</label>
                <select
                  className="form-select"
                  value={form.sex}
                  onChange={(e) => setForm({ ...form, sex: e.target.value })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">BMI</label>
                <input
                  type="number"
                  step="0.1"
                  min="10"
                  max="60"
                  className="form-input"
                  value={form.bmi}
                  onChange={(e) => setForm({ ...form, bmi: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Children / Dependents</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  className="form-input"
                  value={form.children}
                  onChange={(e) => setForm({ ...form, children: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Smoker</label>
                <select
                  className="form-select"
                  value={form.smoker}
                  onChange={(e) => setForm({ ...form, smoker: e.target.value })}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Region</label>
                <select
                  className="form-select"
                  value={form.region}
                  onChange={(e) => setForm({ ...form, region: e.target.value })}
                >
                  <option value="southwest">Southwest</option>
                  <option value="southeast">Southeast</option>
                  <option value="northwest">Northwest</option>
                  <option value="northeast">Northeast</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: "24px" }}>
              <label className="form-label">Actual Bill Charged (₹)</label>
              <input
                type="number"
                min="0"
                className="form-input"
                placeholder="Enter hospital bill amount"
                value={form.actual_bill}
                onChange={(e) => setForm({ ...form, actual_bill: Number(e.target.value) })}
                required
              />
            </div>

            <button type="submit" className="btn" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Charges"}
            </button>
          </form>
        </div>

        {/* Right Output Card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {loading && (
            <div className="glass-card" style={{ padding: "40px" }}>
              <Loader message="Querying cost distribution and predicting fair price..." />
            </div>
          )}

          {!loading && !result && (
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
              <img
                src="/assets/bill.png"
                alt="Audit Ready"
                style={{
                  maxWidth: "100%",
                  maxHeight: "180px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  boxShadow: "0 8px 24px rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              />
              <h3 className="card-title" style={{ color: "var(--text-muted)" }}>Ready for Audit</h3>
              <p style={{ fontSize: "0.85rem", maxWidth: "320px", marginTop: "6px" }}>
                Provide patient demographics and the actual billed amount on the left to check for overcharging risk.
              </p>
            </div>
          )}

          {!loading && result && (
            <ResultCard
              title="Audit Report"
              badgeText={`${result.billing_risk} Risk`}
              badgeType={badgeType}
            >
              <div className="result-summary">
                {result.financial_insight}
              </div>

              <div className="metrics-grid">
                <div className="metric-box">
                  <div className="metric-label">Predicted Fair Price</div>
                  <div className="metric-value highlight-primary">₹{result.predicted_charge}</div>
                </div>

                <div className="metric-box">
                  <div className="metric-label">Actual Bill Charged</div>
                  <div className="metric-value">₹{result.actual_bill}</div>
                </div>

                <div className="metric-box">
                  <div className="metric-label">Difference (Variance)</div>
                  <div className={`metric-value ${result.difference > 0 ? "highlight-danger" : "highlight-success"}`}>
                    {result.difference > 0 ? "+" : ""}₹{result.difference}
                  </div>
                </div>

                <div className="metric-box">
                  <div className="metric-label">Variance Percentage</div>
                  <div className={`metric-value ${result.overcharge_percentage > 40 ? "highlight-danger" : ""}`}>
                    {result.overcharge_percentage}%
                  </div>
                </div>
              </div>

              <ul className="result-list" style={{ marginTop: "20px" }}>
                <li className="result-list-item">
                  <FaCircleInfo />
                  <div>
                    <strong>Status:</strong> {result.status}
                  </div>
                </li>
                <li className="result-list-item">
                  <FaCircleInfo />
                  <div>
                    <strong>Recommendation:</strong> {result.recommendation}
                  </div>
                </li>
                <li className="result-list-item">
                  <FaArrowRight />
                  <div>
                    <strong>Action Item:</strong> {result.next_step}
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

export default BillAnalysis;