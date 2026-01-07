// src/pages/DashboardPage.js
import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data for Monthly Progress
const chartData = [
  { name: 'Jan', policyProgress: 40, implementation: 24, analysis: 24, monitoring: 12, evaluation: 8 },
  { name: 'Feb', policyProgress: 30, implementation: 13, analysis: 22, monitoring: 14, evaluation: 10 },
  { name: 'Mar', policyProgress: 20, implementation: 98, analysis: 22, monitoring: 16, evaluation: 12 },
  { name: 'Apr', policyProgress: 27, implementation: 39, analysis: 20, monitoring: 18, evaluation: 14 },
  { name: 'May', policyProgress: 18, implementation: 48, analysis: 21, monitoring: 15, evaluation: 11 },
  { name: 'Jun', policyProgress: 23, implementation: 38, analysis: 25, monitoring: 19, evaluation: 13 },
  { name: 'Jul', policyProgress: 34, implementation: 43, analysis: 21, monitoring: 20, evaluation: 15 },
];

// Sector Distribution Data
const sectorData = [
  { name: 'Education', value: 12, color: '#4CAF50' },
  { name: 'Health', value: 8, color: '#F44336' },
  { name: 'Agriculture', value: 6, color: '#FF9800' },
  { name: 'Urbanization', value: 9, color: '#2196F3' },
  { name: 'Technology', value: 5, color: '#9C27B0' },
];

// Policy Stages/Workflow Data
const stageData = [
  { name: 'Ideation', value: 18, color: '#FF6B6B' },
  { name: 'Analysis', value: 25, color: '#4ECDC4' },
  { name: 'Implementation', value: 20, color: '#45B7D1' },
  { name: 'Monitoring', value: 16, color: '#FFA07A' },
  { name: 'Evaluation', value: 12, color: '#98D8C8' },
];

// Policy Status Data
const statusData = [
  { name: 'Draft', value: 5, color: '#959595' },
  { name: 'In Review', value: 8, color: '#FFA500' },
  { name: 'Active', value: 14, color: '#4CAF50' },
  { name: 'Completed', value: 4, color: '#2196F3' },
];

