import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
import joblib

df = pd.read_csv("datasets/healthcare_analytics_patient_flow_data.csv")

df["Patient Admission Time"] = pd.to_datetime(
    df["Patient Admission Time"],
    errors="coerce"
)

df["hour"] = df["Patient Admission Time"].dt.hour

features = [
    "hour",
    "Patient Age",
    "Patient Gender",
    "Department Referral"
]

target = "Patient Waittime"

df = df.dropna(subset=features + [target])

X = df[features]
y = df[target]

categorical = [
    "Patient Gender",
    "Department Referral"
]

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical)
    ],
    remainder="passthrough"
)

model = Pipeline([
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(
        n_estimators=100,
        random_state=42
    ))
])

model.fit(X, y)

joblib.dump(model, "models/crowd_model.pkl")

print("Crowd model saved successfully")