import React from 'react';
import { Box, Paper, Typography, Avatar, Grid, Button } from '@mui/material';

const ProfilePage = () => {
  return (
    <Box sx={{ width: '100%', py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>My Profile</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }} elevation={1}>
            <Avatar sx={{ width: 96, height: 96, bgcolor: 'primary.main', mb: 2 }}>U</Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>User Name</Typography>
            <Typography variant="body2" color="text.secondary">Sector: Education</Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>Edit Profile</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }} elevation={1}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>Account Details</Typography>
            <Typography variant="body2" color="text.secondary">Email: user@example.com</Typography>
            <Typography variant="body2" color="text.secondary">Role: Policy Analyst</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Project description and other user-provided details would appear here.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
