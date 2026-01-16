import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import rawData from '../data.json';

const AcceleratorChart = () => {
  const acceleratorData = rawData["Accelerator Counts"];

  // 1. Transform Data
  // Convert object to array: { name: "GPU P100", value: 454 }
  const data = Object.entries(acceleratorData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort largest to smallest

  // Define colors for top items (Gradient feel)
  const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}>
          <p style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>{label}</p>
          <p style={{ margin: '4px 0 0', color: '#6366f1' }}>
            {payload[0].value} notebooks
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="metric-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">Hardware Accelerators</span>
        <div className="card-icon">⚡</div>
      </div>
      
      <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
            
            <XAxis type="number" hide />
            
            <YAxis 
              dataKey="name" 
              type="category" 
              width={140} 
              tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }}
              tickFormatter={(value) => value.length > 20 ? `${value.substring(0, 20)}...` : value}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]} 
              barSize={24}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AcceleratorChart;