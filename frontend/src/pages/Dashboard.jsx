import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container">
      <h1>Smart Healthcare Decision Assistant</h1>

      <div className="cards">

        <Link to="/bill">
          <div className="card">
            <h2>Medical Bill Analysis</h2>
            <p>Detect overcharged medical bills</p>
          </div>
        </Link>

        <Link to="/prescription">
          <div className="card">
            <h2>Prescription Comparison</h2>
            <p>Compare medicines and treatments</p>
          </div>
        </Link>

        <Link to="/crowd">
          <div className="card">
            <h2>Crowd Prediction</h2>
            <p>Predict waiting time in hospitals</p>
          </div>
        </Link>

      </div>
    </div>
  );
}

export default Dashboard;