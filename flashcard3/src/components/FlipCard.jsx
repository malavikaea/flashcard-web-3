// // import React, { useState } from 'react';
// import './FlipCard.css';
// import { Button, Typography, Box, Stack, Chip } from '@mui/material';
// import axios from 'axios';

// const Flipcard = ({ question, answer ,flipped, setFlipped,onReview}) => {
//   // const [flipped, setFlipped] = useState(false);

//   const handleClick = (rating) => {
//     onReview(rating);
   
//     console.info('You clicked the Chip.');
//    };

//   return (
//     <Box className={`card-container ${flipped ? 'hover manual-flip' : ''}`}>
//       <Box className="card">
//         {/* FRONT */}
//         <Box className="front">
//           <Box className="content">
//             <Typography
//               align="center"
//               variant="h5"
//               sx={{ fontWeight: 600, mb: 2 , position: 'fixed',
//                 top: 180,}}
//             >
//               Question:
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{ fontSize: '2.4rem', lineHeight: 1.7 }}
//             >
//               {question}
//             </Typography>
//           </Box>
//           <Box   sx={{ display: 'flex', justifyContent: 'center' }} className="footer">
//             <Button
//               variant="contained"
//               size="small"
//               onClick={() => setFlipped(true)}
//               sx={{
//                 mt: 2,
//                 position: 'fixed',
//                 bottom: 16,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 zIndex: 1000,
//                 // position:'sticky',
//                 fontSize: '2.5rem',
//                 padding: '10px 20px',
//                 textTransform: 'none',
//                 backgroundColor: '#1c2833',       
//                 color: '#f2f3f4',                 
//                 fontWeight: 'bold',
//                 borderRadius: '8px',
//                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
//                 transition: 'transform 0.2s, background-color 0.3s',

//                   '&:hover': {
//                      backgroundColor: '#17202a',
//                     transform: 'scale(1.05)',
//                  },
//               }}
//             >
//               Show Answer
//             </Button>
//           </Box>
//         </Box>

//         {/* BACK */}
//         <Box className="back">
//           <Box className="content">
//             <Typography
//               variant="h6"
//               sx={{ fontSize: '2.4rem', lineHeight: 1.8 }}
//             >
//               {answer}
//             </Typography>
//           </Box>
//           <Box className="footer">
//             <Stack
//               className="fixed-chip-bar"
//               direction="row"
//               spacing={2}
//               sx={{
//                 position: 'fixed',
//                 bottom: 16,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 zIndex: 1000,
//               }}
//             >
//               <Chip
//                 label="Easy"
//                 variant="outlined"
//                 color="success"
//                 onClick={()=>handleClick('Easy')}
//                 sx={{ fontSize: '1.8rem', height: '50px', px: 2 }}
//               />
//               <Chip
//                 label="Medium"
//                 variant="outlined"
//                 color="warning"
//                 onClick={()=>handleClick('Medium')}
//                 sx={{ fontSize: '1.8rem', height: '50px', px: 2 }}
//               />
//               <Chip
//                 label="Hard"
//                 variant="outlined"
//                 color="error"
//                 onClick={()=>handleClick('Hard')}
//                 sx={{ fontSize: '1.8rem', height: '50px', px: 2 }}
//               />
//             </Stack>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Flipcard;
import React from 'react';
import './FlipCard.css';
import { Button, Typography, Box, Stack, Chip } from '@mui/material';

const Flipcard = ({ question, answer, flipped, setFlipped, onReview }) => {
  const handleClick = (rating) => {
    onReview(rating);
  };

  return (
    <Box className={`card-container ${flipped ? 'flipped' : ''}`}>
      <Box className="card">
        {/* FRONT SIDE */}
        <Box className="front">
          <Box className="content">
            <Typography
              align="center"
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 2,
              }}
            >
              Question
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: '2rem', lineHeight: 1.6, textAlign: 'center' }}
            >
              {question}
            </Typography>
          </Box>
          <Box className="footer" sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              onClick={() => setFlipped(true)}
              sx={{
                fontSize: '1.6rem',
                padding: '10px 24px',
                backgroundColor: '#1c2833',
                color: '#f2f3f4',
                fontWeight: 'bold',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#17202a',
                },
              }}
            >
              Show Answer
            </Button>
          </Box>
        </Box>

        {/* BACK SIDE */}
        <Box className="back">
          <Box className="content">
            <Typography
              align="center"
              variant="h5"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Answer
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: '2rem', lineHeight: 1.6, textAlign: 'center' }}
            >
              {answer}
            </Typography>
          </Box>
          <Box className="footer" sx={{ textAlign: 'center', mt: 4 }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Chip
                label="Easy"
                variant="outlined"
                color="success"
                onClick={() => handleClick('Easy')}
                sx={{ fontSize: '1.4rem', px: 2, height: '42px' }}
              />
              <Chip
                label="Medium"
                variant="outlined"
                color="warning"
                onClick={() => handleClick('Medium')}
                sx={{ fontSize: '1.4rem', px: 2, height: '42px' }}
              />
              <Chip
                label="Hard"
                variant="outlined"
                color="error"
                onClick={() => handleClick('Hard')}
                sx={{ fontSize: '1.4rem', px: 2, height: '42px' }}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Flipcard;
