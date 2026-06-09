import { useState } from "react";
import API from "../services/api";

function CrowdPrediction() {

  const [form,setForm] = useState({
    hour:10,
    age:30,
    gender:"Female",
    department:"Cardiology"
  });

  const [result,setResult] = useState(null);

  const predict = async()=>{

    const res = await API.post(
      "/predict-crowd",
      form
    );

    setResult(res.data);
  };

  return (
    <div className="container">

      <h1>Crowd Prediction</h1>

      <input
        placeholder="Hour"
        onChange={(e)=>setForm({
          ...form,
          hour:Number(e.target.value)
        })}
      />

      <input
        placeholder="Age"
        onChange={(e)=>setForm({
          ...form,
          age:Number(e.target.value)
        })}
      />

      <button onClick={predict}>
        Predict
      </button>

      {result && (
        <div className="result">

          <h3>
            {result.crowd_level}
          </h3>

          <p>
            {result.estimated_wait_time}
          </p>

          <p>
            {result.recommendation}
          </p>

        </div>
      )}

    </div>
  );
}

export default CrowdPrediction;