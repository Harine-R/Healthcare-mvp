import { FaStethoscope } from "react-icons/fa6";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <FaStethoscope />
        <span>Healthcare Intelligence Suite</span>
      </div>
      <div className="navbar-status">
        <span className="status-dot"></span>
        <span>AI Engine: Operational</span>
      </div>
    </header>
  );
}

export default Navbar;
