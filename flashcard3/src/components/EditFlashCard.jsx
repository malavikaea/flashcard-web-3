import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material';
import axios from 'axios';

const EditFlashCard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [editCardId, setEditCardId] = useState(null);
  const [editData, setEditData] = useState({ question: '', answer: '', subject: '' });

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(res.data);
    } catch (err) {
      console.error('Error fetching flashcards:', err);
    }
  };

  const handleEditClick = (card) => {
    setEditCardId(card._id);
    setEditData({
      question: card.question,
      answer: card.answer,
      subject: card.subject,
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/flashcards/${editCardId}`, editData);
      setEditCardId(null); // close the edit form
      fetchFlashcards(); // refresh list
    } catch (err) {
      console.error('Error updating flashcard:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      
      <Stack spacing={2}>
        {flashcards.map((card) => (
          <Paper key={card._id} sx={{ p: 2 }}>
            <Typography><strong>Q:</strong> {card.question}</Typography>
            <Typography><strong>A:</strong> {card.answer}</Typography>
            <Typography><strong>Subject:</strong> {card.subject}</Typography>
            <Button onClick={() => handleEditClick(card)}   variant="outlined"  
             sx={{ 
                    fontSize: { xs: '15px', sm: '20px', md: '23px' },
                    padding:{ xs: '2px 6px', sm: '4px 10px' },
                    height:  { xs: '24px', sm: '28px' },
                    minHeight: '22px !important',
                    minWidth: '80px !important',
                    lineHeight: '1 !important',
                    boxSizing: 'border-box',
                    textTransform: 'none',
                    borderRadius: '4px',
                    '& *': { lineHeight: '1 !important' },
                    backgroundColor: '#566573', 
                    color: '#fff', 
                    '&:hover': { backgroundColor: '#115293' } }} >
              Edit
            </Button>
            {editCardId === card._id && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth margin="dense" name="question" label="Question"
                  value={editData.question} onChange={handleChange}
                />
                <TextField
                  fullWidth margin="dense" name="answer" label="Answer"
                  value={editData.answer} onChange={handleChange}
                />
                <TextField
                  fullWidth margin="dense" name="subject" label="Subject"
                  value={editData.subject} onChange={handleChange}
                />
                <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 1 }}>
                  Save
                </Button>
              </Box>
            )}
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default EditFlashCard;
