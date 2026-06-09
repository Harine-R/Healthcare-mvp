import { useState } from "react";
import API from "../services/api";

function PrescriptionComparison() {

  const [prescription1,setPrescription1] = useState("");
  const [prescription2,setPrescription2] = useState("");

  const [result,setResult] = useState(null);

  const compare = async () => {

  const res = await API.post("/compare-treatment", {
    prescription1,
    prescription2
  });

  console.log("API Response:");
  console.log(res.data);

  setResult(res.data);
};

  return (
    <div className="container">

      <h1>Prescription Comparison</h1>

      <textarea
        placeholder="Prescription 1"
        onChange={(e)=>setPrescription1(e.target.value)}
      />

      <textarea
        placeholder="Prescription 2"
        onChange={(e)=>setPrescription2(e.target.value)}
      />

      <button onClick={compare}>
        Compare
      </button>

      {result && (
  <div className="result">

    <h2>Prescription Comparison Report</h2>

    <p>
      <strong>Similarity Percentage:</strong>{" "}
      {result.similarity_percentage}%
    </p>

    <p>
      <strong>Similarity Level:</strong>{" "}
      {result.similarity_level}
    </p>

    <p>
      <strong>Treatment Consistency:</strong>{" "}
      {result.treatment_consistency}
    </p>

    <p>
      <strong>Risk Indicator:</strong>{" "}
      {result.risk_indicator}
    </p>

    <p>
      <strong>Conclusion:</strong>{" "}
      {result.conclusion}
    </p>

    <hr />

    <h3>Common Medicines</h3>
    <ul>
      {result.common_medicines.map((med, index) => (
        <li key={index}>{med}</li>
      ))}
    </ul>

    <h3>Only In First Prescription</h3>
    <ul>
      {result.only_in_first.map((med, index) => (
        <li key={index}>{med}</li>
      ))}
    </ul>

    <h3>Only In Second Prescription</h3>
    <ul>
      {result.only_in_second.map((med, index) => (
        <li key={index}>{med}</li>
      ))}
    </ul>

    <hr />

    <h3>Medicine Details</h3>

    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Medicine</th>
          <th>Purpose</th>
          <th>Category</th>
        </tr>
      </thead>

      <tbody>
        {result.medicine_details.map((item, index) => (
          <tr key={index}>
            <td>{item.medicine}</td>
            <td>{item.purpose}</td>
            <td>{item.category}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <hr />

    <h3>Alternative Suggestions</h3>

    {Object.entries(result.alternative_suggestions).map(
      ([medicine, alternatives]) => (
        <div key={medicine}>
          <strong>{medicine}</strong>

          <ul>
            {alternatives.map((alt, index) => (
              <li key={index}>{alt}</li>
            ))}
          </ul>
        </div>
      )
    )}

    <hr />

    <p>
      <strong>Patient Summary:</strong>{" "}
      {result.patient_summary}
    </p>

    <p>
      <strong>Advice:</strong>{" "}
      {result.advice}
    </p>

  </div>
)}

    </div>
  );
}

export default PrescriptionComparison;