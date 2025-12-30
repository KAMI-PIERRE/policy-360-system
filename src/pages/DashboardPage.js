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
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1600, mx: 'auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" fontWeight="800" gutterBottom>
              Welcome back, {user?.name}!
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Chip
                icon={sectorInfo.icon}
                label={sectorInfo.label}
                sx={{
                  backgroundColor: `${sectorInfo.color}20`,
                  color: sectorInfo.color,
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  py: 1,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {user?.email} • {user?.organization || 'Independent Analyst'}
              </Typography>
            </Box>
          </Box>
          
          <Fab
            color="primary"
            variant="extended"
            onClick={handleCreateNewPolicy}
            sx={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              '&:hover': {
                background: 'linear-gradient(45deg, #764ba2, #667eea)',
              },
            }}
          >
            <AddIcon sx={{ mr: 1 }} />
            New Policy Analysis
          </Fab>
        </Box>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Grid container spacing={3} mb={4}>
          {[
            { label: 'Total Policies', value: stats.totalPolicies, icon: <AssessmentIcon />, color: '#667eea' },
            { label: 'Active Projects', value: stats.activeProjects, icon: <TimelineIcon />, color: '#4CAF50' },
            { label: 'Data Points', value: stats.dataPoints.toLocaleString(), icon: <DataArrayIcon />, color: '#2196F3' },
            { label: 'Success Rate', value: stats.completionRate, icon: <TrendingUpIcon />, color: '#9C27B0' },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  p: 3,
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
                  },
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h3" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color, fontSize: 40 }}>
                    {stat.icon}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Quick Actions & Sector Stats */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Quick Actions */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <QuickActionCard
                    icon={<CloudUploadIcon />}
                    title="Import Data"
                    description="Upload documents, enter manually, or scrape from sources"
                    color="#667eea"
                    onClick={() => navigate('/import-data')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <QuickActionCard
                    icon={<AnalyticsIcon />}
                    title="Generate Reports"
                    description="Create comprehensive policy analysis reports"
                    color="#4CAF50"
                    onClick={() => navigate('/reports')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <QuickActionCard
                    icon={<PeopleIcon />}
                    title="Team Collaboration"
                    description="Invite stakeholders and collaborate in real-time"
                    color="#2196F3"
                    onClick={() => toast.success('Team features coming soon!')}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Sector Statistics */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="600">
                {sectorInfo.label} Sector Stats
              </Typography>
              <Box>
                {Object.entries(sectorStats[user?.sector] || sectorStats.education).map(([key, value]) => (
                  <Box key={key} display="flex" justifyContent="space-between" alignItems="center" py={2}>
                    <Typography variant="body2" color="text.secondary">
                      {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </Typography>
                    <Typography variant="body1" fontWeight="600">
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Right Column - Recent Policies */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Paper sx={{ p: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight="600">
                  Recent Policy Analyses
                </Typography>
                <Tabs value={tabValue} onChange={handleTabChange} size="small">
                  <Tab label="All" />
                  <Tab label="Active" />
                  <Tab label="Draft" />
                </Tabs>
              </Box>

              <Grid container spacing={2}>
                {policies.map((policy) => (
                  <Grid item xs={12} key={policy.id}>
                    <motion.div whileHover={{ y: -2 }}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': {
                            boxShadow: 8,
                          },
                        }}
                        onClick={() => navigate(`/policy/${policy.id}`)}
                      >
                        <CardContent>
                          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            <Box flex={1}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <Box
                                  sx={{
                                    p: 0.5,
                                    borderRadius: 1,
                                    bgcolor: policy.color,
                                    color: 'white',
                                    mr: 1.5,
                                  }}
                                >
                                  {getSectorIcon(policy.sector)}
                                </Box>
                                <Chip
                                  label={policy.status}
                                  size="small"
                                  color={
                                    policy.status === 'active' ? 'success' :
                                    policy.status === 'analysis' ? 'warning' :
                                    policy.status === 'ideation' ? 'info' : 'default'
                                  }
                                />
                              </Box>
                              
                              <Typography variant="h6" gutterBottom>
                                {policy.title}
                              </Typography>
                              
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {policy.description}
                              </Typography>
                              
                              <Box display="flex" alignItems="center" gap={4}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">
                                    Progress
                                  </Typography>
                                  <Box display="flex" alignItems="center" gap={1}>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={policy.progress} 
                                      sx={{ 
                                        flex: 1,
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: `${policy.color}20`,
                                        '& .MuiLinearProgress-bar': {
                                          bgcolor: policy.color,
                                        },
                                      }}
                                    />
                                    <Typography variant="caption" fontWeight="600">
                                      {policy.progress}%
                                    </Typography>
                                  </Box>
                                </Box>
                                
                                <Box>
                                  <Typography variant="caption" color="text.secondary">
                                    Stage
                                  </Typography>
                                  <Typography variant="body2" fontWeight="600">
                                    {policy.stage}
                                  </Typography>
                                </Box>
                                
                                <Box>
                                  <Typography variant="caption" color="text.secondary">
                                    Stakeholders
                                  </Typography>
                                  <Box display="flex" alignItems="center">
                                    <PeopleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                    <Typography variant="body2" fontWeight="600">
                                      {policy.stakeholders}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            
                            <IconButton size="small">
                              <MoreVert />
                            </IconButton>
                          </Box>
                        </CardContent>
                        
                        <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            Updated {policy.lastUpdated}
                          </Typography>
                          <Button 
                            endIcon={<ArrowForward />}
                            size="small"
                          >
                            Continue Analysis
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              <Box textAlign="center" mt={3}>
                <Button 
                  variant="outlined"
                  onClick={() => navigate('/policies')}
                >
                  View All Policies
                </Button>
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Data Import Section */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Data Import
        </Typography>
        <DataImportTabs
          policy={mockPolicies[0]} // Example policy
          onDataImported={(data) => console.log('Data imported:', data)}
        />
      </Paper>

      {/* Policy Workflow Section */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Policy Workflow
        </Typography>
        <PolicyWorkflow
          policy={mockPolicies[0]} // Example policy
          onStageUpdate={(stage) => console.log('Stage updated:', stage)}
        />
      </Paper>

      {/* Sector Overview Section */}
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Sector Overview
        </Typography>
        <Grid container spacing={2}>
          {SECTORS.map((sector) => (
            <Grid item xs={12} sm={6} md={4} key={sector.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  backgroundColor: sector.color,
                  color: '#fff',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {sector.icon} {sector.name}
                </Typography>
                <Typography variant="body2">
                  {sector.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

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