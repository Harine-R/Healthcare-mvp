import { FaStethoscope, FaHeartPulse, FaNotesMedical } from "react-icons/fa6";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <FaStethoscope />
        <span>Healthcare Intelligence Suite</span>
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "var(--text-secondary)", background: "rgba(255,255,255,0.03)", padding: "6px 12px", borderRadius: "8px", border: "1px solid var(--card-border)", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <FaHeartPulse style={{ color: "var(--color-danger)", filter: "drop-shadow(0 0 5px var(--color-danger))" }} />
          <span>Pulse: 72 BPM</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "var(--text-secondary)", background: "rgba(255,255,255,0.03)", padding: "6px 12px", borderRadius: "8px", border: "1px solid var(--card-border)", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <FaNotesMedical style={{ color: "var(--color-primary)" }} />
          <span>Nodes: Active</span>
        </div>
        <div className="navbar-status">
          <span className="status-dot"></span>
          <span>AI Engine: Online</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
