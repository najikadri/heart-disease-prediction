import type { Patient } from "../types/Patient";

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