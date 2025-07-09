import { Button, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material'
import React from 'react'

const Answer = () => {
    const handleClick = () => {
    console.info('You clicked the Chip.')}
  return (
    <div className="page-center">

    <CardContent>
      <Typography gutterBottom sx={{  fontSize: 14 }}>
        Question
      </Typography>
      <Typography sx={{ mb: 1.5,fontSize: 12 }}>answer nsdbgsydgwudbbb buwgdiugwjb jshu</Typography>
    </CardContent>
    <Button class ="buttongroup" variant='outlined'>Next</Button>
    <Stack 
       className="fixed-chip-bar"
       direction="row"
       spacing={2}
      sx={{
      position: 'fixed',
      bottom: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#1e1e1e',
      borderRadius: '12px',
      padding: '8px 16px',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      }}>
            <Chip label="Easy" variant="outlined" onClick={handleClick} />
            <Chip label="Medium" variant="outlined" onClick={handleClick} />
            <Chip label="Hard" variant="outlined" onClick={handleClick} />
          </Stack>
    </div>
  )
}

export default Answer