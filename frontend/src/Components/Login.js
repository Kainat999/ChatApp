import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';


export default function Login() {
    const BASE_URL = "http://127.0.0.1:8000/";
    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    });

    const handleFormSubmit = () => {
        fetch(`${BASE_URL}login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h4" component="h2" gutterBottom>
                Login
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField 
                        id="email" 
                        type='email' 
                        label="Email" 
                        variant="outlined" 
                        fullWidth 
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id="password" 
                        type='password' 
                        label="Password" 
                        variant="outlined" 
                        fullWidth 
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" fullWidth onClick={handleFormSubmit}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        </StyledPaper>
    )
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    margin: '50px auto',
    maxWidth: '400px',
    textAlign: 'center',
}));
