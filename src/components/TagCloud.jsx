import React from 'react';

const TagCloud = ({ data }) => {
  // Sort tags by popularity and take top 15
  const topTags = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15); // Adjust number as needed

  return (
    <div className="metric-card" style={{ height: 'auto', minHeight: '300px' }}>
      <div className="card-header">
        <span className="card-title">Most Common Tags</span>
        <div className="card-icon">🏷️</div>
      </div>
      
      <div className="tag-container">
        {topTags.map(([tag, count]) => (
          <div key={tag} className="tag-pill">
            <span className="tag-name">{tag}</span>
            <span className="tag-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;