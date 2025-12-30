// src/pages/RegisterPage.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sector: '',
    projectDescription: '',
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 8,
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Register
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Sector</InputLabel>
          <Select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            label="Sector"
            required
          >
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="health">Health</MenuItem>
            <MenuItem value="agriculture">Agriculture</MenuItem>
            <MenuItem value="urbanization">Urbanization</MenuItem>
            <MenuItem value="technology">Technology</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          fullWidth
          variant="outlined"
          label="Project Description"
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          multiline
          rows={4}
          required
          sx={{ mb: 2 }}
        />
        
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 2,
            bgcolor: 'linear-gradient(45deg, #667eea, #764ba2)',
            '&:hover': {
              bgcolor: 'linear-gradient(45deg, #764ba2, #667eea)',
            },
          }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
}

export default RegisterPage;