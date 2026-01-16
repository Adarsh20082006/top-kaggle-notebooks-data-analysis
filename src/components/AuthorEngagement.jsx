import React, { useState } from 'react';
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

const AuthorEngagement = () => {
  const [metric, setMetric] = useState('votes'); // votes, views, or comments_count
  const rawEngagementData = rawData["Average Engagement Per Author (Top 10)"] || {};

  // 1. Transform Data
  // Convert { "Name": { votes: 10, ... } } to [ { name: "Name", votes: 10, ... } ]
  const data = Object.entries(rawEngagementData)
    .map(([name, metrics]) => ({
      name,
      ...metrics
    }))
    .sort((a, b) => b[metric] - a[metric]); // Sort by currently selected metric

  // Configuration for toggles
  const configs = {
    votes: { label: 'Avg Votes', color: '#f59e0b', icon: '👍' },
    views: { label: 'Avg Views', color: '#10b981', icon: '👁️' },
    comments_count: { label: 'Avg Comments', color: '#3b82f6', icon: '💬' }
  };

  const currentConfig = configs[metric];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const val = payload[0].value;
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '12px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}>
          <p style={{ margin: 0, fontWeight: '700', color: '#1e293b' }}>{label}</p>
          <div style={{ fontSize: '0.9rem', color: currentConfig.color, marginTop: '4px' }}>
            {currentConfig.icon} <strong>{Math.round(val).toLocaleString()}</strong> {currentConfig.label.toLowerCase()}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
            (per notebook)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="metric-card" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header with Toggles */}
      <div className="card-header" style={{ marginBottom: '20px' }}>
        <span className="card-title">Engagement Quality</span>
        
        {/* Toggle Buttons */}
        <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
          {Object.keys(configs).map((key) => (
            <button
              key={key}
              onClick={() => setMetric(key)}
              style={{
                border: 'none',
                background: metric === key ? '#fff' : 'transparent',
                color: metric === key ? '#1e293b' : '#64748b',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: metric === key ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>{configs[key].icon}</span>
              <span className="hide-mobile">{configs[key].label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={130} 
              tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
              interval={0}
              tickFormatter={(value) => value.length > 18 ? `${value.substring(0, 16)}...` : value}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar 
              dataKey={metric} 
              radius={[0, 4, 4, 0]} 
              barSize={20}
              animationDuration={600}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={currentConfig.color} fillOpacity={0.8 + (index * 0.02)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AuthorEngagement;