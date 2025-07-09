import React, { useEffect, useState } from 'react';
import './FlashcardSubjectList.css';
import { motion } from 'framer-motion';
import {  useNavigate } from 'react-router-dom';

const FlashcardSubjectList = ({ subjects }) => {
  const navigate = useNavigate(); 
  // const progress = progressData[subject] || 0;
  
  const getColor = (progress) => {
    if (progress < 25) return 'red';
    if (progress >= 75) return 'green';
    return 'yellow';
  };
const [progressData, setProgressData] = useState({});
useEffect(() => {
  const fetchProgress = async () => {
    const token = JSON.parse(localStorage.getItem('userProfile'))?.token;
    const res = await fetch('http://localhost:5000/api/flashcards/progress', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setProgressData(data);
  };

  fetchProgress();
}, []);


  const handleClick = (subject) => {
    navigate(`/flashcards/${subject}`);
  };
  return (
    <div className="subject-section">
      <div className="subject-scroll">
        {subjects.map((subject, i) => {
          const subjectProgress = progressData[subject] ?? Math.floor(Math.random() * 100);
          const ringColor = getColor(subjectProgress);

          return (
            <motion.div
              key={i}
              className="subject-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, type: 'spring' }}
              whileHover={{ scale: 1.03 }}
               onClick={() => handleClick(subject)}
              style={{ cursor: 'pointer' }}
            >
              <div className="progress-ring">
                <svg width="80" height="80">
                  <circle
                    className="ring-bg"
                    cx="40"
                    cy="40"
                    r="30"
                    strokeWidth="8"
                  />
                  <motion.circle
                    className={`ring-progress ${ringColor}`}
                    cx="40"
                    cy="40"
                    r="30"
                    strokeWidth="8"
                    strokeDasharray={188.4}
                    strokeDashoffset={188.4}
                    animate={{
                      strokeDashoffset: 188.4 - (188.4 * subjectProgress) / 100
                    }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                  <text x="40" y="46" textAnchor="middle" fontSize="14" fill="#fff">
                    {subjectProgress}%
                  </text>
                </svg>
              </div>
              <h3>{subject}</h3>
              <p>Keep up the streak!</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FlashcardSubjectList;