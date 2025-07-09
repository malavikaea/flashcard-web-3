import React from 'react';
import './Hero.css';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
const navigate = useNavigate();

const handleCTA = () => {
navigate('/login');
};

return (
<div className="hero-wrapper">
<section className="hero">
<div className="hero-text">
<h1>Welcome to LearnLoop</h1>
<p>Revolutionize the way you study. Track progress, master topics, and get smarter every day — one flashcard at a time.</p>
<div className="cta-buttons">
<button className="primary-btn" onClick={handleCTA}>Get Started</button>
<button className="secondary-btn" onClick={handleCTA}>Sign In</button>
</div>
</div>
<div className="hero-image">
<img src="public\images\hero.png" alt="Flashcard App" />
</div>
</section>

<section className="features">
  <h2>Features That Make Learning Stick</h2>
  <div className="feature-cards">
    <div className="feature">
      <div style={{ fontSize: '3rem' }}>🧠</div> <br />
      <h3>Smart Repetition</h3><br />
      <p>Flashcards adapt based on your confidence to optimize memory retention.</p>
    </div>
    <div className="feature">
      <div style={{ fontSize: '3rem' }}>📊</div><br />
      <h3>Progress Analytics</h3><br />
      <p>Visualize your streaks, learning time, and mastery levels at a glance.</p>
    </div>
    <div className="feature">
      <div style={{ fontSize: '3rem' }}>🤖</div><br />
      <h3>AI Doubt Solver</h3><br />
      <p>Ask questions in real-time and get AI-powered explanations instantly.</p>
    </div>
    <div className="feature">
      <div style={{ fontSize: '3rem' }}>🎯</div><br />
      <h3>Goal-Oriented Dashboard</h3><br />
      <p>Set learning goals and watch your progress unfold beautifully.</p>
    </div>
  </div>
</section>

  <section className="reviews">
    <h2>What Learners Say</h2>
    <div className="review-cards">
      <div className="review">
        <img src="public\images\user1.jpg" alt="User" />
        <p>“LearnLoop turned my revision into a game. I use it every day!”</p>
        <span>- Ananya, B.Tech CS</span>
      </div>
      <div className="review">
        <img src="public\images\user2.jpg" alt="User" />
        <p>“Loved the UI. Super smooth and actually useful for long-term retention.”</p>
        <span>- Rahul</span>
      </div>
      <div className="review">
        <img src="public\images\user3.jpg" alt="User" />
        <p>“Best flashcard app out there. The analytics and chatbot sealed it for me.”</p>
        <span>- Fatima, Med Student</span>
      </div>
      <div className="review">
        <img src="public\images\user4.jpg" alt="User" />
        <p>“Very good study app. Clean interface.Suits any needs. ”</p>
        <span>- Alan, BCA stuednt</span>
      </div>
    </div>
    <button className="primary-btn" onClick={handleCTA}>Join Now</button>
  </section>
</div>
);
};

export default Hero;