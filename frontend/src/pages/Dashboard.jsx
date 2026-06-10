import { Link } from "react-router-dom";
import { FaFileInvoiceDollar, FaPills, FaUsers, FaArrowRight } from "react-icons/fa6";

function Dashboard() {
  const tools = [
    {
      title: "Medical Bill Analysis",
      desc: "Compare patient medical records against national insurance cost averages to identify overcharges and billing anomalies using ML regressions.",
      icon: <FaFileInvoiceDollar />,
      link: "/bill",
    },
    {
      title: "Prescription Comparison",
      desc: "Cross-reference alternative treatment formulations, matching therapeutic categories, chemical similarities, and available cheaper generic alternatives.",
      icon: <FaPills />,
      link: "/prescription",
    },
    {
      title: "Crowd Flow Prediction",
      desc: "Forecast real-time hospital department wait times and patient congestion patterns by slotting hours, patient demographics, and departments.",
      icon: <FaUsers />,
      link: "/crowd",
    },
  ];

  return (
    <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <div className="page-header">
        <h1 className="page-title">Healthcare Decision Cockpit</h1>
        <p className="page-subtitle">
          Predictive ML assistants designed to optimize healthcare spend, treatment accuracy, and hospital visits.
        </p>
      </div>

      {/* Hero Card */}
      <div
        className="glass-card hero-card"
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
          marginBottom: "40px",
          padding: "35px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1.3", minWidth: "300px" }}>
          <h2
            style={{
              fontSize: "1.8rem",
              marginBottom: "15px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #fff 30%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Smart Healthcare Decision Engine
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "25px", fontSize: "0.95rem" }}>
            Leverage advanced AI and predictive machine learning models to analyze medical billing, compare drug components, and forecast clinical waiting times in real-time.
          </p>
          <div style={{ display: "flex", gap: "30px" }}>
            <div>
              <strong style={{ fontSize: "1.6rem", color: "var(--color-primary)" }}>98%</strong>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "2px" }}>Audit Accuracy</div>
            </div>
            <div style={{ width: "1px", background: "var(--card-border)" }}></div>
            <div>
              <strong style={{ fontSize: "1.6rem", color: "var(--color-success)" }}>&lt; 5m</strong>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "2px" }}>Wait Predictor</div>
            </div>
            <div style={{ width: "1px", background: "var(--card-border)" }}></div>
            <div>
              <strong style={{ fontSize: "1.6rem", color: "var(--color-warning)" }}>10k+</strong>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "2px" }}>Drugs Mapped</div>
            </div>
          </div>
        </div>
        <div style={{ flex: "1", minWidth: "280px", display: "flex", justifyContent: "center" }}>
          <img
            src="/assets/hero.png"
            alt="Futuristic Health AI"
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "260px",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(14, 165, 233, 0.25)",
              border: "1px solid rgba(14, 165, 233, 0.2)",
            }}
          />
        </div>
      </div>

      <div className="dashboard-grid">
        {tools.map((tool, idx) => (
          <div key={idx} className="glass-card interactive">
            <div className="card-icon">{tool.icon}</div>
            <h2 className="card-title">{tool.title}</h2>
            <p className="card-desc">{tool.desc}</p>
            <Link to={tool.link} className="card-link">
              <span>Launch Tool</span>
              <FaArrowRight size={12} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;