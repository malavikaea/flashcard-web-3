// // import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';
// import ChatbotWidget from './ChatbotWidget';
// import Flipcard from './FlipCard';
// import './FlashcardSession.css';
// import { useEffect, useState } from 'react';

// const FlashcardSession = () => {
//   const { subject } = useParams();
//   const navigate = useNavigate();

//   const [cards, setCards] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [flipped, setFlipped] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const [firstQuestionDone, setFirstQuestionDone] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCards = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/flashcards/subject/${subject}`);
//         const data = await res.json();
//         setCards(data); // or data.cards if your backend sends `{ cards: [...] }`
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to load flashcards:", err);
//         setLoading(false);
//       }
//     };

//     fetchCards();
//   }, [subject]);

//   const handleReview = async (rating) => {
//     const currentCard = cards[index];
//     try {
//       await fetch(`http://localhost:5000/api/flashcards/${currentCard._id}/review`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ rating }),
//       });

//       const nextIndex = index + 1;
//       if (nextIndex >= cards.length) {
//         setShowToast(true);
//         setTimeout(() => {
//           setShowToast(false);
//           navigate('/dashboard');
//         }, 2500);
//       } else {
//         setIndex(nextIndex);
//         setFlipped(false);
//         setFirstQuestionDone(true);
//       }
//     } catch (err) {
//       console.error('Review failed:', err);
//     }
//   };

//   const prevCard = () => {
//     setFlipped(false);
//     setIndex((prev) => (prev - 1 + cards.length) % cards.length);
//   };

//   if (loading) return <div>Loading flashcards...</div>;
//   if (!cards.length) return <div>No flashcards found for "{subject}".</div>;

//   return (
//     <div className="session-page">
//       <Navbar />
//       <Sidebar />

//       <div className="session-container">
//         <h2 className="session-header">{subject} Flashcards</h2>

//         <div className="progress-bar">
//           <div
//             className="filled"
//             style={{ width: `${((index + 1) / cards.length) * 100}%` }}
//           />
//         </div>

//         <div className="card-row">
//           {firstQuestionDone && (
//             <button onClick={prevCard} className="btn prev-arrow">←</button>
//           )}
//           <Flipcard
//             question={cards[index].question}
//             answer={cards[index].answer}
//             flipped={flipped}
//             setFlipped={setFlipped}
//             onReview={handleReview}
//           />
//         </div>
//       </div>

//       {showToast && (
//         <div className="toast">🎉 Great job! Taking you back to Dashboard...</div>
//       )}

//       <ChatbotWidget />
//     </div>
//   );
// };

// export default FlashcardSession;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatbotWidget from './ChatbotWidget';
import Flipcard from './FlipCard';
import './FlashcardSession.css';

const FlashcardSession = () => {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [firstQuestionDone, setFirstQuestionDone] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        //const auth = getAuth();
        //const token = await auth.currentUser.getIdToken();
        const user = JSON.parse(localStorage.getItem('userProfile'));
      const token = user?.token;
        const res = await fetch('http://localhost:5000/api/flashcards/by-subjects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ subject })
        });

        if (!res.ok) throw new Error("Failed to fetch flashcards");

        const data = await res.json();
        setCards(data);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [subject]);

  const handleReview = async (rating) => {
    const currentCard = cards[index];
    try {
      await fetch(`http://localhost:5000/api/flashcards/${currentCard._id}/review`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      const nextIndex = index + 1;
      if (nextIndex >= cards.length) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate('/dashboard');
        }, 2500);
      } else {
        setIndex(nextIndex);
        setFlipped(false);
        setFirstQuestionDone(true);
      }
    } catch (err) {
      console.error('Review failed:', err);
    }
  };

  const prevCard = () => {
    setFlipped(false);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  if (loading) return <div>Loading flashcards...</div>;
  if (!cards.length) return <div>No due flashcards for "{subject}" today.</div>;

  return (
    <div className="session-page">
      <Navbar />
      <Sidebar />

      <div className="session-container">
        <h2 className="session-header">{subject} Flashcards</h2>

        <div className="progress-bar">
          <div
            className="filled"
            style={{ width: `${((index + 1) / cards.length) * 100}%` }}
          />
        </div>

        <div className="card-row">
          {firstQuestionDone && (
            <button onClick={prevCard} className="btn prev-arrow">←</button>
          )}
          <Flipcard
            question={cards[index].question}
            answer={cards[index].answer}
            flipped={flipped}
            setFlipped={setFlipped}
            onReview={handleReview}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast">🎉 Great job! Taking you back to Dashboard...</div>
      )}

      <ChatbotWidget />
    </div>
  );
};

export default FlashcardSession;
