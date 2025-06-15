
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { UserProfile } from '../types/user';

interface LifeBalanceChartProps {
  userProfile: UserProfile | null;
}

const LifeBalanceChart = ({ userProfile }: LifeBalanceChartProps) => {
  // Sample data for life balance - this could be enhanced with real user data
  const data = [
    { name: 'Career', value: 30, color: '#8B5CF6' },
    { name: 'Health', value: 25, color: '#10B981' },
    { name: 'Relationships', value: 20, color: '#F59E0B' },
    { name: 'Personal Growth', value: 15, color: '#EF4444' },
    { name: 'Recreation', value: 10, color: '#3B82F6' },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-2 mt-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-white">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LifeBalanceChart;
