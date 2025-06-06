import PatientsIcon from "../assets/PatientsIcon";
import type { Patient } from "../types/Patient";

type PatientTableProps = {
  patients: Patient[];
};

// Prioritize columns for different screen sizes
const mobileColumns = ["Age", "Sex", "HeartDisease"];
const tabletColumns = ["Age", "Sex", "ChestPainType", "RestingBP", "HeartDisease"];
const allColumns: { key: keyof Patient; label: string }[] = [
  { key: "id", label: "ID" },
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
    <div className="space-y-4">
      {/* Summary Card (unchanged) */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <PatientsIcon />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Patients</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-800">{patients.length}</span>
              <span className="text-sm text-gray-500">records</span>
            </div>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-white text-xs font-medium text-blue-600 border border-blue-200 shadow-sm">
          {patients.length > 0 ? (
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              Active
            </span>
          ) : (
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
              Empty
            </span>
          )}
        </div>
      </div>

      {/* Responsive Table */}
      <div className="space-y-4">
        {/* Desktop Table (lg screens and up) */}
        <div className="hidden lg:block overflow-x-auto rounded-lg shadow-lg bg-white border border-gray-100">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {allColumns.map(col => (
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
                  {allColumns.map(col => (
                    <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
                      {patient[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tablet View (md screens) */}
        <div className="hidden md:block lg:hidden overflow-x-auto rounded-lg shadow-lg bg-white border border-gray-100">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {allColumns
                  .filter(col => tabletColumns.includes(col.key))
                  .map(col => (
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
                  {allColumns
                    .filter(col => tabletColumns.includes(col.key))
                    .map(col => (
                      <td key={col.key} className="px-4 py-2 text-sm text-gray-700">
                        {patient[col.key]}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards (sm screens) */}
        <div className="md:hidden space-y-3">
          {patients.length > 0 ? (
            patients.map((patient, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:bg-gray-50">
                <div className="space-y-2">
                  {allColumns
                    .filter(col => mobileColumns.includes(col.key))
                    .map(col => (
                      <div key={col.key} className="flex justify-between">
                        <span className="text-xs font-medium text-gray-500">{col.label}</span>
                        <span className="text-sm text-gray-800">
                          {col.key === "HeartDisease" ? (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              patient[col.key] === 1 
                                ? "bg-red-100 text-red-800" 
                                : "bg-green-100 text-green-800"
                            }`}>
                              {patient[col.key] === 1 ? "High Risk" : "Normal"}
                            </span>
                          ) : (
                            patient[col.key]
                          )}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-blue-600">
                  <details>
                    <summary className="cursor-pointer">View full details</summary>
                    <div className="mt-2 space-y-2">
                      {allColumns
                        .filter(col => !mobileColumns.includes(col.key))
                        .map(col => (
                          <div key={col.key} className="flex justify-between">
                            <span className="text-xs font-medium text-gray-500">{col.label}</span>
                            <span className="text-xs text-gray-800">{patient[col.key]}</span>
                          </div>
                        ))}
                    </div>
                  </details>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow border border-gray-100 text-center text-gray-400">
              No data found.
            </div>
          )}
        </div>
      </div>

      {/* Footer Summary */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-2">
          <span>
            Showing <span className="font-medium text-gray-800">{patients.length}</span> patients
          </span>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
              <span>Low Risk: {patients.filter(p => p.HeartDisease === 0).length}</span>
            </span>
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
              <span>High Risk: {patients.filter(p => p.HeartDisease === 1).length}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTable;