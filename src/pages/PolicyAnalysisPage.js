import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Home as HomeIcon, Edit as EditIcon } from '@mui/icons-material';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import PolicyWorkflow from '../components/policy/PolicyWorkflow';

const sectorColors = ['#1976d2', '#43a047', '#f57c00', '#9c27b0', '#d32f2f', '#0288d1'];

const mockSectorData = [
  { name: 'Education', value: 28 },
  { name: 'Health', value: 22 },
  { name: 'Agriculture', value: 14 },
  { name: 'Urbanisation', value: 18 },
  { name: 'ICT', value: 12 },
  { name: 'Other', value: 6 },
];

const mockTimeline = [
  { name: 'Jan', progress: 10 },
  { name: 'Feb', progress: 25 },
  { name: 'Mar', progress: 40 },
  { name: 'Apr', progress: 55 },
  { name: 'May', progress: 65 },
  { name: 'Jun', progress: 78 },
];

const PolicyAnalysisPage = () => {
  const navigate = useNavigate();
  const [project, setProject] = useState({
    owner: 'Jane Doe',
    email: 'jane.doe@example.org',
    sector: 'Education',
    description: 'Improving primary education outcomes through targeted interventions and monitoring.',
  });
  const [openEdit, setOpenEdit] = useState(false);
  const [stageUpdates, setStageUpdates] = useState({});

  const handleImport = (type) => {
    // Navigate to the central data import page with a query param
    navigate('/import-data', { state: { method: type } });
  };

  const handleStageUpdate = (stageKey, payload) => {
    setStageUpdates(prev => ({ ...prev, [stageKey]: payload }));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Policy Analysis</Typography>
          <Typography variant="body2" color="text.secondary">Charts-first workspace to analyze and progress a policy through ideation → analysis → implementation → monitoring → evaluation.</Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button startIcon={<HomeIcon />} onClick={() => navigate('/')}>Home</Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Left: charts and timeline */}
        <Grid item xs={12} lg={7}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h6" fontWeight={600}>Project Overview</Typography>
                    <Typography variant="body2" color="text.secondary">Owner: {project.owner} • {project.email}</Typography>
                  </Box>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{ bgcolor: '#1976d2' }}>{project.owner ? project.owner.charAt(0) : 'U'}</Avatar>
                    <IconButton size="small" onClick={() => setOpenEdit(true)}><EditIcon /></IconButton>
                  </Stack>
                </Box>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2" color="text.secondary">Sector: <strong>{project.sector}</strong></Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>{project.description}</Typography>
                <Box display="flex" gap={1} mt={2}>
                  <Button variant="contained" onClick={() => handleImport('upload')}>Upload Documents</Button>
                  <Button variant="outlined" onClick={() => handleImport('manual')}>Manual Entry</Button>
                  <Button variant="outlined" onClick={() => handleImport('scrape')}>Scraping Setup</Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 320, borderRadius: 2 }} elevation={2}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Sector Distribution</Typography>
                <ResponsiveContainer width="100%" height="88%">
                  <PieChart>
                    <Pie data={mockSectorData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} paddingAngle={4}>
                      {mockSectorData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={sectorColors[idx % sectorColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: 320, borderRadius: 2 }} elevation={2}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Progress Timeline</Typography>
                <ResponsiveContainer width="100%" height="88%">
                  <LineChart data={mockTimeline} margin={{ top: 8, right: 8, left: -10, bottom: 6 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="progress" stroke="#1976d2" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Notes & Quick Findings</Typography>
                <Typography variant="body2" color="text.secondary">Use this space to summarize insights derived from imported documents, scraped data, or manual entries. Add short bullet points and link to detailed reports in the Reports area.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right: workflow */}
        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 2, borderRadius: 2, mb: 3 }} elevation={2}>
            <Typography variant="h6" fontWeight={700} gutterBottom>Policy Workflow</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>Move your policy through the stage-based workflow. Update stage status to record progress.</Typography>
            <Box mt={2}>
              <PolicyWorkflow onStageUpdate={handleStageUpdate} />
            </Box>
          </Paper>

          <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
            <Typography variant="h6" fontWeight={700} gutterBottom>Actions</Typography>
            <Stack spacing={1}>
              <Button fullWidth variant="contained" onClick={() => navigate('/reports')}>Open Reports</Button>
              <Button fullWidth variant="outlined" onClick={() => navigate('/policy-workflow')}>Open Full Workflow</Button>
              <Button fullWidth variant="outlined" onClick={() => handleImport('upload')}>Import Documents</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit project dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Owner" value={project.owner} onChange={(e) => setProject(prev => ({ ...prev, owner: e.target.value }))} fullWidth />
            <TextField label="Email" value={project.email} onChange={(e) => setProject(prev => ({ ...prev, email: e.target.value }))} fullWidth />
            <TextField label="Sector" value={project.sector} onChange={(e) => setProject(prev => ({ ...prev, sector: e.target.value }))} fullWidth />
            <TextField label="Description" value={project.description} onChange={(e) => setProject(prev => ({ ...prev, description: e.target.value }))} multiline rows={4} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenEdit(false)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PolicyAnalysisPage;
