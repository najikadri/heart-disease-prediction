import { createContext } from "react";
import type { Patient } from "../types/Patient";

type PatientsContextType = {
    patients: Patient[];
    loading: boolean;
};

export const PatientsContext = createContext<PatientsContextType | undefined>(undefined);