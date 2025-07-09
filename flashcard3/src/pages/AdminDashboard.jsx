// src/pages/AdminDashboard.jsx
import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const token = JSON.parse(localStorage.getItem("userProfile"))?.token;

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userRes = await fetch('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cardRes = await fetch('http://localhost:5000/api/admin/flashcards', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userRes.json();
        const flashcardData = await cardRes.json();

        setUsers(userData);
        setFlashcards(flashcardData);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👑 Admin Dashboard</h2>
      <h3>Total Users: {users.length}</h3>
      <h3>Total Flashcards: {flashcards.length}</h3>

      <div style={{ marginTop: '2rem' }}>
        <h4>User List</h4>
        <ul>
          {users.map((u) => (
            <li key={u._id}>{u.name || u.email || u.uid}</li>
          ))}
        </ul>
      </div>
      <Stack sx={{}}>
      <Link to = "/addCard">
      <Button variant='outlined'>Add Flashcard</Button>
      </Link>
      <Link to = "/viewFlashCard">
      <Button variant='outlined'>View Flashcard</Button>
      </Link>
      <Link to = "/editflash">
      <Button variant='outlined'>Edit Flashcard</Button>
      </Link>
      <Link to = "/deleteflash">
      <Button variant='outlined'>Delete  Flashcard</Button>
      </Link>
    </Stack>
    
    </div>
  );
};

export default AdminDashboard;
