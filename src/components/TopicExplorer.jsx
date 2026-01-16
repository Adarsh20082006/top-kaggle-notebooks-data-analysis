import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import rawData from '../data.json';

// --- Configuration ---
const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', 
  '#ec4899', '#06b6d4', '#6366f1', '#84cc16', 
  '#f97316', '#14b8a6'
];

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  return (
    <g>
      <text x={cx} y={cy} dy={-10} textAnchor="middle" fill="#333" fontSize={16} fontWeight="bold">
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#999" fontSize={12}>
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8} // Make selected slice bigger
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 6}
        outerRadius={innerRadius - 2}
        fill={fill}
      />
    </g>
  );
};

const TopicExplorer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const topicsData = rawData["Top Niche Topics"];

  // Convert object to array for Recharts
  // Filter out any empty topics if necessary
  const chartData = Object.entries(topicsData).map(([name, data]) => ({
    name,
    value: data.engagement_rate,
    notebooks: data.top_notebooks
  })).sort((a, b) => b.value - a.value); // Sort largest to smallest

  const activeTopic = chartData[activeIndex];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="metric-card" style={{ height: 'auto', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">🪐 Niche Topic Explorer</span>
        <div className="card-icon">🚀</div>
      </div>

      <div className="explorer-layout">
        
        {/* LEFT: The Interactive Donut Chart */}
        <div className="chart-section">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                onClick={onPieEnter} // Also allow clicking
                cursor="pointer"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem', marginTop: '-10px' }}>
            Hover or click a slice to see details
          </p>
        </div>

        {/* RIGHT: The Detail List */}
        <div className="details-section">
          <h4 style={{ margin: '0 0 16px 0', color: '#1e293b' }}>
            Top Notebooks for <span style={{ color: COLORS[activeIndex % COLORS.length] }}>{activeTopic.name}</span>
          </h4>
          
          <div className="notebook-list-container">
            {activeTopic.notebooks.slice(0, 5).map((notebook, idx) => (
              <a 
                key={idx} 
                href={notebook.notebook_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="notebook-item"
              >
                <div className="notebook-info">
                  <div className="notebook-title">{notebook.notebook_title}</div>
                  <div className="notebook-author">by {notebook.author_name}</div>
                </div>
                <div className="notebook-stats">
                  <span className="stat-badge vote">
                    👍 {(notebook.votes / 1000).toFixed(1)}k
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopicExplorer;