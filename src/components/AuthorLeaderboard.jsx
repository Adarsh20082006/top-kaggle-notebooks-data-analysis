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

const AuthorLeaderboard = () => {
  // Use the specific key for Top 10 Authors
  const authorData = rawData["Notebooks Per Author (Top 10)"] || {};

  // 1. Transform Data
  const data = Object.entries(authorData)
    .map(([name, count]) => ({ 
      name: name === "No author_name" ? "Unknown" : name, 
      count 
    }))
    .sort((a, b) => b.count - a.count); // Sort Top to Bottom

  // Top 3 Colors (Gold, Silver, Bronze style) + Others
  const getBarColor = (index) => {
    if (index === 0) return '#eab308'; // Gold
    if (index === 1) return '#94a3b8'; // Silver
    if (index === 2) return '#b45309'; // Bronze
    return '#6366f1'; // Indigo for the rest
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '12px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}>
          <p style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>{label}</p>
          <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px' }}>
            Contributions: <strong>{payload[0].value}</strong> notebooks
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="metric-card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">Top Contributors</span>
        <div className="card-icon">✍️</div>
      </div>
      
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            
            <XAxis type="number" hide />
            
            <YAxis 
              dataKey="name" 
              type="category" 
              width={150} 
              tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
              interval={0}
              tickFormatter={(value) => value.length > 20 ? `${value.substring(0, 18)}...` : value}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            
            <Bar 
              dataKey="count" 
              radius={[0, 4, 4, 0]} 
              barSize={20}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AuthorLeaderboard;