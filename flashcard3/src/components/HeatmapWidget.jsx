import React, { useEffect, useState } from 'react';
import './HeatmapWidget.css';

// const generateMockHeatmap = () => {
//   const days = 42; // 6 weeks
//   const today = new Date();
//   const heatmap = [];

//   for (let i = days - 1; i >= 0; i--) {
//     const date = new Date(today);
//     date.setDate(today.getDate() - i);

//     heatmap.push({
//       date: date.toISOString().split('T')[0],
//       level: Math.floor(Math.random() * 4), // levels: 0-3
//     });
//   }

//   return heatmap;
// };

const HeatmapWidget = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
     const fetchHeatmapData = async () => {
      const token = JSON.parse(localStorage.getItem("userProfile"))?.token;

      const res = await fetch("http://localhost:5000/api/user/analytics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      const formatted = result.heatmap.map((d) => ({
        date: d.date,
        level: d.level,
      }));
      setData(formatted);
    };
    fetchHeatmapData();
  },[]);

  return (
        <div className="heatmap-grid">
        {data.map(({ date, level }) => (
          <div
            key={date}
            className={`heatmap-cell level-${level}`}
            title={date}
          />
        ))}
      </div>
  );
};

export default HeatmapWidget;