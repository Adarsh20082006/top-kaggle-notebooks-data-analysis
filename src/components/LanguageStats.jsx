import React from 'react';

const LanguageStats = ({ data }) => {
  // 1. Calculate total (excluding "No notebook_language" for cleaner percentages if desired, 
  //    or keep it but rename it. Let's rename it to "Unknown" for clarity)
  const processedData = Object.entries(data).map(([lang, count]) => ({
    name: lang === 'No notebook_language' ? 'Unknown' : lang,
    count,
    originalName: lang
  }));

  const total = processedData.reduce((acc, item) => acc + item.count, 0);

  // 2. Sort High to Low
  const sortedLanguages = processedData.sort((a, b) => b.count - a.count);

  // 3. Color Map for distinct look
  const getColor = (name) => {
    const map = {
      'Python': '#3b82f6',    // Blue
      'R': '#10b981',         // Green
      'Rmarkdown': '#f97316', // Orange
      'Unknown': '#94a3b8'    // Gray
    };
    return map[name] || '#6366f1'; // Default Indigo
  };

  return (
    <div className="metric-card" style={{ height: 'auto', minHeight: '300px' }}>
      <div className="card-header">
        <span className="card-title">Notebook Languages</span>
        <div className="card-icon">💻</div>
      </div>
      
      <div className="stats-list">
        {sortedLanguages.map((item) => {
          const percentage = ((item.count / total) * 100).toFixed(1);
          // Ensure tiny bars are at least slightly visible (min 2%) if they exist
          const visualWidth = Math.max(parseFloat(percentage), 2); 

          return (
            <div key={item.name} className="stat-row">
              <div className="stat-info">
                <span style={{ fontWeight: '600', color: '#334155' }}>{item.name}</span>
                <span className="stat-count">{item.count.toLocaleString()} ({percentage}%)</span>
              </div>
              
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: getColor(item.name),
                    minWidth: item.count > 0 ? '4px' : '0' // Ensure small counts are visible
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

export default LanguageStats;