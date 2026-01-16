import React from 'react';

const MetricCard = ({ title, value, icon, color }) => {
  return (
    <div className="metric-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="card-header">
        <span className="card-title">{title}</span>
        <span className="card-icon">{icon}</span>
      </div>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default MetricCard;