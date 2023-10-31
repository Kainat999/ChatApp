import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function Login() {
    const BASE_URL = "http://127.0.0.1:8000/";
    const navigate = useNavigate();

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
            if (data.token) {
                setCookie('token', data.token, { sameSite: 'None', secure: false }, 3);
                const token = getCookie('token');
                if (token) {
                    fetch(`${BASE_URL}auth/verify/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                    .then(verifyResponse => {
                        if (verifyResponse.status === 200) {
                            navigate('/chat');
                        } else {
                            console.log('Token verification failed');
                        }
                    })
                    .catch(verifyError => {
                        console.log(verifyError);
                    });
                }
            }
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
