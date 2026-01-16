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

const EngagementCharts = () => {
  const [activeTab, setActiveTab] = useState('votes');
  const engagementData = rawData["Top Notebooks by Engagement"];

  const tabs = [
    { id: 'votes', label: 'Most Voted', dataKey: 'top_10_by_votes', metric: 'votes', color: '#f59e0b' },
    { id: 'views', label: 'Most Viewed', dataKey: 'top_10_by_views', metric: 'views', color: '#10b981' },
    { id: 'comments', label: 'Most Discussed', dataKey: 'top_10_by_comments', metric: 'comments_count', color: '#3b82f6' }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);
  // Reverse data so the highest value is at the top of the chart
  const chartData = [...engagementData[currentTab.dataKey]].reverse();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '12px', 
          border: '1px solid #cbd5e1', 
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <p style={{ margin: '0 0 4px', fontWeight: 'bold', color: '#1e293b' }}>{data.notebook_title}</p>
          <p style={{ margin: '0 0 8px', fontSize: '0.9rem', color: '#64748b' }}>by {data.author_name}</p>
          <p style={{ margin: '0', color: currentTab.color, fontWeight: '700' }}>
            {data[currentTab.metric].toLocaleString()} {currentTab.label.split(' ')[1]}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="metric-card" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
      
      <div className="chart-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 className="card-title" style={{ margin: 0, fontSize: '1.1rem' }}>🏆 Top Notebooks</h3>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                border: 'none',
                background: activeTab === tab.id ? '#fff' : 'transparent',
                color: activeTab === tab.id ? '#1e293b' : '#64748b',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: activeTab === tab.id ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 20, left: 10, bottom: 0 }} // Increased margin for labels
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
            
            <XAxis type="number" hide />
            
            <YAxis 
              dataKey="notebook_title" 
              type="category" 
              width={240}  /* <--- KEY FIX: Much wider space for names */
              tick={{ fontSize: 12, fill: '#475569', fontWeight: 500 }}
              interval={0} // Force show all labels
              tickFormatter={(value) => value.length > 35 ? `${value.substring(0, 35)}...` : value}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            
            <Bar 
              dataKey={currentTab.metric} 
              radius={[0, 4, 4, 0]} 
              barSize={24}
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={currentTab.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngagementCharts;