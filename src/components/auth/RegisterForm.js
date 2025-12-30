// src/components/auth/RegisterForm.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Grid,
  Paper,
  IconButton,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  Alert,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  School,
  LocalHospital,
  Agriculture,
  Architecture,
  Computer,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SECTORS } from '../../utils/constants';

const personalInfoSchema = yup.object({
  name: yup.string().required('Full name is required').min(2, 'Name too short'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const sectorSchema = yup.object({
  sector: yup.string().required('Please select a sector'),
});

const projectSchema = yup.object({
  organization: yup.string(),
  role: yup.string().required('Your role is required'),
  projectDescription: yup.string()
    .required('Project description is required')
    .min(50, 'Please provide at least 50 characters')
    .max(1000, 'Description too long'),
});

const RegisterForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(
      activeStep === 0 ? personalInfoSchema :
      activeStep === 1 ? sectorSchema :
      projectSchema
    ),
    mode: 'onChange',
  });

  const watchedSector = watch('sector');

  const handleNext = async () => {
    let isValid = false;
    const fields = [];

    switch (activeStep) {
      case 0:
        fields.push('name', 'email', 'password', 'confirmPassword');
        break;
      case 1:
        fields.push('sector');
        break;
      case 2:
        fields.push('projectDescription', 'role');
        break;
    }

    isValid = await trigger(fields);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    try {
      setRegistrationError('');
      const result = await registerUser(data);
      if (result.success) {
        navigate('/');
      } else {
        setRegistrationError(result.error || 'Registration failed');
      }
    } catch (error) {
      setRegistrationError('An unexpected error occurred');
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Full Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Your Primary Sector
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Choose the sector where you'll be analyzing policies
            </Typography>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {SECTORS.map((sector) => (
                <Grid item xs={12} sm={6} key={sector.id}>
                  <Paper
                    elevation={watchedSector === sector.id ? 4 : 1}
                    sx={{
                      p: 3,
                      cursor: 'pointer',
                      border: watchedSector === sector.id ? `2px solid ${sector.color}` : '2px solid transparent',
                      bgcolor: watchedSector === sector.id ? `${sector.color}10` : 'background.paper',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                      },
                    }}
                    onClick={() => {
                      // Set sector value
                      const event = { target: { value: sector.id } };
                      control._formValues.sector = sector.id;
                      trigger('sector');
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box sx={{ fontSize: '2rem', mr: 2 }}>
                        {sector.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {sector.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {sector.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            
            <Controller
              name="sector"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.sector} sx={{ mt: 2, display: 'none' }}>
                  <Select {...field}>
                    {SECTORS.map((sector) => (
                      <MenuItem key={sector.id} value={sector.id}>
                        {sector.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{errors.sector?.message}</FormHelperText>
                </FormControl>
              )}
            />
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Project Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="organization"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Organization (Optional)"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Your Role/Position"
                      placeholder="e.g., Policy Analyst, Project Manager"
                      error={!!errors.role}
                      helperText={errors.role?.message}
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Controller
                  name="projectDescription"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Policy Project Description"
                      multiline
                      rows={6}
                      error={!!errors.projectDescription}
                      helperText={errors.projectDescription?.message || 'Describe your policy project (50-1000 characters)'}
                      variant="outlined"
                      placeholder={`Describe the policy you want to analyze. Include objectives, stakeholders, and expected outcomes.`}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Paper 
      elevation={24} 
      sx={{ 
        p: { xs: 3, md: 5 }, 
        maxWidth: 900, 
        mx: 'auto', 
        mt: 4,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography 
          variant="h3" 
          fontWeight="800" 
          gutterBottom
          sx={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          POLICY 360°
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Create Your Account
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {['Personal Info', 'Sector', 'Project'].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {getStepContent(activeStep)}

        {registrationError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {registrationError}
          </Alert>
        )}

        <Box display="flex" justifyContent="space-between" mt={5}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<ArrowBack />}
            size="large"
          >
            Back
          </Button>
          
          {activeStep === 2 ? ( // Changed from steps.length - 1 to 2
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #764ba2, #667eea)',
                },
              }}
            >
              Complete Registration
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
              size="large"
            >
              Continue
            </Button>
          )}
        </Box>
      </Box>

      <Box mt={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Button 
            variant="text" 
            color="primary" 
            onClick={() => navigate('/login')}
            sx={{ textTransform: 'none' }}
          >
            Sign In
          </Button>
        </Typography>
      </Box>
    </Paper>
  );
};

export default RegisterForm;