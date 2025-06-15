
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { UserProfile } from '../types/user';

interface LifeBalanceChartProps {
  userProfile: UserProfile | null;
}

const LifeBalanceChart: React.FC<LifeBalanceChartProps> = ({ userProfile }) => {
  const data = [
    { name: 'Career', value: 30, color: '#3B82F6' },
    { name: 'Relationships', value: 25, color: '#10B981' },
    { name: 'Health', value: 20, color: '#F59E0B' },
    { name: 'Personal Growth', value: 15, color: '#8B5CF6' },
    { name: 'Recreation', value: 10, color: '#EF4444' },
  ];

  const COLORS = data.map(item => item.color);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-800">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span className="text-sm text-slate-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LifeBalanceChart;
