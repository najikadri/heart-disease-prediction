import joblib
import logging
import sqlite3
import pandas as pd
from contextlib import asynccontextmanager
from enum import Enum
from pathlib import Path
from typing import Literal, Optional
from fastapi import FastAPI, Query, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field

# Get the logger for Uvicorn
uvicorn_logger = logging.getLogger("uvicorn.error")

# Define the paths for the model and database
model_filename = "hd_mdl.pkl"
model_path = Path(__file__).parent / "model" / model_filename
database_path = Path(__file__).parent / "database" / "heart_disease.db"


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the pre-trained model (make sure the model file is in the correct path)
    app.state.model = joblib.load(model_path)
    # Connect to the SQLite database
    app.state.db_connection = sqlite3.connect(database_path, check_same_thread=False)
    uvicorn_logger.info("[Startup] Model and database connection initialized.")
    yield # after this point, it is cleanup time
    app.state.db_connection.close()
    uvicorn_logger.info("[Shutdown] Database connection closed.")

app = FastAPI(lifespan=lifespan)

class HeartDiseaseFlag(int, Enum):
    NO_HEART_DISEASE = 0
    HEART_DISEASE = 1

    def __str__(self):
        return "Heart Disease" if self.value == 1 else "Normal"
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
    Oldpeak: float = Field(ge=-3, le=10)       # Numeric value measured in depression
    ST_Slope: Literal['Up', 'Flat', 'Down']

    class Config:
        extra = "forbid"  # Disallow extra fields

class Patient(PatientBase):
    PatientID: int = Field(alias="id")
    HeartDisease: Literal[0, 1]  # 0 for no heart disease, 1 for heart disease

    class Config:
        extra = "forbid"  # Disallow extra fields

@app.get("/status",
         description="server health status check",)
async def server_status():
    return { "status": "ok", "version": "1.0.0" }

@app.post("/predict",
          summary="Predict Heart Disease",
          description="Predict heart disease based on patient data",)
async def predict(patient: PatientBase):
    # Convert the patient data to a DataFrame for prediction
    df = pd.DataFrame([patient.model_dump()])
    result = int(app.state.model.predict(df)[0])
    return {
        "patient": patient,
        "prediction_label": "Heart Disease" if result == 1 else "Normal",
        "prediction": result,
    }

@app.get("/patients",
           summary="Get All Patients",
           description="Retrieve all patients from the database with optional filters",
           response_model=list[Patient],)
async def get_patients(
    age_min: Optional[int] = Query(None),
    age_max: Optional[int] = Query(None),
    gender: Optional[Literal['M', 'F']] = Query(None),
    heart_disease: Optional[HeartDiseaseFlag] = Query(None),
):
    # build the SQL query with optional filters
    filters = []
    params = []

    if age_min is not None:
        filters.append("Age >= ?")
        params.append(age_min)
    if age_max is not None:
        filters.append("Age <= ?")
        params.append(age_max)
    if gender is not None:
        filters.append("Sex = ?")
        params.append(gender)
    if heart_disease is not None:
        filters.append("HeartDisease = ?")
        params.append(heart_disease)

    where_clause = ""

    if filters:
        where_clause = "WHERE " + " AND ".join(filters)
    # Execute the query
    query = f"SELECT * FROM patients {where_clause}"

    df = pd.read_sql_query(query, app.state.db_connection, params=params)

    # Convert DataFrame rows to Patient objects
    patients = [Patient(**{str(k): v for k, v in row.items()}) for row in df.to_dict(orient="records")]
    return patients


@app.post("/patients",
           summary="Add a New Patient",
           description="Add a new patient to the database",)
async def add_patient(patient: PatientBase):
    try:
        patient_df = pd.DataFrame([patient.model_dump()])
        heart_disease = int(app.state.model.predict(patient_df)[0])

        cursor = app.state.db_connection.cursor()
        insert_query = """
            INSERT INTO patients (
                Age, Sex, ChestPainType, RestingBP, Cholesterol,
                FastingBS, RestingECG, MaxHR, ExerciseAngina,
                Oldpeak, ST_Slope, HeartDisease
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        values = (
            patient.Age,
            patient.Sex,
            patient.ChestPainType,
            patient.RestingBP,
            patient.Cholesterol,
            patient.FastingBS,
            patient.RestingECG,
            patient.MaxHR,
            patient.ExerciseAngina,
            patient.Oldpeak,
            patient.ST_Slope,
            heart_disease
        )
        cursor.execute(insert_query, values)
        app.state.db_connection.commit()

        # Get the auto-generated id
        new_id = cursor.lastrowid
        cursor.close()

        hd_flag = HeartDiseaseFlag(heart_disease)
        new_patient = Patient(**patient.model_dump(), id=new_id, HeartDisease=hd_flag.value)

        return JSONResponse(
            content={
            "message": "Patient added successfully", 
            "id": new_id,
            "patient": new_patient.model_dump(by_alias=True),
            },
            status_code=status.HTTP_201_CREATED
        )
    except Exception as e:
        uvicorn_logger.error("Error inserting patient: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error")