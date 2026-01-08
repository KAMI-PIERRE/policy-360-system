import React from 'react';
import { Paper, Typography, useTheme, useMediaQuery, Box } from '@mui/material';

const StatCard = ({ label, value, color = '#1976d2', onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper
      elevation={3}
      onClick={onClick}
      sx={{
        p: { xs: 1, sm: 1.25, md: 1.5 },
        textAlign: 'center',
        borderLeft: `4px solid ${color}`,
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { transform: 'translateY(-4px)', boxShadow: 6 } : {},
        bgcolor: 'background.paper'
      }}
    >
      <Box sx={{ mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.78rem', sm: '0.9rem' } }}>
          {label}
        </Typography>
      </Box>

      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        fontWeight={700}
        color={color}
        sx={{ fontSize: { xs: '1.35rem', sm: '1.6rem', md: '1.9rem' } }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;
