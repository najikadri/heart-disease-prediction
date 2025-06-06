import { useState } from "react";
import Card from "../../components/Card";
import { predictPatientRisk } from "../../utilities/api";

type PatientFormData = {
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
};

type RiskLevel = "high" | "normal" | null;

function PredictionPage() {
  const [formData, setFormData] = useState<Partial<PatientFormData>>({});
  const [riskLevel, setRiskLevel] = useState<RiskLevel>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (value === "") {
        const updated = { ...prev };
        delete updated[name as keyof PatientFormData];
        return updated;
      }
      return {
        ...prev,
        [name]: name === "Age" || name === "RestingBP" || name === "Cholesterol" || name === "MaxHR" || name === "Oldpeak" || name === "FastingBS"
          ? Number(value)
          : value
      };
    });
    setIsEvaluated(false);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock evaluation - replace with actual API call
    console.log("Evaluating risk with data:", formData);
    const prediction = await predictPatientRisk(formData as PatientFormData);
    const risk = prediction === 1 ? "high" : "normal";
    setRiskLevel(risk);
    setIsEvaluated(true);
  };

  const isFormValid = Object.keys(formData).length === 11;


  return (
    <div className="space-y-6">
      <Card
        title="Page Information"
        description="Enter patient details to quickly assess heart disease risk. This tool uses advanced machine learning to support your clinical decision-making."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Patient Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                <select
                  name="Sex"
                  value={formData.Sex || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chest Pain Type</label>
                <select
                  name="ChestPainType"
                  value={formData.ChestPainType || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="ATA">ATA</option>
                  <option value="NAP">NAP</option>
                  <option value="ASY">ASY</option>
                  <option value="TA">TA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resting BP (mm Hg)</label>
                <input
                  type="number"
                  name="RestingBP"
                  value={formData.RestingBP || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cholesterol (mg/dl)</label>
                <input
                  type="number"
                  name="Cholesterol"
                  value={formData.Cholesterol || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fasting Blood Sugar</label>
                <select
                  name="FastingBS"
                  value={formData.FastingBS?.toString() || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="0">≤ 120 mg/dl</option>
                  <option value="1">{"> 120 mg/dl"}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resting ECG</label>
                <select
                  name="RestingECG"
                  value={formData.RestingECG || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Normal">Normal</option>
                  <option value="ST">ST-T wave abnormality</option>
                  <option value="LVH">LVH</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Heart Rate</label>
                <input
                  type="number"
                  name="MaxHR"
                  value={formData.MaxHR || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Angina</label>
                <select
                  name="ExerciseAngina"
                  value={formData.ExerciseAngina || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Oldpeak</label>
                <input
                  type="number"
                  name="Oldpeak"
                  value={formData.Oldpeak || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  step="0.1"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ST Slope</label>
                <select
                  name="ST_Slope"
                  value={formData.ST_Slope || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Up">Up</option>
                  <option value="Flat">Flat</option>
                  <option value="Down">Down</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isFormValid ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 hover:cursor-pointer' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                Evaluate Risk
              </button>
            </div>
          </form>
        </div>

        {/* Results Card */}
        <div title="Evaluation Results">
          <div className="h-full flex flex-col justify-center">
            {isEvaluated ? (
              <div className={`p-6 rounded-lg ${riskLevel === 'high' ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                <div className="flex items-center">
                  <div className={`flex-shrink-0 h-12 w-12 rounded-full ${riskLevel === 'high' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} flex items-center justify-center`}>
                    {riskLevel === 'high' ? (
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className={`text-lg font-medium ${riskLevel === 'high' ? 'text-red-800' : 'text-green-800'}`}>
                      {riskLevel === 'high' ? 'High Risk Detected' : 'Normal Condition'}
                    </h3>
                    <div className={`mt-1 text-sm ${riskLevel === 'high' ? 'text-red-600' : 'text-green-600'}`}>
                      {riskLevel === 'high'
                        ? 'This patient shows significant risk factors for heart disease. Further evaluation recommended.'
                        : 'No significant heart disease risk factors detected based on provided information.'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-lg bg-gray-50 border border-gray-200 text-center text-gray-500">
                {Object.keys(formData).length > 0
                  ? 'Complete all fields and click "Evaluate" to assess risk'
                  : 'Enter patient details to evaluate heart disease risk'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionPage;