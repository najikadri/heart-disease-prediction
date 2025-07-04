# Heart Disease Prediction API – Backend

A FastAPI-based backend service for heart disease risk prediction and patient data management.
Uses a pre-trained ML model and a SQLite database.

---

## Features

* 🤖 **Prediction Endpoint** (`/predict`): Predicts heart disease risk from patient data.
* 📋 **Patient CRUD Endpoints**:

  * `GET /patients`: Retrieve patients with optional filters (age, gender, heart disease).
  * `POST /patients`: Add a new patient and auto-predict heart disease flag.
* 🛠️ **Database Setup Script**: `create_database.py` initializes and populates the SQLite database.
* 📄 **Auto-generated Docs**: Swagger UI available at `/docs` (and ReDoc at `/redoc`).
* ☁️ **CORS Enabled**: Allows cross-origin requests for frontend integration.

---

## Technologies Used

* **Python** (>=3.10)
* **FastAPI** for building the web API
* **Uvicorn** as ASGI server
* **SQLite** for lightweight, file‑based database
* **Pandas** for data handling
* **scikit-learn** & **joblib** for ML model loading and prediction
* **python-dotenv** (optional) for environment variables

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/najikadri/heart-disease-prediction.git
cd backend
```

### 2. Create & Activate a Python Virtual Environment (Recommended)

It is recommended to use a Python virtual environment to avoid dependency conflicts.

```bash
# Create a virtual environment (only needed once)
python -m venv venv

# Activate the environment:
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

Ensure you have [Python 3.10+](https://www.python.org/downloads/) installed.

```bash
pip install -r requirements.txt
```

### 4. Initialize the Database

Run the provided script to create and populate the SQLite database:

```bash
python create_database.py
```

> **Note:** This will replace any existing `heart_disease.db` in the `database/` folder.
> The script reads `data-analysis/data/heart.csv` and writes to `database/heart_disease.db`.

### 5. Run the FastAPI App

Start the fastapi dev server with auto-reload:

```bash
fastapi dev main.py
```

Alternatively, Start the Uvicorn server with auto-reload:

```bash
uvicorn main:app --reload --port 8000
```

* **Base URL:** `http://localhost:8000`
* **Swagger UI:** `http://localhost:8000/docs`
* **ReDoc:** `http://localhost:8000/redoc`

### 6. Test Endpoints with Postman (or any API client)

Use Postman to send requests and explore responses:

* **Health Check:** `GET http://localhost:8000/status`
* **Predict:** `POST http://localhost:8000/predict`

  ```json
  {
    "Age": 55,
    "Sex": "M",
    "ChestPainType": "ATA",
    "RestingBP": 140,
    "Cholesterol": 210,
    "FastingBS": 0,
    "RestingECG": "Normal",
    "MaxHR": 150,
    "ExerciseAngina": "N",
    "Oldpeak": 1.5,
    "ST_Slope": "Up"
  }
  ```
* **Get Patients:** `GET http://localhost:8000/patients?age_min=50&heart_disease=1`
* **Add Patient:** `POST http://localhost:8000/patients` with JSON body (same schema as predict).

---

## Project Structure

```
backend/
├── database/
│   ├── create_database.py   # Script to initialize SQLite database
│   └── heart_disease.db     # Generated by create_database.py
├── main.py                  # FastAPI application and endpoints
├── requirements.txt         # Python dependencies
├── model/                   # Serialized ML model (model from data-analysis folder)
│   └── hd_mdl.pkl
```

---

**Questions or issues?**
Open an issue or contact \[[najikadri2000@gmail.com](mailto:najikadri2000@gmail.com)].
