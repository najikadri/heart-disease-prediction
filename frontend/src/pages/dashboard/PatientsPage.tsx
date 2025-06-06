import Card from "../../components/Card"
import PatientTableWithFilters from "../../components/PatientTableWithFilters";
import type { Patient } from "../../types/Patient";

// Suppose you load your patient data (from API or static import)
const dummies: Patient[] = [
  {
    Age: 52,
    Sex: "M",
    ChestPainType: "ATA",
    RestingBP: 125,
    Cholesterol: 212,
    FastingBS: 0,
    RestingECG: "Normal",
    MaxHR: 168,
    ExerciseAngina: "N",
    Oldpeak: 1.0,
    ST_Slope: "Up",
    HeartDisease: 0
  },
  {
    Age: 72,
    Sex: "F",
    ChestPainType: "ASY",
    RestingBP: 130,
    Cholesterol: 258,
    FastingBS: 0,
    RestingECG: "Normal",
    MaxHR: 150,
    ExerciseAngina: "Y",
    Oldpeak: 1.0,
    ST_Slope: "Flat",
    HeartDisease: 1
  },
  {
    Age: 58,
    Sex: "M",
    ChestPainType: "ASY",
    RestingBP: 136,
    Cholesterol: 198,
    FastingBS: 1,
    RestingECG: "LVH",
    MaxHR: 174,
    ExerciseAngina: "N",
    Oldpeak: 1.55,
    ST_Slope: "Down",
    HeartDisease: 1
  },
  // ...more patients
];

function PatientsPage() {
  return (
    <div className="flex flex-col gap-4 px-4">
      <Card title="Page Information"
        description="The patients records page allow you to see the complete patients data with filters." />
      <PatientTableWithFilters patients={dummies} />
    </div>
  );
}

export default PatientsPage;