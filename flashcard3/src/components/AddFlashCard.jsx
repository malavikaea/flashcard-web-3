import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import './AddFlashCard.css'
import { Box, Button, TextField } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddFlashCard = (props) => {
  
    var location=useLocation()
    var navigate=useNavigate()
    const [error, setError] = useState('');
    console.log("loc :",location.state)
    const [formData, setData] = useState({
    'question': '',
    "answer": '', 
    "subject": '', 
  });

  useEffect(()=>{
    if(location.state !== null){
      axios.put("")
      setData({
        ...formData,
        question:location.state.val.question,
        answer:location.state.val.answer,
        subject:location.state.val.subject,
      });
    } 
  },[location.state])

  const handleChange = (e) => {
  const { name, value } = e.target;
  setData((prev) => ({
    ...prev,
    [name]: value
  }));
};

  const handleSubmit = async () => {
    if (
    !formData.question?.trim() ||
    !formData.answer?.trim() ||
    !sub?.trim()
  ) {
    setError('Please fill in all fields.');
    return;
  }
  setError('');
    try {
      const res =  await axios.post('http://localhost:5000/api/flashcards', formData);

      console.log('Response:', res.data);     
      setData(res.data); // assuming server sends back a list
      navigate("/viewFlashCard")
    } catch (err) {
      console.error('Error:', err);
    }
  };
  

  const [sub, setSub] = React.useState(formData.subject||'');

  const handleChangeSub = (event) => {
    const value = event.target.value;
    setSub(value);
    setData((prev) => ({
    ...prev,
    subject: value
  }));
  };

  
  
  return (
    <div >
        <br />
        <br />
        <Box component="form"sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 'auto', mt: 4 ,width:'70%'}}>
        <TextField   sx={{ width: 300, input: { fontSize: '1rem', textAlign: 'left' } }}
            name="question" 
            value={formData.question||''} 
            onChange={handleChange}
            id = "question"
            variant='outlined'
            label="Enter the question"/> <br />
        <TextField  sx={{ width: 300, input: { fontSize: '1rem', textAlign: 'left' } }} 
            name="answer" 
            value={formData.answer||''} 
            onChange={handleChange} 
            id = "answer"
            variant='outlined'
            label="Enter answer"/> <br />

        {/* Dropdown list for selecting subject */}
        <Box id="subject" sx={{ width:'50%'}}>
          <FormControl fullWidth sx={{fontSize: '1.1rem'}}>
            <InputLabel id="subject">Select Subject</InputLabel>
            <Select
              labelId="select-label"
              id="select-sub"
              value={sub}
              label="Subject"
              onChange={handleChangeSub}
            >
              <MenuItem value='Computer Networks'>Computer Networks</MenuItem>
              <MenuItem value="Math">Math</MenuItem>
              <MenuItem value="Biology">Biology</MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Programming">Programming</MenuItem>
              <MenuItem value="Git">Git</MenuItem>
              <MenuItem value="DSA">DSA</MenuItem>

            </Select>
          </FormControl>
      </Box>
        {/* <TextField  name="Dept" value={formData.Dept||''} onChange={handleChange} id = ""variant='outlined'label="Enter Subject"/> <br /> */}
        <Button variant='outlined' onClick={()=> handleSubmit()}>SAVE</Button>
        {error && (
    <Typography sx={{ color: '#ec7063', fontSize: '34px' }}>
      {error}
  </Typography>
)}
        </Box>
    </div>
    
  )
}

export default AddFlashCard