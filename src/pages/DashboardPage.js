// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  Fab,
  Tabs,
  Tab,
  Badge,
  Avatar,
  AvatarGroup,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  DataArray as DataArrayIcon,
  Assessment as AssessmentIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
  CloudUpload as CloudUploadIcon,
  Analytics as AnalyticsIcon,
  School,
  LocalHospital,
  Agriculture,
  Architecture,
  Computer,
  ArrowForward,
  MoreVert,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import DataImportTabs from '../components/data/DataImportTabs';
import PolicyWorkflow from '../components/policy/PolicyWorkflow';
import { SECTORS } from '../utils/constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

// Mock data
const mockPolicies = [
  {
    id: '1',
    title: 'Rural Education Enhancement Program',
    description: 'A comprehensive policy to improve educational infrastructure and teacher training in rural areas.',
    sector: 'education',
    status: 'active',
    progress: 65,
    stage: 'Implementation',
    lastUpdated: '2024-01-15',
    stakeholders: 12,
    color: '#4CAF50',
  },
  {
    id: '2',
    title: 'National Health Insurance Scheme',
    description: 'Universal healthcare coverage policy implementation and monitoring framework.',
    sector: 'health',
    status: 'analysis',
    progress: 40,
    stage: 'Analysis',
    lastUpdated: '2024-01-14',
    stakeholders: 24,
    color: '#F44336',
  },
  {
    id: '3',
    title: 'Sustainable Agriculture Initiative',
    description: 'Policy framework for promoting organic farming and sustainable agricultural practices.',
    sector: 'agriculture',
    status: 'ideation',
    progress: 25,
    stage: 'Ideation',
    lastUpdated: '2024-01-12',
    stakeholders: 8,
    color: '#FF9800',
  },
];

const sectorStats = {
  education: { policies: 12, successRate: '78%', dataSources: 45 },
  health: { policies: 8, successRate: '85%', dataSources: 67 },
  agriculture: { policies: 6, successRate: '72%', dataSources: 32 },
  urbanization: { policies: 9, successRate: '81%', dataSources: 54 },
  technology: { policies: 5, successRate: '90%', dataSources: 41 },
};

const getSectorIcon = (sector) => {
  switch (sector) {
    case 'education': return <School />;
    case 'health': return <LocalHospital />;
    case 'agriculture': return <Agriculture />;
    case 'urbanization': return <Architecture />;
    case 'technology': return <Computer />;
    default: return <AssessmentIcon />;
  }
};

const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [policies, setPolicies] = useState(mockPolicies);
  const [stats, setStats] = useState({
    totalPolicies: 31,
    activeProjects: 8,
    dataPoints: 12345,
    completionRate: '76%',
  });

  const sectorInfo = {
    education: { label: 'Education', icon: <School />, color: '#4CAF50' },
    health: { label: 'Health', icon: <LocalHospital />, color: '#F44336' },
    agriculture: { label: 'Agriculture', icon: <Agriculture />, color: '#FF9800' },
    urbanization: { label: 'Urbanization', icon: <Architecture />, color: '#2196F3' },
    technology: { label: 'ICT & Technology', icon: <Computer />, color: '#9C27B0' },
  }[user?.sector] || { label: 'General', color: '#667eea' };

  const handleCreateNewPolicy = () => {
    toast.success('Creating new policy analysis...');
    navigate('/policy/new');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const QuickActionCard = ({ icon, title, description, color, onClick }) => (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card 
        sx={{ 
          height: '100%',
          cursor: 'pointer',
          borderLeft: `4px solid ${color}`,
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Box
              sx={{
                p: 1,
                borderRadius: 2,
                bgcolor: `${color}20`,
                color: color,
                mr: 2,
              }}
            >
              {icon}
            </Box>
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Summary Data in Cards */}
      <Grid container spacing={3}>
        {[ // Summary data array
          { label: 'Total Policies', value: 31, color: '#0033a0' }, // Blue
          { label: 'Active Projects', value: 8, color: '#fcd116' }, // Yellow
          { label: 'Data Points', value: '12,345', color: '#20603d' }, // Green
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                borderLeft: `5px solid ${item.color}`,
              }}
            >
              <Typography variant="h6" fontWeight="600" gutterBottom>
                {item.label}
              </Typography>
              <Typography variant="h4" fontWeight="800" color={item.color}>
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Line Chart Analysis
            </Typography>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bar Chart Analysis
            </Typography>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;