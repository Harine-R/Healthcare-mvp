import joblib
import pandas as pd

model = joblib.load("models/bill_model.pkl")


def analyze_bill(data):

    input_df = pd.DataFrame([{
        "age": data["age"],
        "sex": data["sex"],
        "bmi": data["bmi"],
        "children": data["children"],
        "smoker": data["smoker"],
        "region": data["region"]
    }])

    predicted_charge = float(model.predict(input_df)[0])

    actual_bill = float(data["actual_bill"])

    difference = actual_bill - predicted_charge

    if actual_bill > predicted_charge * 1.4:
        status = "Potential Overcharge"
        recommendation = "Review bill and request charge breakdown."
        billing_risk = "High"
    else:
        status = "Normal"
        recommendation = "Charges appear within expected range."
        billing_risk = "Low"

    overcharge_percentage = round(
        ((actual_bill - predicted_charge) / predicted_charge) * 100,
        2
    )

    estimated_savings = (
        round(actual_bill - predicted_charge, 2)
        if actual_bill > predicted_charge
        else 0
    )

    return {
        "predicted_charge": round(predicted_charge, 2),
        "actual_bill": actual_bill,
        "difference": round(difference, 2),
        "status": status,
        "recommendation": recommendation,
        "billing_risk": billing_risk,
        "overcharge_percentage": overcharge_percentage,
        "estimated_savings": estimated_savings,
        "financial_insight":
            f"Your bill is ₹{round(abs(difference),2)} "
            f"{'higher' if difference > 0 else 'lower'} than expected.",
        "patient_summary":
            f"Expected healthcare cost is around ₹{round(predicted_charge)}.",
        "next_step":
            "Request an itemized bill review if you suspect overcharging."
    }