import { Link, useLocation } from "react-router-dom";
import { FaHeartPulse, FaChartPie, FaFileInvoiceDollar, FaPills, FaUsers } from "react-icons/fa6";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <FaChartPie /> },
    { path: "/bill", label: "Bill Analysis", icon: <FaFileInvoiceDollar /> },
    { path: "/prescription", label: "Prescription Compare", icon: <FaPills /> },
    { path: "/crowd", label: "Crowd Prediction", icon: <FaUsers /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{ flexDirection: "column", alignItems: "flex-start", height: "auto", padding: "20px 24px", gap: "8px" }}>
        <Link to="/" className="sidebar-logo">
          <FaHeartPulse />
          <span>SmartCare</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "4px" }}>
          <span style={{ display: "inline-block", width: "6px", height: "6px", background: "var(--color-success)", borderRadius: "50%", boxShadow: "0 0 8px var(--color-success)" }}></span>
          <span>Core Engine Active</span>
        </div>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.path}
              className={`sidebar-item ${isActive ? "active" : ""}`}
            >
              <Link to={item.path}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="sidebar-footer">
        <span>© 2026 SmartCare AI</span>
      </div>
    </aside>
  );
}

export default Sidebar;
