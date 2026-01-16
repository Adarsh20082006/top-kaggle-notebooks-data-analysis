import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import rawData from '../data.json';

const MedalChart = () => {
  const medalData = rawData["Medal Counts"];

  // 1. Transform Data for Recharts
  // We map specific colors to each medal type
  const data = [
    { name: 'Gold', value: medalData['Gold Medals'], color: '#fbbf24' },   // Amber-400
    { name: 'Silver', value: medalData['Silver Medals'], color: '#94a3b8' }, // Slate-400
    { name: 'Bronze', value: medalData['Bronze Medals'], color: '#b45309' }, // Amber-700
  ];

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value, color } = payload[0].payload;
      const percent = ((value / total) * 100).toFixed(1);
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '8px 12px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ color: color, fontWeight: '700', marginBottom: '4px' }}>
            {name} Medal
          </div>
          <div style={{ fontSize: '0.9rem', color: '#1e293b' }}>
            {value.toLocaleString()} notebooks ({percent}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="metric-card" style={{ height: 'auto', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">Medal Distribution</span>
        <div className="card-icon">🏅</div>
      </div>
      
      <div style={{ flex: 1, minHeight: '300px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              formatter={(value, entry) => (
                <span style={{ color: '#64748b', fontWeight: 500, marginLeft: '4px' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text (Total Medals) */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -65%)', 
          textAlign: 'center',
          pointerEvents: 'none' 
        }}>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b' }}>
            {total.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>
            Medals
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedalChart;