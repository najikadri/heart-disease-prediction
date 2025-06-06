import { useState } from "react";
import type { Patient } from "../types/Patient";
import PatientTable from "./PatientTable";

type Props = {
  patients: Patient[];
};

function PatientTableWithFilters({ patients }: Props) {
  // Filter states
  const [ageMin, setAgeMin] = useState<number | "">("");
  const [ageMax, setAgeMax] = useState<number | "">("");
  const [sex, setSex] = useState<"" | "M" | "F">("");
  const [heartDisease, setHeartDisease] = useState<"" | 0 | 1>("");

  // Filtering logic
  const filtered = patients.filter((p) => {
    if (ageMin !== "" && p.Age < Number(ageMin)) return false;
    if (ageMax !== "" && p.Age > Number(ageMax)) return false;
    if (sex !== "" && p.Sex !== sex) return false;
    if (heartDisease !== "" && p.HeartDisease !== heartDisease) return false;
    return true;
  });

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-4 items-end mb-4 p-4 rounded-lg bg-white shadow">
        {/* Age Min */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Age Min</label>
          <input
            type="number"
            min={0}
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value === "" ? "" : Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            placeholder="Min"
          />
        </div>
        {/* Age Max */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Age Max</label>
          <input
            type="number"
            min={0}
            value={ageMax}
            onChange={(e) => setAgeMax(e.target.value === "" ? "" : Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            placeholder="Max"
          />
        </div>
        {/* Sex */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Sex</label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value as "" | "M" | "F")}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          >
            <option value="">All</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        {/* Heart Disease */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Heart Disease</label>
          <select
            value={heartDisease}
            onChange={(e) => {
              const val = e.target.value;
              setHeartDisease(val === "" ? "" : Number(val) as 0 | 1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          >
            <option value="">All</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        {/* Reset Filters */}
        <button
          onClick={() => {
            setAgeMin(""); setAgeMax(""); setSex(""); setHeartDisease("");
          }}
          className="ml-2 px-5 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition cursor-pointer"
          style={{ minWidth: "80px" }}
        >
          Reset
        </button>
      </div>

      <PatientTable patients={filtered} />
    </div>
  );
}

export default PatientTableWithFilters;