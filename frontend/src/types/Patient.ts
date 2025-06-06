export type Patient = {
  id: number;
  Age: number;
  Sex: "M" | "F";
  ChestPainType: "ATA" | "NAP" | "ASY" | "TA";
  RestingBP: number;
  Cholesterol: number;
  FastingBS: 0 | 1;
  RestingECG: "Normal" | "ST" | "LVH";
  MaxHR: number;
  ExerciseAngina: "Y" | "N";
  Oldpeak: number;
  ST_Slope: "Up" | "Flat" | "Down";
  HeartDisease: 0 | 1;
};

export type PatientRiskPrediction = {
  Age: number;
  Sex: "M" | "F";
  ChestPainType: "ATA" | "NAP" | "ASY" | "TA";
  RestingBP: number;
  Cholesterol: number;
  FastingBS: 0 | 1;
  RestingECG: "Normal" | "ST" | "LVH";
  MaxHR: number;
  ExerciseAngina: "Y" | "N";
  Oldpeak: number;
  ST_Slope: "Up" | "Flat" | "Down";
}