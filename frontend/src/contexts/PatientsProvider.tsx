import { useEffect, useState } from "react";
import type { Patient } from "../types/Patient";
import { fetchPatients } from "../utilities/api";
import { PatientsContext } from "./PatientsContext";


export const PatientsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PatientsContext.Provider value={{patients, loading}}>
      {children}
    </PatientsContext.Provider>
  );
};