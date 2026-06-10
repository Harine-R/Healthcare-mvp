import { useState } from "react";
import API from "../services/api";
import Loader from "../components/Loader";
import ResultCard from "../components/ResultCard";
import { FaUsers, FaCircleInfo, FaArrowRight } from "react-icons/fa6";

function CrowdPrediction() {
  const [form, setForm] = useState({
    hour: 10,
    age: 30,
    gender: "Female",
    department: "Cardiology",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await API.post("/predict-crowd", form);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to predict crowd waiting times");
    } finally {
      setLoading(false);
    }
  };

  const badgeType =
    result?.waiting_risk === "High"
      ? "danger"
      : result?.waiting_risk === "Medium"
      ? "warning"
      : "success";

  return (
    <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <div className="page-header">
        <h1 className="page-title">Crowd & Wait-time Prediction</h1>
        <p className="page-subtitle">
          Forecast emergency room and clinic congestion using Random Forest regression models.
        </p>
      </div>

      <div className="split-pane">
        {/* Input Form */}
        <div className="glass-card">
          <h2 className="card-title" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <FaUsers style={{ color: "var(--color-primary)" }} />
            <span>Visit Parameters</span>
          </h2>
          <form onSubmit={predict}>
            <div className="form-grid two-cols">
              <div className="form-group">
                <label className="form-label">Hour of Visit (0-23)</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  className="form-input"
                  value={form.hour}
                  onChange={(e) => setForm({ ...form, hour: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Patient Age</label>
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
                <label className="form-label">Patient Gender</label>
                <select
                  className="form-select"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Department Referral</label>
                <select
                  className="form-select"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="General Practice">General Practice</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Renal">Renal</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Neurology">Neurology</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn" style={{ width: "100%", marginTop: "10px" }} disabled={loading}>
              {loading ? "Calculating Wait Times..." : "Estimate Wait Time"}
            </button>
          </form>
        </div>

        {/* Prediction Output */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {loading && (
            <div className="glass-card" style={{ padding: "40px" }}>
              <Loader message="Auditing recent queue flows and model parameters..." />
            </div>
          )}

          {!loading && !result && (
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
              <img
                src="/assets/crowd.png"
                alt="Queue Predictor Ready"
                style={{
                  maxWidth: "100%",
                  maxHeight: "180px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  boxShadow: "0 8px 24px rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              />
              <h3 className="card-title" style={{ color: "var(--text-muted)" }}>Ready for Forecasting</h3>
              <p style={{ fontSize: "0.85rem", maxWidth: "320px", marginTop: "6px" }}>
                Select a department, target arrival slot, and patient age on the left to estimate wait times.
              </p>
            </div>
          )}

          {!loading && result && (
            <ResultCard
              title="Congestion Analysis"
              badgeText={`${result.crowd_level} Congestion`}
              badgeType={badgeType}
            >
              <div className="result-summary">
                {result.patient_summary}
              </div>

              <div className="metrics-grid">
                <div className="metric-box">
                  <div className="metric-label">Estimated Wait</div>
                  <div className="metric-value highlight-primary">{result.estimated_wait_time}</div>
                </div>

                <div className="metric-box">
                  <div className="metric-label">Visit Decision</div>
                  <div className={`metric-value ${result.visit_decision === "Recommended Now" ? "highlight-success" : result.visit_decision === "Acceptable" ? "highlight-primary" : "highlight-danger"}`}>
                    {result.visit_decision}
                  </div>
                </div>
              </div>

              <ul className="result-list">
                <li className="result-list-item">
                  <FaCircleInfo />
                  <div>
                    <strong>Recommendation:</strong> {result.recommendation}
                  </div>
                </li>
                <li className="result-list-item">
                  <FaCircleInfo />
                  <div>
                    <strong>Optimal Visit window:</strong> {result.best_visit_advice}
                  </div>
                </li>
                <li className="result-list-item">
                  <FaArrowRight />
                  <div>
                    <strong>Patient Guidance:</strong> {result.patient_guidance}
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

export default CrowdPrediction;