import joblib
import pandas as pd
from pathlib import Path
from typing import Literal
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

model_filename = "hd_mdl.pkl"

# Load the pre-trained model (make sure the model file is in the correct path)
model = joblib.load(Path(__file__).parent / "model" / model_filename)

class PatientBase(BaseModel):
    Age: int = Field(ge=0, le=120)  # Reasonable age range for a patient
    Sex: Literal['M', 'F']
    ChestPainType: Literal['TA', 'ATA', 'NAP', 'ASY']
    RestingBP: int = Field(ge=0, le=300)   # Blood pressure in mm Hg
    Cholesterol: int = Field(ge=0, le=1000)   # Serum cholesterol in mg/dl
    FastingBS: Literal[0, 1]             # 1 if FastingBS > 120 mg/dl, else 0
    RestingECG: Literal['Normal', 'ST', 'LVH']
    MaxHR: int = Field(ge=60, le=202)         # Maximum heart rate achieved
    ExerciseAngina: Literal['Y', 'N']
    Oldpeak: float = Field(ge=0, le=10)       # Numeric value measured in depression
    ST_Slope: Literal['Up', 'Flat', 'Down']

class Patient(PatientBase):
    HeartDisease: Literal[0, 1]  # 0 for no heart disease, 1 for heart disease

@app.get("/",
         description="Test endpoint to check if the API is running",)
async def welcome():
    return {"message": "Welcome to the Heart Disease Prediction API"}

@app.post("/predict",
          summary="Predict Heart Disease",
          description="Predict heart disease based on patient data",)
async def predict(patient: PatientBase):
    # Convert the patient data to a DataFrame for prediction
    df = pd.DataFrame([patient.model_dump()])
    result = int(model.predict(df)[0])
    return {
        "patient": patient,
        "prediction_label": "Heart Disease" if result == 1 else "Normal",
        "prediction": result,
    }