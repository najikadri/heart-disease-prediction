import Card from "../../components/Card"
import PatientTableWithFilters from "../../components/PatientTableWithFilters";
import { usePatients } from "../../hooks/usePatients";

function PatientsPage() {
  // Using the custom hook to access patients data and loading state
  const { patients, loading } = usePatients();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 px-4">
      <Card title="Page Information"
        description="The patients records page allow you to see the complete patients data with filters." />
      <PatientTableWithFilters patients={patients} />
    </div>
  );
}

export default PatientsPage;