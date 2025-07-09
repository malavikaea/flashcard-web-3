import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Card } from '@mui/material';
import { Link } from 'react-router-dom';

const Subject = () => {
    const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <>
    <div class="sub">
        {/* <br /><br /> */}
        <h2>Select Subjects :</h2>
        <Card  sx={{
          alignItems: 'center',   // vertical alignment
          justifyContent: 'center',
          backgroundColor: '#d5d8dc', // DN-like dark neutral
          padding: 2,
          borderRadius: 2,
      }} >
          <Stack 
          direction="row" spacing={3}
          sx={{
          alignItems: 'center',   // vertical alignment
          justifyContent: 'center'}}
          >
              <Chip
                label="Subject 1"
                onClick={handleClick}
                onDelete={handleDelete}
                deleteIcon={<DoneIcon />}
              />
              <Chip
                label="Subject 2"
                onClick={handleClick}
                onDelete={handleDelete}
                deleteIcon={<DeleteIcon />}
              />
              <Chip
                label="Subject 3"
                onClick={handleClick}
                onDelete={handleDelete}
                deleteIcon={<DeleteIcon />}
              />
              <Chip
                label="Subject 1"
                onClick={handleClick}
                onDelete={handleDelete}
                deleteIcon={<DoneIcon />}
              />
        </Stack><br />
        <Stack direction="row" spacing={3}
        sx={{
          alignItems: 'center',   // vertical alignment
          justifyContent: 'center'}}>
          <Chip
            label="Subject 4"
            onClick={handleClick}
            onDelete={handleDelete}
            deleteIcon={<DeleteIcon />}
          />
          <Chip
            label="Subject 5"
            onClick={handleClick}
            onDelete={handleDelete}
            deleteIcon={<DeleteIcon />}
          />
          <Chip
            label="Subject 6"
            onClick={handleClick}
            onDelete={handleDelete}
            deleteIcon={<DeleteIcon />}
          />
          <Chip
            label="Subject 8"
            onClick={handleClick}
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />
      </Stack>
    </Card>
    <Link to="/dash">
        <Button variant="outlined">Start Learning</Button>&nbsp; &nbsp;
        </Link>
    </div>
    </>
  )
}

export default Subject