import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import rawData from '../data.json';

const WorkloadRadar = () => {
  // Use "data (1).json" content which usually gets merged into "data.json"
  // Safe access with fallback
  const workloadData = rawData["Workload Type Information"] || {};

  // 1. Transform Data & Shorten Labels for display
  const shortLabels = {
    "Balanced/Lightweight Workloads": "Balanced",
    "Compute Intensive Workloads": "Compute",
    "Data Intensive Workloads": "Data",
    "Generative Workloads": "GenAI"
  };

  const data = Object.entries(workloadData).map(([name, value]) => ({
    name: name,
    shortName: shortLabels[name] || name,
    value: value
  }));

  // Custom Tooltip
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
          <p style={{ margin: '4px 0 0', color: '#8b5cf6' }}>
            {payload[0].value.toLocaleString()} notebooks
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="metric-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">Workload Distribution</span>
        <div className="card-icon">⚙️</div>
      </div>
      
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 10px 0' }}>
        Radar view of notebook types.
      </p>

      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#e5e7eb" strokeOpacity={0.5} gridType="polygon" />
            
            <PolarAngleAxis 
              dataKey="shortName" 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} 
            />
            
            {/* Hidden radius axis just to set the domain starting at 0 */}
            <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
            
            <Radar
              name="Workloads"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="#8b5cf6"
              fillOpacity={0.5}
              isAnimationActive={true}
            />
            
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkloadRadar;