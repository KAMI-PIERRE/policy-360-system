import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const ChartCard = ({ title, children, sx = {}, variant = 'h6' }) => (
  <Paper elevation={2} sx={{ p: 1.25, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'visible', ...sx }}>
    {title && (
      <Typography variant={variant} sx={{ mb: 1.25, fontWeight: 600 }}>{title}</Typography>
    )}
    <Box sx={{ width: '100%', flex: 1, overflow: 'visible' }}>{children}</Box>
  </Paper>
);

export default ChartCard;
