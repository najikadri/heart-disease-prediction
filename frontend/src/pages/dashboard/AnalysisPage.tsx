import TextCard from "../../components/TextCard"
import KPICard from "../../components/KPICard";
import { usePatients } from "../../hooks/usePatients";
import { Users, HeartCrack, Pill, HeartPulse } from "lucide-react";

function AnalysisPage() {

  const { patients, loading } = usePatients();

  if (loading) return <div>Loading...</div>;

  const totalPatients = patients.length;
  const highRiskPatients = patients.filter(p => p.HeartDisease === 1).length;
  const avgCholesterol = patients.reduce((sum, p) => sum + (p.Cholesterol || 0), 0) / (patients.length || 1);
  const hypertensionRate = (patients.filter(p => p.RestingBP >= 140).length / (patients.length || 1)) * 100;

  return (
    <div className="space-y-6">
      <TextCard title="Analysis Page" description="This is the analysis page where you can view various data insights." />
      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Patients"
          value={totalPatients}
          description="All records in database"
          icon={<Users />}
        />

        <KPICard
          title="High Risk Patients"
          value={Number(((highRiskPatients/totalPatients) * 100).toFixed(0))}
          unit="%"
          description="Heart disease predicted"
          trend={highRiskPatients > totalPatients / 2 ? "up" : "down"}
          icon={<HeartCrack />}
        />

        <KPICard
          title="Avg. Cholesterol"
          value={Number(avgCholesterol.toFixed(0))}
          unit="mg/dL"
          description="Healthy range: < 200 mg/dL"
          dangerThreshold={200}
          icon={<Pill />}
        />

        <KPICard
          title="Hypertension Rate"
          value={Number(hypertensionRate.toFixed(0))}
          unit="%"
          description="BP ≥ 140 mmHg"
          dangerThreshold={30}
          icon={<HeartPulse />}
        />
      </div>
    </div>

  );
}

export default AnalysisPage;