import type { Patient, PatientRiskPrediction } from "../types/Patient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

export async function fetchPatients(): Promise<Patient[]> {
    const response = await fetch(apiUrl("/patients"));
    if (!response.ok) {
        console.log("testing error");
        throw new Error(`Error fetching patients: ${response.statusText}`);
    }
    return response.json();
}

export async function predictPatientRisk(patient: PatientRiskPrediction): Promise<number> {
    const response = await fetch(apiUrl("/predict"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
    });

    if (!response.ok) {
        throw new Error(`Error predicting patient risk: ${response.statusText}`);
    }

    return response.json().then(data => data.prediction);
}