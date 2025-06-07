import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { PatientsProvider } from "./contexts/PatientsProvider"

function App() {
  return (
    <PatientsProvider>
      <RouterProvider router={router} />
    </PatientsProvider>
  )
}

export default App
