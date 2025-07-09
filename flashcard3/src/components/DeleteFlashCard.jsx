

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const DeleteFlashCard = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    fetchFlashcards();
  }, []);
  
  const fetchFlashcards = () => {
   
    axios.get('http://localhost:5000/api/flashcards')
      .then((res) => setFlashcards(res.data))
      .catch((err) => console.error('Error fetching flashcards:', err));
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
      setFlashcards(flashcards.filter(card => card._id !== id));
       fetchFlashcards();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>Delete Flashcards</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Question</strong></TableCell>
              <TableCell><strong>Answer</strong></TableCell>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flashcards.map((card) => (
              <TableRow key={card._id}>
                <TableCell>{card.question}</TableCell>
                <TableCell>{card.answer}</TableCell>
                <TableCell>{card.subject}</TableCell>
                <TableCell>
                  <Button color="error" variant="contained" onClick={() => handleDelete(card._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {flashcards.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">No flashcards found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeleteFlashCard;
