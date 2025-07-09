import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [showSubjects, setShowSubjects] = useState(false);
  const [userSubjects, setUserSubjects] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userProfile'));
    if (data?.subjects) {
      setUserSubjects(data.subjects);
    }
  }, []);

  const handleSubjectClick = (subject) => {
    console.log(`Navigating to ${subject}`);
    // Optional: add routing or scroll to subject card
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">FlashPro</h2>

      <ul className="sidebar-menu">
        <li className="menu-item">
          <button className="menu-btn" onClick={() => setShowSubjects(!showSubjects)}>
            📚 Subjects {showSubjects ? '▲' : '▼'}
          </button>
          {showSubjects && (
            <ul className="submenu">
              {userSubjects.map((subject, idx) => (
                <li
                  key={idx}
                  className="submenu-item"
                  onClick={() => handleSubjectClick(subject)}
                >
                  {subject}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li className="menu-item">📊 Analytics</li>
        <li className="menu-item">🏆 Streaks</li>
        <li className="menu-item">🤖 AI Chatbot</li>
      </ul>
    </div>
  );
};

export default Sidebar;
