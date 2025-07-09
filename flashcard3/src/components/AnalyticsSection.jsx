import React, { useEffect, useState } from 'react';
import './AnalyticsSection.css';
import HeatmapWidget from './HeatmapWidget';
import StreakWidget from './StreakWidget';

const AnalyticsSection = () => {
  const [timeStudied, setTimeStudied] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
   const [avgSession, setAvgSession] = useState(0);
  const user = JSON.parse(localStorage.getItem('userProfile'));
  const dailyTargetLabel = user?.duration || '30 min';

  const durationMap = {
    '15 min': 15,
    '30 min': 30,
    '1 hour': 60,
  };

  const dailyTarget = durationMap[dailyTargetLabel] || 30;
  const progressPercent = Math.min((timeStudied / dailyTarget) * 100, 100).toFixed(0);

   //const weeklyData = [10, 35, 20, 50, 40, 15, 25];
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const maxVal = Math.max(...weeklyData);
  //  const avgSession = Math.floor(weeklyData.reduce((a, b) => a + b, 0) / weeklyData.length);

  useEffect(() => {
     const fetchAnalytics = async () => {
    const token = JSON.parse(localStorage.getItem('userProfile'))?.token;
    const res = await fetch("http://localhost:5000/api/user/analytics", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setTimeStudied(data.timeStudiedToday || 0);
    setWeeklyData(data.weekly || []);
     setAvgSession(data.avgSession || 0);
  };
  fetchAnalytics();
}, []);

  return (
    <div className="analytics-section">
      {/* Today's Progress Ring */}
      <div className="analytics-card">
        <h3>📈 Today's Study Progress</h3>
        <div className="progress-ring-container">
          <svg width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="50"
              strokeWidth="10"
              fill="none"
              stroke="#2a2a40"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              strokeWidth="10"
              fill="none"
              stroke="url(#grad)"
              strokeDasharray={314}
              strokeDashoffset={314 - (314 * progressPercent) / 100}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#00f2fe" />
              </linearGradient>
            </defs>
            <text
              x="60"
              y="68"
              textAnchor="middle"
              fontSize="20"
              fill="#fff"
              fontWeight="bold"
            >
              {progressPercent}%
            </text>
          </svg>
          <p>{timeStudied} / {dailyTarget} min studied</p>
        </div>
      </div>

      {/* Weekly Bar Chart */}
      <div className="analytics-card">
        <h3>📊 Weekly Progress</h3>
        <div className="bar-chart">
          {weeklyData.map((val, idx) => (
            <div key={idx} className="bar-item">
              <div
                className="bar"
                style={{ height: `${(val / maxVal) * 100}%` }}
                title={`${val} min`}
              ></div>
              <span className="bar-label">{weekdays[idx]}</span>
            </div>
          ))}
        </div>
        <p className="progress-text">Daily study log (mins)</p>
      </div>

      {/* Average Session */}
      <div className="analytics-card">
        <h3>🧠 Avg. Session Time</h3>
        <div className="avg-session">
          <span className="avg-number">{avgSession}</span>
          <span className="avg-label">minutes</span>
        </div>
        <p className="progress-text">Over the past 7 days</p>
      </div>

      {/* Heatmap */}
      <div className="analytics-card">
        <h3>📅 Progress Heatmap</h3>
        <div className="heatmap-box">
          <HeatmapWidget />
        </div>
      </div>

      {/* Streak Widget */}
      <div className="analytics-card">
        <StreakWidget />
      </div>
    </div>
  );
};

export default AnalyticsSection;