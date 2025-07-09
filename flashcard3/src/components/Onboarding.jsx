import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Onboarding.css';
import { useNavigate } from 'react-router-dom';

const allSubjects = {
  Math: ['Algebra', 'Geometry', 'Calculus'],
  Physics: ['Mechanics', 'Optics'],
  Biology: ['Genetics', 'Evolution'],
  Chemistry: ['Organic', 'Inorganic'],
  Programming: ['JavaScript', 'Python'],
  Git: [],
  DSA: [],
};

const bonusSubjects = {
  Programming: ['Git', 'DSA'],
};

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const languages = ['English', 'Hindi', 'Malayalam', 'Tamil'];
const durations = ['15 min', '30 min', '1 hour'];

const Onboarding = ({ onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState(() => JSON.parse(localStorage.getItem('onboardSubjects')) || []);
  const [subtopics, setSubtopics] = useState([]);
  const [level, setLevel] = useState(() => localStorage.getItem('onboardLevel') || '');
  const [goal, setGoal] = useState(localStorage.getItem('onboardGoal') || '');
  const [language, setLanguage] = useState(localStorage.getItem('onboardLanguage') || '');
  const [duration, setDuration] = useState(localStorage.getItem('onboardDuration') || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  useEffect(() => {
    const sendOnboarding = async () => {
    const token = JSON.parse(localStorage.getItem("userProfile"))?.token;
    if (!token) return;

    await fetch("http://localhost:5000/api/user/onboarding", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subjects: selectedSubjects,
        level,
        goal,
        language,
        duration,
      }),
    });
  };

  sendOnboarding();
  }, [selectedSubjects, level, goal, language, duration]);

  const toggleSubject = (subject) => {
    let updated;
    if (selectedSubjects.includes(subject)) {
      updated = selectedSubjects.filter((s) => s !== subject);
    } else {
      updated = [...selectedSubjects, subject];
    }

    setSelectedSubjects(updated);

    const newSubtopics = updated.flatMap((s) => [
      ...(allSubjects[s] || []),
      ...(bonusSubjects[s] || []),
    ]);
    setSubtopics(newSubtopics);
  };

  const handleNext = () => {
    if (step === 0 && selectedSubjects.length === 0) return;
    if (step === 1 && !level) return;
    if (step === 3 && !language) return;
    if (step === 4 && !duration) return;
    setStep((prev) => prev + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      subjects: selectedSubjects,
      subtopics,
      level,
      goal,
      language,
      duration,
    };
    localStorage.setItem('userProfile', JSON.stringify(userData));
    setDone(true);

    setTimeout(() => {
      navigate('/dash');
    }, 2000);
  };

  return (
    <div className="onboarding-wrapper">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.form
            key="form"
            className="onboarding-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />

            {step === 0 && (
              <motion.div key="step-0" className="form-group" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <h2>What subjects are you learning?</h2>
                <div className="chip-grid">
                  {Object.keys(allSubjects).filter(s => !bonusSubjects.Programming.includes(s)).map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      className={`chip-btn ${selectedSubjects.includes(subj) ? 'selected' : ''}`}
                      onClick={() => toggleSubject(subj)}
                    >
                      {subj}
                    </button>
                  ))}
                </div>

                {selectedSubjects.includes('Programming') && (
                  <>
                    <p className="hint">Bonus topics you might enjoy 👇</p>
                    <div className="chip-grid">
                      {bonusSubjects['Programming'].map((bonus) => (
                        <button
                          key={bonus}
                          type="button"
                          className={`chip-btn ${selectedSubjects.includes(bonus) ? 'selected' : ''}`}
                          onClick={() => toggleSubject(bonus)}
                        >
                          {bonus}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <p className="hint">You can change these later.</p>
                <button type="button" className="next-btn" onClick={handleNext}>Next →</button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="step-1" className="form-group" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <h2>Your current knowledge level?</h2>
                <div className="level-radio">
                  {levels.map((lvl) => (
                    <label key={lvl} className={`level-chip ${level === lvl ? 'selected' : ''}`}>
                      <input type="radio" name="level" value={lvl} onChange={(e) => setLevel(e.target.value)} />
                      {lvl}
                    </label>
                  ))}
                </div>
                <button type="button" className="next-btn" onClick={handleNext}>Next →</button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step-2" className="form-group" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <h2>What’s your learning goal?</h2>
                <textarea
                  rows="3"
                  ref={inputRef}
                  placeholder="Eg: Prepare for finals, learn React..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
                <button type="button" className="next-btn" onClick={handleNext}>Next →</button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step-3" className="form-group" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <h2>Preferred language?</h2>
                <div className="chip-grid">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      className={`chip-btn ${language === lang ? 'selected' : ''}`}
                      onClick={() => setLanguage(lang)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <button type="button" className="next-btn" onClick={handleNext}>Next →</button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step-4" className="form-group" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
                <h2>How long do you plan to study daily?</h2>
                <div className="chip-grid">
                  {durations.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`chip-btn ${duration === d ? 'selected' : ''}`}
                      onClick={() => setDuration(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <button type="submit" className="next-btn">Finish Setup →</button>
              </motion.div>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="final-toast"
            className="onboarding-final-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <h2>🎉 You’re all set!</h2>
            <p>Welcome aboard. Taking you to your dashboard...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;