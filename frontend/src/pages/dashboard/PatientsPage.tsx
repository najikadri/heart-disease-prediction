import { useEffect, useState } from "react";
import Card from "../../components/Card"
import PatientTableWithFilters from "../../components/PatientTableWithFilters";
import type { Patient } from "../../types/Patient";
import { fetchPatients } from "../../utilities/api";

function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients()
      .then(setPatients)
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  }, []);

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