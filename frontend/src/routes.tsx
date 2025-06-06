import { createBrowserRouter, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import AnalysisPage from "./pages/dashboard/AnalysisPage";
import PatientsPage from "./pages/dashboard/PatientsPage";
import PredictionPage from "./pages/dashboard/PredictionPage";
import DashboardLayout from "./components/DashboardLayout";
import Topbar from "./components/Topbar";


// Type-safe route configuration
export const routes: RouteObject[] = [
    {
        path: "/",
        element: <DashboardLayout><Outlet /></DashboardLayout>,
        children: [
            { index: true, element: <><Topbar /><AnalysisPage /></> },
            { path: "patients", element: <><Topbar title="Patients Records" /><PatientsPage /></> },
            { path: "evaluation", element: <><Topbar title="Patient Evaluation" /><PredictionPage /></> },
        ]
    }
];

export const router = createBrowserRouter(routes);