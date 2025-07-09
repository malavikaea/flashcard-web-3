import React, { useEffect, useState } from 'react';
import './StreakWidget.css';

const StreakWidget = () => {
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const fetchStreak = async () => {
      const user = JSON.parse(localStorage.getItem('userProfile'));
      if (!user) return;

      try {
        const res = await fetch("http://localhost:5000/api/user/practice", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`, // 🛡️ Send Firebase token
          },
        });

        if (!res.ok) throw new Error("Failed to fetch streak");
        const data = await res.json();

        setStreak(data.streak);
        setBadges(data.badges || []);
      } catch (err) {
        console.error("Error fetching streak:", err);
      }
    };

    fetchStreak();
  }, []);

  return (
    <div className="streak-widget widget-card">
      <h2>🔥 Your Streak</h2>
      <p className="streak-count">{streak} day{streak !== 1 ? 's' : ''}</p>
      <h3>🏅 Badges</h3>
      <ul>
        {badges.length === 0 && <li>No badges yet</li>}
        {badges.map((badge, idx) => (
          <li key={idx}>{badge}</li>
        ))}
      </ul>
    </div>
  );
};

export default StreakWidget;
