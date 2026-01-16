import React, { useMemo } from 'react';
import MetricCard from './MetricCard';
import LanguageStats from './LanguageStats';
import TagCloud from './TagCloud';
import EngagementCharts from './EngagementCharts';
import TopicExplorer from './TopicExplorer';
import CorrelationHeatmap from './CorrelationHeatmap';
import MedalChart from './MedalChart';
import AcceleratorChart from './AcceleratorChart';
import DataSourceList from './DataSourceList';
import RuntimeChart from './RuntimeChart';
import DataSizeChart from './DataSizeChart';
import AuthorLeaderboard from './AuthorLeaderboard';
import AuthorEngagement from './AuthorEngagement';
import WorkloadRadar from './WorkloadRadar';
import rawData from '../data.json'; 

const StatsDashboard = () => {
  const generalInfo = rawData["General Dataset Information"];
  const languageData = rawData["Notebook Language Counts"];
  const tagsData = rawData["Most Common Tags"];

  const topLanguage = useMemo(() => {
    if (!languageData) return "N/A";
    return Object.entries(languageData).reduce((max, current) => 
      current[1] > max[1] ? current : max
    )[0];
  }, [languageData]);

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
    return num.toLocaleString();
  };

  // Inline styles for section headers
  const sectionHeaderStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#334155', // Slate-700
    marginTop: '40px',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div className="dashboard-content">
      
      {/* ================= SECTION 1: EXECUTIVE SUMMARY ================= */}
      <div className="stats-grid" style={{ marginBottom: '10px' }}>
        <MetricCard title="Total Notebooks" value={generalInfo["Total Notebooks"].toLocaleString()} icon="📚" color="#3b82f6" />
        <MetricCard title="Total Views" value={formatNumber(generalInfo["Total Views"])} icon="👁️" color="#10b981" />
        <MetricCard title="Total Votes" value={formatNumber(generalInfo["Total Votes"])} icon="👍" color="#f59e0b" />
        <MetricCard title="Top Language" value={topLanguage} icon="💻" color="#8b5cf6" />
      </div>


      {/* ================= SECTION 2: CONTENT & TOPICS ================= */}
      <h2 style={sectionHeaderStyle}>📝 Content Landscape</h2>
      
      {/* Row: Languages (Left) & Tags (Right) */}
      <div className="charts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        <LanguageStats data={languageData} />
        <TagCloud data={tagsData} />
      </div>

      {/* Row: Deep Dive into Topics & Correlations */}
      <div className="charts-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <TopicExplorer />
        <CorrelationHeatmap />
      </div>


      {/* ================= SECTION 3: INFRASTRUCTURE & COMPUTE ================= */}
      <h2 style={sectionHeaderStyle}>⚙️ Infrastructure & Compute Profile</h2>
      
      {/* Row: 3 Columns (Workload, Hardware, Speed) */}
      <div className="charts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <WorkloadRadar />
        <AcceleratorChart />
        <RuntimeChart />
      </div>


      {/* ================= SECTION 4: DATA & OUTPUTS ================= */}
      <h2 style={sectionHeaderStyle}>💾 Data Pipeline Analysis</h2>
      
      {/* Row: 3 Columns (Sources, Volume, Rewards) */}
      <div className="charts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <DataSourceList />
        <DataSizeChart />
        <MedalChart />
      </div>


      {/* ================= SECTION 5: COMMUNITY IMPACT ================= */}
      <h2 style={sectionHeaderStyle}>👥 Community & Engagement</h2>
      
      {/* Row: Quantity (Leaderboard) vs Quality (Engagement) */}
      <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <AuthorLeaderboard />
        <AuthorEngagement />
      </div>


      {/* ================= SECTION 6: TOP RANKED CONTENT ================= */}
      <h2 style={sectionHeaderStyle}>🏆 Hall of Fame</h2>
      
      <div className="engagement-section">
        <EngagementCharts />
      </div>

    </div>
  );
};

export default StatsDashboard;