import React from 'react';
import { Box, Paper, Typography, Grid, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ReportsPage = () => {
    return (
        <Box sx={{ width: '100%', py: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>Reports</Typography>
            <Paper sx={{ p: 2, mb: 2 }} elevation={1}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <TextField fullWidth placeholder="Search reports, policies, sectors..." variant="outlined" size="small" InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                        <Button variant="outlined" sx={{ mr: 1 }}>Export CSV</Button>
                        <Button variant="contained">New Report</Button>
                    </Grid>
                </Grid>
            </Paper>

            <Paper sx={{ p: 2 }} elevation={1}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>Recent Reports</Typography>
                <Typography variant="body2" color="text.secondary">No reports available yet — import data and generate your first analysis.</Typography>
            </Paper>
        </Box>
    );
};

export default ReportsPage;