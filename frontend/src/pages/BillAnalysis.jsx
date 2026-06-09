import { useState } from "react";
import API from "../services/api";

function BillAnalysis() {

  const [form, setForm] = useState({
    age: 25,
    sex: "male",
    bmi: 25,
    children: 0,
    smoker: "no",
    region: "southwest",
    actual_bill: 25000
  });

  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await API.post("/analyze-bill", form);
      setResult(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to analyze bill");
    }
  };

  return (
    <div className="container">

      <h1>Medical Bill Analysis</h1>

      <input
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={(e) =>
          setForm({ ...form, age: Number(e.target.value) })
        }
      />

      <select
        value={form.sex}
        onChange={(e) =>
          setForm({ ...form, sex: e.target.value })
        }
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        type="number"
        step="0.1"
        placeholder="BMI"
        value={form.bmi}
        onChange={(e) =>
          setForm({ ...form, bmi: Number(e.target.value) })
        }
      />

      <input
        type="number"
        placeholder="Children"
        value={form.children}
        onChange={(e) =>
          setForm({ ...form, children: Number(e.target.value) })
        }
      />

      <select
        value={form.smoker}
        onChange={(e) =>
          setForm({ ...form, smoker: e.target.value })
        }
      >
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <select
        value={form.region}
        onChange={(e) =>
          setForm({ ...form, region: e.target.value })
        }
      >
        <option value="southwest">Southwest</option>
        <option value="southeast">Southeast</option>
        <option value="northwest">Northwest</option>
        <option value="northeast">Northeast</option>
      </select>

      <input
        type="number"
        placeholder="Actual Bill"
        value={form.actual_bill}
        onChange={(e) =>
          setForm({
            ...form,
            actual_bill: Number(e.target.value)
          })
        }
      />

      <button onClick={handleSubmit}>
        Analyze Bill
      </button>

      {result && (
  <div className="result">

    <h2>Bill Analysis Report</h2>

    <p>
      <strong>Predicted Charge:</strong>
      ₹{result.predicted_charge}
    </p>

    <p>
      <strong>Actual Bill:</strong>
      ₹{result.actual_bill}
    </p>

    <p>
      <strong>Difference:</strong>
      ₹{result.difference}
    </p>

    <p>
      <strong>Status:</strong>
      {result.status}
    </p>

    <p>
      <strong>Recommendation:</strong>
      {result.recommendation}
    </p>

    <p>
      <strong>Billing Risk:</strong>
      {result.billing_risk}
    </p>

    <p>
      <strong>Overcharge Percentage:</strong>
      {result.overcharge_percentage}%
    </p>

    <p>
      <strong>Estimated Savings:</strong>
      ₹{result.estimated_savings}
    </p>

    <p>
      <strong>Financial Insight:</strong>
      {result.financial_insight}
    </p>

    <p>
      <strong>Patient Summary:</strong>
      {result.patient_summary}
    </p>

    <p>
      <strong>Next Step:</strong>
      {result.next_step}
    </p>

  </div>
)}

    </div>
  );
}

export default BillAnalysis;