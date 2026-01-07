import React from 'react';
import { Box, Paper, Typography, Grid, Switch, FormControlLabel } from '@mui/material';

const SettingsPage = () => {
  return (
    <Box sx={{ width: '100%', py: 3 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>Settings</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }} elevation={1}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>Appearance</Typography>
            <FormControlLabel control={<Switch defaultChecked />} label="Enable compact dashboard" />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }} elevation={1}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>Notifications</Typography>
            <FormControlLabel control={<Switch defaultChecked />} label="Email alerts" />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;
