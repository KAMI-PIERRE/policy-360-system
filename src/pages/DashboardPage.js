// src/pages/DashboardPage.js
import React from 'react';
import {
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';

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

      {/* Top 4 Stats Cards - Compact Layout (CSS Grid) */}
      <Box sx={{ mb: 2, display: 'grid', gap: 1, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
        <StatCard label="Total Policies" value="31" color="#0033a0" onClick={() => navigate('/reports')} />
        <StatCard label="Active Projects" value="8" color="#fcd116" onClick={() => navigate('/dashboard')} />
        <StatCard label="Data Points" value="12,345" color="#20603d" />
        <StatCard label="Success Rate" value="76%" color="#F44336" />
      </Box>

      {/* Charts Grid - responsive CSS Grid filling available space */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 2 }}>
        <Box sx={{ gridColumn: { lg: 'span 2' } }}>
          <ChartCard title="Policy Implementation Progress" sx={{ minHeight: 420 }}>
            <ResponsiveContainer width="100%" height={420}>
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
          </ChartCard>
        </Box>

        <ChartCard title="Policies by Sector Distribution" sx={{ minHeight: 420 }}>
          <ResponsiveContainer width="100%" height={420}>
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                labelLine={!isMobile}
                label={isMobile ? undefined : ({ name, value }) => `${name}: ${value}`}
                outerRadius={isMobile ? 60 : 120}
                fill="#8884d8"
                dataKey="value"
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} onClick={() => navigate(`/reports?sector=${encodeURIComponent(entry.name)}`)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Policy Workflow Stages" sx={{ minHeight: 300 }}>
          <ResponsiveContainer width="100%" height={260}>
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
        </ChartCard>

        <ChartCard title="Policy Status" sx={{ minHeight: 300 }}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={90} labelLine={false} label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} onClick={() => navigate(`/reports?status=${encodeURIComponent(entry.name)}`)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Policies by Workflow Stage" sx={{ minHeight: 300 }}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={stageData} dataKey="value" cx="50%" cy="50%" outerRadius={90} labelLine={false} label={({ name, value }) => `${name}: ${value}`}>
                {stageData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} onClick={() => navigate(`/reports?stage=${encodeURIComponent(entry.name)}`)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sector Overview" sx={{ minHeight: 180 }}>
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
        </ChartCard>

        <ChartCard title="Recent Activity" sx={{ minHeight: 300 }}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={recentActivityData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="education" fill="#4CAF50" />
              <Bar dataKey="health" fill="#F44336" />
              <Bar dataKey="agriculture" fill="#FF9800" />
              <Bar dataKey="urbanization" fill="#2196F3" />
              <Bar dataKey="technology" fill="#9C27B0" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;