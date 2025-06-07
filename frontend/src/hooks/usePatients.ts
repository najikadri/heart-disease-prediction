import { useContext } from "react";
import { PatientsContext } from "../contexts/PatientsContext";

// Helper hook
export const usePatients = () => {
  const context = useContext(PatientsContext);
  if (!context) throw new Error("usePatients must be used within a PatientsProvider");
  return context;
};