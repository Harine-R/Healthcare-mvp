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
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <FaHeartPulse />
          <span>SmartCare</span>
        </Link>
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
