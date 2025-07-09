import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.newPassword !== form.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // TODO: Add backend logic here
    alert('Password changed successfully!');
    navigate('/profile');
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', backgroundColor: '#1c1c1c', p: 4 }}>
      <Paper elevation={5} sx={{ maxWidth: 500, mx: 'auto', p: 4, borderRadius: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Change Password
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Old Password"
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            fullWidth
          />

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Change
            </Button>
            <Button variant="outlined" onClick={() => navigate('/profile')}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ChangePass;
