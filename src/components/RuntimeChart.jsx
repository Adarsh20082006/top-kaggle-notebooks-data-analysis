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

const RuntimeChart = () => {
  const [metric, setMetric] = useState('average'); // 'average' or 'total'
  const runtimeData = rawData["Runtime Metrics Per Language"];

  // 1. Prepare Data
  const data = runtimeData
    .filter(item => item.notebook_language !== "No notebook_language") // Filter out noise
    .map(item => ({
      name: item.notebook_language,
      avg: item.average_runtime_seconds,
      total: item.total_runtime_seconds,
      count: item.notebooks_with_runtime_info
    }))
    .sort((a, b) => metric === 'average' ? b.avg - a.avg : b.total - a.total);

  // Configuration map
  const config = {
    average: {
      label: 'Average Runtime (sec)',
      dataKey: 'avg',
      color: '#f97316', // Orange-500
      desc: 'How long the average notebook takes to run.'
    },
    total: {
      label: 'Total Runtime (sec)',
      dataKey: 'total',
      color: '#06b6d4', // Cyan-500
      desc: 'Cumulative time spent running all notebooks.'
    }
  };

  const currentConfig = config[metric];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '12px', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
        }}>
          <p style={{ fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{label}</p>
          <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
            Notebooks: <strong>{d.count}</strong>
          </div>
          <div style={{ fontSize: '0.9rem', color: currentConfig.color, fontWeight: '600' }}>
            {currentConfig.label}: {d[currentConfig.dataKey].toLocaleString(undefined, { maximumFractionDigits: 0 })}s
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="metric-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header with Toggle */}
      <div className="card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="card-title">Runtime Performance</span>
          <div className="card-icon">⏱️</div>
        </div>
        
        {/* Toggle Switch */}
        <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '6px', padding: '2px' }}>
          <button
            onClick={() => setMetric('average')}
            style={{
              border: 'none',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              background: metric === 'average' ? '#fff' : 'transparent',
              color: metric === 'average' ? '#f97316' : '#64748b',
              boxShadow: metric === 'average' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Avg
          </button>
          <button
            onClick={() => setMetric('total')}
            style={{
              border: 'none',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              background: metric === 'total' ? '#fff' : 'transparent',
              color: metric === 'total' ? '#06b6d4' : '#64748b',
              boxShadow: metric === 'total' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Total
          </button>
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 16px 0' }}>
        {currentConfig.desc}
      </p>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              hide 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar 
              dataKey={currentConfig.dataKey} 
              fill={currentConfig.color} 
              radius={[4, 4, 0, 0]}
              barSize={50}
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RuntimeChart;