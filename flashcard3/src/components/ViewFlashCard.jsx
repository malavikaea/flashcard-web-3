import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';

const ViewFlashCards = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then((res) => setFlashcards(res.data))
      .catch((err) => console.error('Error fetching flashcards:', err));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ fontSize:'1.5rem' , mt: 4, width: '90%', margin: 'auto' }}>
      <Typography variant="h5" align="center" sx={{ p: 2 }}>
        All Flashcards
      </Typography>
      <Table>
        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
          <TableRow>
            <TableCell sx={{ fontSize: '1.2rem' }} ><strong>Question</strong></TableCell>
            <TableCell sx={{ fontSize: '1.2rem' }}><strong>Answer</strong></TableCell>
            <TableCell sx={{ fontSize: '1.2rem' }}><strong>Subject</strong></TableCell>
            <TableCell sx={{ fontSize: '1.2rem' }}><strong>Created At</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flashcards.map((card) => (
            <TableRow key={card._id}>
              <TableCell sx={{ fontSize: '1.2rem' }}>{card.question}</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }}>{card.answer}</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }}>{card.subject}</TableCell>
              <TableCell sx={{ fontSize: '1.2rem' }}>{new Date(card.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewFlashCards;
