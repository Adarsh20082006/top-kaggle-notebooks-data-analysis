import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import rawData from '../data.json';

const DataSizeChart = () => {
  const inputData = rawData["Input Size Metrics"];
  const outputData = rawData["Output Size Metrics"];

  // Prepare data for the Pie Chart (Input vs Output Total)
  const totalInput = inputData["Total Input Size (MB)"];
  const totalOutput = outputData["Total Output Size (MB)"];
  
  const pieData = [
    { name: 'Input', value: totalInput, color: '#3b82f6' }, // Blue
    { name: 'Output', value: totalOutput, color: '#10b981' } // Green
  ];

  // Helper to format sizes (MB -> GB -> TB)
  const formatSize = (mb) => {
    if (mb >= 1000000) return `${(mb / 1000000).toFixed(2)} TB`;
    if (mb >= 1000) return `${(mb / 1000).toFixed(2)} GB`;
    return `${mb.toFixed(0)} MB`;
  };

  return (
    <div className="metric-card" style={{ height: 'auto', minHeight: '350px' }}>
      <div className="card-header">
        <span className="card-title">Data Throughput (Input vs Output)</span>
        <div className="card-icon">💾</div>
      </div>

      <div className="size-comparison-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px' }}>
        
        {/* Top Section: Big Numbers Comparison */}
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px' }}>
          
          {/* Input Stats */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '4px' }}>Total Input</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3b82f6' }}>
              {formatSize(totalInput)}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Avg: {formatSize(inputData["Average Input Size (MB)"])}
            </div>
          </div>

          {/* Divider / VS */}
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#cbd5e1', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
            VS
          </div>

          {/* Output Stats */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '4px' }}>Total Output</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>
              {formatSize(totalOutput)}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Avg: {formatSize(outputData["Average Output Size (MB)"])}
            </div>
          </div>

        </div>

        {/* Bottom Section: Visual Ratio (Pie Chart) */}
        <div style={{ flex: 1, position: 'relative', minHeight: '180px' }}>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#64748b', marginBottom: '-10px' }}>
            Volume Distribution
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatSize(value)}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Label inside donut */}
          <div style={{ 
            position: 'absolute', 
            top: '55%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            pointerEvents: 'none',
            fontSize: '0.75rem',
            color: '#94a3b8',
            textAlign: 'center'
          }}>
            Data<br/>Ratio
          </div>
        </div>

      </div>
    </div>
  );
};

export default DataSizeChart;