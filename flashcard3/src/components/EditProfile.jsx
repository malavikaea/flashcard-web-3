import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software Developer at ABC Corp.',
  });

  const [avatarSrc, setAvatarSrc] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert('Profile saved successfully!');
    // Add backend update logic here
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', p: 4, backgroundColor: '#1c1c1c' }}>
      <Paper elevation={6} sx={{ maxWidth: 800, mx: 'auto', p: 4, borderRadius: 4 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Edit Profile
        </Typography>

        <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Avatar src={avatarSrc} sx={{ width: 100, height: 100 }} />
          <Button variant="outlined" component="label">
            Upload New Avatar
            <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bio"
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditProfile;
