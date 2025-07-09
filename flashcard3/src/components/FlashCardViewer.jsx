// // import React, { useState } from 'react';
// // import { Box, Button, Stack } from '@mui/material';
// // import Flashcard from './FlipCard'; // should accept flipped + onFlip
// // import axios from 'axios';
// // import { useEffect } from 'react';
// // import { useParams } from 'react-router-dom';




// // const FlashcardViewer = () => {
// //   const [cards, setCards] = useState([]);
// //   const [index, setIndex] = useState(0);
// //   const [flipped, setFlipped] = useState(false);
// //    const { subject } = useParams(); 
// //   useEffect(() => {

// //      const fetchFlashcards = async () => {
// //       const user = JSON.parse(localStorage.getItem('userProfile'));
// //       const token = user?.token;
// //       // const subjects = user?.subjects || [];
      
// //       try {
// //         const res = await axios.post(
// //           'http://localhost:5000/api/flashcards/by-subjects',{
// //            subject },
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             }
// //           }
// //         );
// //         setCards(res.data);
// //       } catch (err) {
// //         console.error('Error fetching flashcards:', err);
// //       }
// //     };
// //   // const fetchFlashcards = async () => {
// //   //   const today = new Date().toISOString();
// //   //   try {
// //   //     const res = await axios.get(`http://localhost:5000/api/flashcards/due`);
// //   //     // const res = await axios.get('http://localhost:5000/api/flashcards');
// //   //     setCards(res.data);
// //   //   } catch (err) {
// //   //     console.error('Error fetching flashcards:', err);
// //   //   }
// //   // };

// //   fetchFlashcards();
// // }, []);

// // const handleReview = async (rating) => {
// //   const card = cards[index];
// //   try {
// //     await axios.patch(`http://localhost:5000/api/flashcards/${card._id}/review`, {
// //       rating,
// //     });
// //     console.log("Review updated");
// //     // setFlipped(false);
// //     // setIndex((prev) => (prev + 1) % cards.length); // move to next
// //   } catch (err) {
// //     console.error("Review failed:", err);
// //   }
// // };
// //   const handleNext = () => {
// //     setIndex((prev) => (prev + 1) % cards.length);
// //     setFlipped(false);
// //   };

// //   return (
// //     <Box
// //       className="heatmap-page"
// //       display="flex"
// //       flexDirection="column"
// //       alignItems="center"
// //       padding={4}
// //     >
// //       {cards.length > 0 ? (
// //       <Flashcard
// //         question={cards[index].question}
// //         answer={cards[index].answer}
// //         flipped={flipped}
// //         setFlipped={setFlipped}
// //         onReview={handleReview}
// //       />
// //         ) : (
// //   <Box sx={{ mt: 10, fontSize: '1.5rem' }}>
// //     Loading flashcards...
// //   </Box>
// // )}
// //       {/* Action Buttons */}
// //       <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
// //         <Button
// //           sx={{
// //             position: 'fixed',
// //             bottom: 16,
// //             left: 16,
// //             zIndex: 1000,
// //             fontSize: '1rem',
// //             padding: '10px 18px',
// //           }}
// //           variant="outlined"
// //           color="secondary"
// //           onClick={() => setFlipped(false)}
// //         >
// //           Back to Question
// //         </Button>

// //         <Button
// //           sx={{
// //             position: 'fixed',
// //             bottom: 16,
// //             right: 16,
// //             zIndex: 1000,
// //             fontSize: '1rem',
// //             padding: '10px 18px',
// //           }}
// //           variant="outlined"
// //           color="success"
// //           onClick={handleNext}
// //         >
// //           Next Question
// //         </Button>
// //       </Stack>
// //     </Box>
// //   );
// // };

// // export default FlashcardViewer;
// import React, { useState } from 'react';
// import { Box, Button, Stack } from '@mui/material';
// import Flashcard from './FlipCard'; // should accept flipped + onFlip
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';




// const FlashcardViewer = () => {
//   const [cards, setCards] = useState([]);
//   const [index, setIndex] = useState(0);
//   const [flipped, setFlipped] = useState(false);
//    const { subject } = useParams(); 
//   useEffect(() => {

//      const fetchFlashcards = async () => {
//       const user = JSON.parse(localStorage.getItem('userProfile'));
//       const token = user?.token;
//       // const subjects = user?.subjects || [];
      
//       try {
//         const res = await axios.post(
//           'http://localhost:5000/api/flashcards/by-subjects',{
//            subject },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             }
//           }
//         );
//         setCards(res.data);
//       } catch (err) {
//         console.error('Error fetching flashcards:', err);
//       }
//     };
//   // const fetchFlashcards = async () => {
//   //   const today = new Date().toISOString();
//   //   try {
//   //     const res = await axios.get(`http://localhost:5000/api/flashcards/due`);
//   //     // const res = await axios.get('http://localhost:5000/api/flashcards');
//   //     setCards(res.data);
//   //   } catch (err) {
//   //     console.error('Error fetching flashcards:', err);
//   //   }
//   // };

//   fetchFlashcards();
// }, []);

// const handleReview = async (rating) => {
//   const card = cards[index];
//   try {
//     await axios.patch(`http://localhost:5000/api/flashcards/${card._id}/review`, {
//       rating,
//     });
//     console.log("Review updated");
//     // setFlipped(false);
//     // setIndex((prev) => (prev + 1) % cards.length); // move to next
//   } catch (err) {
//     console.error("Review failed:", err);
//   }
// };
//   const handleNext = () => {
//     setIndex((prev) => (prev + 1) % cards.length);
//     setFlipped(false);
//   };

//   return (
//     <Box
//       className="heatmap-page"
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       padding={4}
//     >
//       {cards.length > 0 ? (
//       <Flashcard
//         question={cards[index].question}
//         answer={cards[index].answer}
//         flipped={flipped}
//         setFlipped={setFlipped}
//         onReview={handleReview}
//       />
//         ) : (
//   <Box sx={{ mt: 10, fontSize: '1.5rem' }}>
//     Loading flashcards...
//   </Box>
// )}
//       {/* Action Buttons */}
//       <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
//         <Button
//           sx={{
//             position: 'fixed',
//             bottom: 16,
//             left: 16,
//             zIndex: 1000,
//             fontSize: '1rem',
//             padding: '10px 18px',
//           }}
//           variant="outlined"
//           color="secondary"
//           onClick={() => setFlipped(false)}
//         >
//           Back to Question
//         </Button>

//         <Button
//           sx={{
//             position: 'fixed',
//             bottom: 16,
//             right: 16,
//             zIndex: 1000,
//             fontSize: '1rem',
//             padding: '10px 18px',
//           }}
//           variant="outlined"
//           color="success"
//           onClick={handleNext}
//         >
//           Next Question
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default FlashcardViewer;