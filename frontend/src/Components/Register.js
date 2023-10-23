import React, { useState } from 'react';
import { TextField, Button, Typography, Container, CssBaseline, Avatar, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Register() {
    const BASE_URL = "http://127.0.0.1:8000/";
    const [formData, setFormData] = useState({
        "email": "",
        "first_name": "",
        "last_name": "",
        "password": ""
    });
    const [error, setError] = useState(null);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        fetch(`${BASE_URL}register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(async response => {
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setError(null);
        })
        .catch(error => {
            console.error('There was a problem:', error.message);
            setError(error.message);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleFormSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="first_name"
                        label="First Name"
                        type="text"
                        id="first_name"
                        onChange={e => setFormData({...formData, first_name: e.target.value})}
                        autoComplete="given-name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="last_name"
                        label="Last Name"
                        type="text"
                        id="last_name"
                        onChange={e => setFormData({...formData, last_name: e.target.value})}
                        autoComplete="family-name"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={e => setFormData({...formData, password: e.target.value})}
                        autoComplete="new-password"
                    />
                    {error && 
                        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
