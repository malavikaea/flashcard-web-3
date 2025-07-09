import { Button, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ManageFlashcard = () => {
  return (
    <div>
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
  )
}

export default ManageFlashcard