import joblib
import pandas as pd

model = joblib.load("models/crowd_model.pkl")


def predict_crowd(data):

    input_df = pd.DataFrame([{
        "hour": data["hour"],
        "Patient Age": data["age"],
        "Patient Gender": data["gender"],
        "Department Referral": data["department"]
    }])

    prediction = float(model.predict(input_df)[0])

    if prediction < 20:
        level = "Low"
        recommendation = "Good time to visit."
        best_time = "Current slot is ideal."
        waiting_risk = "Low"
        visit_decision = "Recommended Now"

    elif prediction < 40:
        level = "Medium"
        recommendation = "Moderate waiting expected."
        best_time = "Visit within the next hour."
        waiting_risk = "Medium"
        visit_decision = "Acceptable"

    else:
        level = "High"
        recommendation = "Consider visiting during non-peak hours."
        best_time = "Try visiting later in the day."
        waiting_risk = "High"
        visit_decision = "Consider Delaying"

    return {
        "predicted_wait_time_minutes": round(prediction, 2),
        "estimated_wait_time": f"{round(prediction)} minutes",
        "crowd_level": level,
        "recommendation": recommendation,
        "best_visit_advice": best_time,
        "patient_guidance": "Arrive 10-15 minutes early for registration.",
        "waiting_risk": waiting_risk,
        "visit_decision": visit_decision,
        "patient_summary": f"Current crowd level is {level}. Estimated waiting time is {round(prediction)} minutes."
    }