// Recent Activity Data (Timeline)
const recentActivityData = [
  { month: 'Week 1', education: 3, health: 2, agriculture: 1, urbanization: 2, technology: 1 },
  { month: 'Week 2', education: 5, health: 3, agriculture: 2, urbanization: 3, technology: 2 },
  { month: 'Week 3', education: 4, health: 4, agriculture: 3, urbanization: 2, technology: 1 },
  { month: 'Week 4', education: 6, health: 5, agriculture: 2, urbanization: 4, technology: 3 },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const StatCard = ({ label, value, color, onClick }) => (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 1, sm: 1.25, md: 1.5 },
        textAlign: 'center',
        borderLeft: `4px solid ${color}`,
        borderRadius: 1.25,
        height: '100%',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { transform: 'translateY(-3px)', boxShadow: 2 } : {},
      }}
      onClick={onClick}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, mb: 1 }}>
        {label}
      </Typography>
      <Typography 
        variant={isMobile ? 'h6' : 'h5'} 
        fontWeight="700" 
        color={color}
        sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } }}
      >
        {value}
      </Typography>
    </Paper>
  );

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', width: '100%' }}>
      <Box sx={{ width: '100%', px: { xs: 1, sm: 2, md: 3 }, py: 2 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 2, pl: { xs: 0.5, sm: 1, md: 2 } }}>
        <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.3rem', sm: '1.6rem', md: '1.9rem' }, mb: 0.5 }}>
          Policy Analysis Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
          {user?.name ? `Sector: ${user.sector}` : 'Data Policy Management System'}
        </Typography>
      </Box>

      {/* Top 4 Stats Cards - Compact Layout */}
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Total Policies" value="31" color="#0033a0" onClick={() => navigate('/reports')} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Active Projects" value="8" color="#fcd116" onClick={() => navigate('/dashboard')} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Data Points" value="12,345" color="#20603d" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Success Rate" value="76%" color="#F44336" />
        </Grid>
      </Grid>

      {/* Charts Grid - Compact */}
      <Grid container spacing={1}>
        {/* Line Chart - Full Width on Mobile/Tablet, Half on Desktop */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={1} sx={{ p: 1, height: '100%', borderRadius: 1.5 }}>
            <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' } }}>
              Policy Implementation Progress
            </Typography>
            {/* Redesigned Charts Layout: main 8/4 area, sector overview, bottom pies */}
            <Grid container spacing={1} alignItems="stretch">
              {/* Main area: large line chart (left) and stacked small panels (right) */}
              <Grid item xs={12} md={8}>
                <Paper elevation={1} sx={{ p: 1, height: '100%', minHeight: { xs: 380, md: 520 }, borderRadius: 1.5 }}>
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
                    Policy Implementation Progress
                  </Typography>
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="policyProgress" stroke="#1976d2" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="implementation" stroke="#2e7d32" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="analysis" stroke="#ffb300" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
                  <Paper elevation={1} sx={{ p: 1, borderRadius: 1.5, flex: '1 1 0' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                      Policy Workflow Stages
                    </Typography>
                    <Box sx={{ width: '100%', height: 180 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stageData} margin={{ top: 0, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value">
                            {stageData.map((entry, idx) => (
                              <Cell key={idx} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>

                  <Paper elevation={1} sx={{ p: 1, borderRadius: 1.5, flex: '1 1 0' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                      Policy Status
                    </Typography>
                    <Box sx={{ width: '100%', height: 180 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={60} labelLine={false} label={({ name, value }) => `${name}: ${value}`}>
                            {statusData.map((entry, idx) => (
                              <Cell
                                key={idx}
                                fill={entry.color}
                                onClick={() => navigate(`/reports?status=${encodeURIComponent(entry.name)}`)}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>
                </Box>
              </Grid>

              {/* Sector Overview - full width */}
              <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: 1.5, borderRadius: 1.5 }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Sector Overview
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' }, gap: 1 }}>
                    {sectorData.map((sector, idx) => (
                      <Box key={idx} sx={{ p: 1.25, bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 1.5 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                          <Typography variant="body2" fontWeight={700} sx={{ fontSize: '0.95rem' }}>{sector.name}</Typography>
                          <Typography variant="body2" fontWeight={800} sx={{ color: sector.color }}>{sector.value}</Typography>
                        </Box>
                        <Box sx={{ height: 8, bgcolor: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
                          <Box sx={{ height: '100%', width: `${(sector.value / 12) * 100}%`, bgcolor: sector.color }} />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/* Bottom pies side-by-side */}
              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 1.25, borderRadius: 1.5, minHeight: 280 }}>
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>Policies by Workflow Stage</Typography>
                  <Box sx={{ width: '100%', height: 240 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={stageData} dataKey="value" cx="50%" cy="50%" outerRadius={90} labelLine={false} label={({ name, value }) => `${name}: ${value}`}>
                          {stageData.map((entry, idx) => (
                            <Cell
                              key={idx}
                              fill={entry.color}
                              onClick={() => navigate(`/reports?stage=${encodeURIComponent(entry.name)}`)}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={1} sx={{ p: 1.25, borderRadius: 1.5, minHeight: 280 }}>
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>Policies by Sector Distribution</Typography>
                  <Box sx={{ width: '100%', height: 240 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={sectorData} dataKey="value" cx="50%" cy="50%" outerRadius={90} labelLine={false} label={({ name, value }) => `${name}: ${value}`}>
                          {sectorData.map((entry, idx) => (
                            <Cell
                              key={idx}
                              fill={entry.color}
                              onClick={() => navigate(`/reports?sector=${encodeURIComponent(entry.name)}`)}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Policies by Sector Distribution Pie Chart */}
        <Grid item xs={12} lg={6}>
          <Paper elevation={1} sx={{ p: 1, height: '100%', minHeight: { xs: 380, md: 520 }, borderRadius: 1.5 }}>
            <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' } }}>
              Policies by Sector Distribution
            </Typography>
            <Box sx={{ width: '100%', height: { xs: 360, sm: 420, md: 520 } }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={!isMobile}
                    label={isMobile ? undefined : ({ name, value }) => `${name}: ${value}`}
                    outerRadius={isMobile ? 60 : 85}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;