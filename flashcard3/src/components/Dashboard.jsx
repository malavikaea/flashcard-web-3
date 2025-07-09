import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import FlashcardSubjectList from './FlashcardSubjectList';
import AnalyticsSection from './AnalyticsSection';
import ChatbotWidget from './ChatbotWidget';
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  const fetchUser = async () => {
      const token = JSON.parse(localStorage.getItem('userProfile'))?.token;
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error('Failed to fetch user from backend:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-main">
        {userData && (
          <>
            <div className="dashboard-header">
              <h1 className="welcome-msg">
                Welcome back, {userData.name || 'Learner'} 👋
              </h1>
              <p className="quote">
                "The journey of a thousand miles begins with a single flashcard." 🔥
              </p>
            </div>

            {/* Subject Cards Row */}
            <div className="subject-row-wrapper">
              <h2>Your Subjects</h2>
              <FlashcardSubjectList subjects={userData.onboarding?.subjects || []} />     
            </div>

            {/* Analytics Section */}
            <h2>Analytics</h2>
            <AnalyticsSection />

            {/* Floating Chatbot */}
            <ChatbotWidget />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;