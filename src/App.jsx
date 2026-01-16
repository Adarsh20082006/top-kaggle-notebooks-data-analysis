import React from 'react';
import StatsDashboard from './components/StatsDashboard';
import './App.css'; // Import the new styles

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📊 Kaggle Notebooks Analysis</h1>
        <p>Comprehensive insights into community trends, workloads, and engagement.</p>
      </header>
      
      <main>
        <StatsDashboard />
      </main>
    </div>
  );
}

export default App;