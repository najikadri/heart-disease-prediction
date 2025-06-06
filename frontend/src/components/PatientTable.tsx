// src/components/PatientTable.tsx

import React from "react";
import type { Patient } from "../types/Patient";

type PatientTableProps = {
  patients: Patient[];
};

const columns: { key: keyof Patient; label: string }[] = [
  { key: "Age", label: "Age" },
  { key: "Sex", label: "Sex" },
  { key: "ChestPainType", label: "Chest Pain" },
  { key: "RestingBP", label: "Resting BP" },
  { key: "Cholesterol", label: "Cholesterol" },
  { key: "FastingBS", label: "Fasting BS" },
  { key: "RestingECG", label: "Resting ECG" },
  { key: "MaxHR", label: "Max HR" },
  { key: "ExerciseAngina", label: "Exercise Angina" },
  { key: "Oldpeak", label: "Oldpeak" },
  { key: "ST_Slope", label: "ST Slope" },
  { key: "HeartDisease", label: "Heart Disease" },
];

const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className="px-4 py-2 text-xs font-semibold text-left text-gray-700 uppercase"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
                  {patient[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {patients.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;