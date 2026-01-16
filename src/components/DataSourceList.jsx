import React from 'react';
import rawData from '../data.json';

const DataSourceList = () => {
  const sourceData = rawData["Most Common Input Data Sources"];

  // 1. Transform and Sort Data
  const data = Object.entries(sourceData)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Keep top 10

  const maxCount = data[0]?.count || 1;

  // 2. Icon Helper
  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.endsWith('.csv')) return '📊';
    if (n.endsWith('.txt')) return '📄';
    if (n.endsWith('.json')) return '📦';
    if (n.endsWith('.zip')) return '🤐';
    if (n.endsWith('.png') || n.endsWith('.jpg')) return '🖼️';
    return '🗂️'; // Default (Folder/Dataset)
  };

  // 3. Color Helper (Alternating or mapped)
  const getColor = (index) => {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    return colors[index % colors.length];
  };

  return (
    <div className="metric-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <span className="card-title">Top Data Sources</span>
        <div className="card-icon">💾</div>
      </div>
      
      <div className="datasource-list" style={{ overflowY: 'auto', paddingRight: '8px' }}>
        {data.map((item, index) => {
          const percentage = (item.count / maxCount) * 100;
          
          return (
            <div key={index} className="datasource-item">
              {/* Row: Icon + Name + Count */}
              <div className="ds-info">
                <div className="ds-name-group">
                  <span className="ds-icon">{getIcon(item.name)}</span>
                  <span className="ds-name" title={item.name}>{item.name}</span>
                </div>
                <span className="ds-count">{item.count}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="ds-bar-bg">
                <div 
                  className="ds-bar-fill" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: getColor(index)
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DataSourceList;