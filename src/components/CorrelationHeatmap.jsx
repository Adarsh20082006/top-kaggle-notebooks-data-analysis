import React from 'react';
import rawData from '../data.json';

const CorrelationHeatmap = () => {
  const matrixData = rawData["Correlation Matrix (Votes, Views, Comments)"];
  const variables = ['votes', 'views', 'comments_count'];
  
  const labels = {
    'votes': 'Votes',
    'views': 'Views',
    'comments_count': 'Comments'
  };

  // 1. Color Scale Logic
  const getColor = (value) => {
    if (value === 1) return '#f1f5f9'; // Diagonal (Slate-100)
    // Blue scale with opacity based on strength
    // We boost opacity (x1.2) so even weak correlations have some color
    return `rgba(59, 130, 246, ${Math.min(value * 1.2 + 0.1, 1)})`; 
  };

  // 2. Text Visibility Logic (Contrast Fix)
  const getTextColor = (value) => {
    if (value === 1) return '#94a3b8'; // Faint gray for diagonal
    // If background is dark (high value), use White text. 
    // If background is light (low value), use Dark text.
    return value > 0.5 ? '#ffffff' : '#1e293b'; 
  };

  // 3. Smart Summary Generator
  const getSummary = (val, labelA, labelB) => {
    if (val === 1) return `Perfect match (${labelA} is ${labelB})`;
    
    let strength = "";
    let direction = "positive"; // Assuming positive for this dataset
    let explanation = "";

    if (val > 0.7) {
      strength = "Very Strong";
      explanation = `High ${labelA} almost always means high ${labelB}.`;
    } else if (val > 0.4) {
      strength = "Moderate";
      explanation = `As ${labelA} increases, ${labelB} tends to increase.`;
    } else if (val > 0.2) {
      strength = "Weak";
      explanation = `There is a slight connection between ${labelA} and ${labelB}.`;
    } else {
      strength = "Negligible";
      explanation = `${labelA} and ${labelB} have little to no relationship.`;
    }

    return { strength, explanation };
  };

  return (
    <div className="metric-card" style={{ height: 'auto', minHeight: '400px' }}>
      <div className="card-header">
        <span className="card-title">Correlation Matrix</span>
        <div className="card-icon">🔗</div>
      </div>
      
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
        Hover over cells to see the relationship summary.
      </p>

      <div className="heatmap-container">
        <div className="heatmap-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '80px repeat(3, 1fr)', 
          gap: '8px' 
        }}>
          
          {/* Header Row */}
          <div className="heatmap-cell header"></div>
          {variables.map(v => (
            <div key={v} className="heatmap-cell header">{labels[v]}</div>
          ))}

          {/* Data Rows */}
          {variables.map((rowVar) => (
            <React.Fragment key={rowVar}>
              {/* Row Label */}
              <div className="heatmap-cell row-label">{labels[rowVar]}</div>
              
              {/* Cells */}
              {variables.map((colVar) => {
                const value = matrixData[rowVar][colVar];
                const summary = getSummary(value, labels[rowVar], labels[colVar]);
                
                return (
                  <div 
                    key={`${rowVar}-${colVar}`} 
                    className="heatmap-cell data-cell"
                    style={{ 
                      backgroundColor: getColor(value),
                      color: getTextColor(value) // Apply the contrast fix
                    }}
                  >
                    <span className="cell-value">{value.toFixed(2)}</span>
                    
                    {/* ENHANCED TOOLTIP */}
                    <div className="heatmap-tooltip">
                      <div style={{ fontWeight: '700', marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}>
                        {labels[rowVar]} vs {labels[colVar]}
                      </div>
                      <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                        Correlation: <strong>{value.toFixed(3)}</strong>
                      </div>
                      <div style={{ color: '#93c5fd', fontWeight: '600', fontSize: '0.8rem' }}>
                        {summary.strength} Relationship
                      </div>
                      <div style={{ fontSize: '0.75rem', marginTop: '4px', fontStyle: 'italic', opacity: 0.9 }}>
                        "{summary.explanation}"
                      </div>
                    </div>

                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '24px', fontSize: '0.8rem', color: '#64748b', gap: '12px', justifyContent: 'center' }}>
        <span>Weak (0.0)</span>
        <div style={{ width: '150px', height: '8px', background: 'linear-gradient(to right, #eff6ff, #3b82f6)', borderRadius: '4px' }}></div>
        <span>Strong (1.0)</span>
      </div>

    </div>
  );
};

export default CorrelationHeatmap;