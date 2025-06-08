import { useState } from 'react';
import KPICard from "../../components/KPICard";
import { usePatients } from "../../hooks/usePatients";
import { Users, HeartCrack, Pill, HeartPulse, Filter } from "lucide-react";
import { Line, Pie, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement
} from 'chart.js';
import TextCard from '../../components/TextCard';

ChartJS.register(ArcElement, LinearScale, PointElement, Tooltip, Legend, CategoryScale, LineElement);

function AnalysisPage() {
  const { patients, loading } = usePatients();
  const [filters, setFilters] = useState({
    ageRange: 'all',
    sex: 'all',
    riskLevel: 'all'
  });
  const [lineChartConfig, setLineChartConfig] = useState({
    xField: 'Age',
    yField: 'Cholesterol',
    aggregation: 'average'
  });

  const numericalFields = [
    { value: 'Age', label: 'Age' },
    { value: 'RestingBP', label: 'Resting BP' },
    { value: 'Cholesterol', label: 'Cholesterol' },
    { value: 'MaxHR', label: 'Max Heart Rate' },
    { value: 'Oldpeak', label: 'Oldpeak' }
  ];

  const aggregationOptions = [
    { value: 'sum', label: 'Sum' },
    { value: 'average', label: 'Average' },
    { value: 'min', label: 'Minimum' },
    { value: 'max', label: 'Maximum' }
  ];

  if (loading) return <div className="flex justify-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;

  const filteredPatients = patients.filter(patient => {
    return (
      (filters.ageRange === 'all' ||
        (filters.ageRange === '<40' && patient.Age < 40) ||
        (filters.ageRange === '40-60' && patient.Age >= 40 && patient.Age <= 60) ||
        (filters.ageRange === '60+' && patient.Age > 60)) &&
      (filters.sex === 'all' || patient.Sex === filters.sex) &&
      (filters.riskLevel === 'all' ||
        (filters.riskLevel === 'high' && patient.HeartDisease === 1) ||
        (filters.riskLevel === 'low' && patient.HeartDisease === 0))
    );
  });

  // KPIs
  const totalPatients = filteredPatients.length;
  const highRiskPatients = filteredPatients.filter(p => p.HeartDisease === 1).length;
  const avgCholesterol = totalPatients > 0
    ? filteredPatients.reduce((sum, p) => sum + (p.Cholesterol || 0), 0) / totalPatients
    : 0;
  const hypertensionRate = totalPatients > 0
    ? (filteredPatients.filter(p => p.RestingBP >= 140).length / totalPatients) * 100
    : 0;

  // Pie Chart Data
  const riskData = {
    labels: ['Low Risk', 'High Risk'],
    datasets: [{
      data: [
        filteredPatients.filter(p => p.HeartDisease === 0).length,
        highRiskPatients
      ],
      backgroundColor: ['#4ADE80', '#F87171'],
      borderColor: ['#22C55E', '#DC2626'],
      borderWidth: 1
    }]
  };

  // Scatter Plot Data
  const scatterData = {
    datasets: [{
      label: 'Low Risk',
      data: filteredPatients.filter(p => p.HeartDisease === 0).map(p => ({ x: p.Age, y: p.Cholesterol })),
      backgroundColor: '#4ADE80',
      borderColor: '#22C55E'
    }, {
      label: 'High Risk',
      data: filteredPatients.filter(p => p.HeartDisease === 1).map(p => ({ x: p.Age, y: p.Cholesterol })),
      backgroundColor: '#F87171',
      borderColor: '#DC2626'
    }]
  };

  // Line Chart Data
  const getLineChartData = () => {
    const groups: Record<number, number[]> = {};

    filteredPatients.forEach(patient => {
      const xValue = patient[lineChartConfig.xField as keyof typeof patient] as number;
      const yValue = patient[lineChartConfig.yField as keyof typeof patient] as number;

      if (xValue === undefined || yValue === undefined) return;

      if (!groups[xValue]) groups[xValue] = [];
      groups[xValue].push(yValue);
    });

    const sortedKeys = Object.keys(groups)
      .map(Number)
      .sort((a, b) => a - b);

    const data = sortedKeys.map(key => {
      const values = groups[key];
      switch (lineChartConfig.aggregation) {
        case 'sum': return values.reduce((a, b) => a + b, 0);
        case 'average': return values.reduce((a, b) => a + b, 0) / values.length;
        case 'min': return Math.min(...values);
        case 'max': return Math.max(...values);
        default: return 0;
      }
    });

    return {
      labels: sortedKeys,
      datasets: [{
        label: `${lineChartConfig.aggregation} ${lineChartConfig.yField}`,
        data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3
      }]
    };
  };

  const lineData = getLineChartData();

  return (
    <div className="space-y-6">
      {/* Dashboard Title Card */}
      <TextCard title="Analysis Dashboard"
        description="Interactive visualization of patient data with risk factors" />
      {/* Interactive Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-2">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 mr-2 text-gray-500" />
          <h3 className="font-medium text-gray-700">Filter Patients</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
            <select
              value={filters.ageRange}
              onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Ages</option>
              <option value="<40">Under 40</option>
              <option value="40-60">40-60</option>
              <option value="60+">60+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
            <select
              value={filters.sex}
              onChange={(e) => setFilters({ ...filters, sex: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
            <select
              value={filters.riskLevel}
              onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="low">Low Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Patients"
          value={totalPatients}
          description="Filtered records"
          icon={<Users className="w-5 h-5" />}
        />

        <KPICard
          title="High Risk Patients"
          value={totalPatients > 0 ? (highRiskPatients / totalPatients) * 100 : 0}
          unit="%"
          description="Heart disease predicted"
          trend={highRiskPatients > totalPatients / 2 ? "up" : "down"}
          icon={<HeartCrack className="w-5 h-5" />}
        />

        <KPICard
          title="Avg. Cholesterol"
          value={avgCholesterol}
          unit="mg/dL"
          description="Healthy range: < 200 mg/dL"
          dangerThreshold={200}
          icon={<Pill className="w-5 h-5" />}
        />

        <KPICard
          title="Hypertension Rate"
          value={hypertensionRate}
          unit="%"
          description="BP ≥ 140 mmHg"
          dangerThreshold={30}
          icon={<HeartPulse className="w-5 h-5" />}
        />
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-2">
          <h3 className="font-semibold text-lg mb-3">Risk Distribution</h3>
          <div className="h-80">
            <Pie
              data={riskData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || '';
                        const value = Number(context.raw) || 0;
                        const total = (context.dataset.data as number[]).reduce((a, b) => Number(a) + Number(b), 0);
                        const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                        return `${label}: ${value} (${percentage}%)`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Age vs Cholesterol Scatter Plot */}
        <div className="bg-white rounded-lg shadow p-6 mb-2">
          <h3 className="font-semibold text-lg mb-3">Age vs Cholesterol</h3>
          <div className="h-80">
            <Scatter
              data={scatterData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Age (years)'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Cholesterol (mg/dL)'
                    }
                  }
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const patient = filteredPatients.find(p =>
                          p.Age === context.parsed.x &&
                          p.Cholesterol === context.parsed.y
                        );
                        return [
                          `Age: ${context.parsed.x}`,
                          `Cholesterol: ${context.parsed.y} mg/dL`,
                          `Risk: ${patient?.HeartDisease ? 'High' : 'Low'}`
                        ];
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Interactive Line Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-2 lg:col-span-2 w-full max-w-full">
          <div className="flex items-center justify-between mb-4 flex-col lg:flex-row">
            <h3 className="font-semibold text-lg">Interactive Line Chart</h3>
            <div className="flex gap-4 flex-wrap justify-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis</label>
                <select
                  value={lineChartConfig.xField}
                  onChange={(e) => setLineChartConfig({ ...lineChartConfig, xField: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {numericalFields.map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis</label>
                <select
                  value={lineChartConfig.yField}
                  onChange={(e) => setLineChartConfig({ ...lineChartConfig, yField: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {numericalFields.map(field => (
                    <option key={field.value} value={field.value}>{field.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aggregation</label>
                <select
                  value={lineChartConfig.aggregation}
                  onChange={(e) => setLineChartConfig({ ...lineChartConfig, aggregation: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {aggregationOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="h-80">
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: lineChartConfig.xField
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: `${lineChartConfig.aggregation} of ${lineChartConfig.yField}`
                    }
                  }
                }
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default AnalysisPage;