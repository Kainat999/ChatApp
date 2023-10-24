import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat'; 

export default function Register(){
    const BASE_URL = "http://127.0.0.1:8000/";
    const [formData, setFormData] = useState({
        "email": "",
        "first_name": "",
        "last_name": "",
        "password": ""
    }

    )
    const handleFormSubmit = () =>{
        fetch(`${BASE_URL}register/`,{
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
        })
    }
    return (
        <Container 
            maxWidth="sm"
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', 
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)', 
                }}
            >
                <Avatar sx={{ m: 2, backgroundColor: 'secondary.main' }}>
                    <ChatIcon fontSize="large" />
                </Avatar>
                <Typography variant="h4" sx={{ mb: 2 }}>Join the Chat</Typography>
                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ borderRadius: 2 }} // Rounded corners
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                    id="first_name"
                    type="text"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ borderRadius: 2 }}
                    onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                />
                <TextField
                    id="last_name"
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ borderRadius: 2 }}
                    onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                />
                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    sx={{ borderRadius: 2 }}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 2, py: 1.5, borderRadius: 2 }}
                    onClick={handleFormSubmit}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};





