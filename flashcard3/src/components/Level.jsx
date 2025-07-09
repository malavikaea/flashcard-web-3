import { Avatar, Button, Card, CardContent, CardHeader} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Level = () => {
  return (
    <>
    <div className='level'> 
        <Card sx={{ maxWidth: 500 }}>
            <CardHeader
                title={<h4>Choose your Level</h4>}
                subheader="This helps us give you a better experience"
            />
            <CardContent>
                <Button variant="outlined">Beginner</Button>&nbsp; &nbsp;
                <Button variant="outlined">Intermediate</Button>&nbsp; &nbsp;
                <Button variant="outlined">Advanced</Button>&nbsp; &nbsp;
                
            </CardContent>
        </Card>
        <Link to="/sub">
        <Button variant="outlined">Next</Button>&nbsp; &nbsp;
        </Link>
    </div>

    </>
  )
}

export default Level