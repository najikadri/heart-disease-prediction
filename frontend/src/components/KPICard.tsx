// KPI Card Component
type KPICardProps = {
  title: string;
  value: string | number;
  unit?: string;
  description?: string;
  trend?: "up" | "down";
  dangerThreshold?: number;
  icon: React.ReactNode;
};

const KPICard = ({ title, value, unit, description, trend, dangerThreshold, icon }: KPICardProps) => {
  const isDanger = dangerThreshold !== undefined && typeof value === "number" && value > dangerThreshold;

  // Format display value
  const displayValue = typeof value === "number"
    ? unit ? `${value.toFixed(0)}${unit == '%' ? unit : " " + unit}` : value.toLocaleString()
    : value;

  return (
    <div className={`p-4 rounded-xl shadow-sm border ${isDanger ? 'bg-red-50 border-red-100' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-full ${isDanger ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-gray-800">{displayValue}</span>
              {trend && (
                <span className={`text-sm ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                  {trend === 'up' ? '↑' : '↓'}
                </span>
              )}
            </div>
          </div>
        </div>
        {isDanger && (
          <span className="px-2 py-1 rounded-full bg-white text-xs font-medium text-red-600 border border-red-200">
            Warning
          </span>
        )}
      </div>
      {description && (
        <p className="mt-2 text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default KPICard;