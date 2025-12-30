// src/components/policy/PolicyWorkflow.js
import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  AvatarGroup,
  Tooltip,
  LinearProgress,
  IconButton,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
  Analytics as AnalyticsIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Star as StarIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const PolicyWorkflow = ({ policy, onStageUpdate }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedStages, setCompletedStages] = useState({});

  const steps = [
    {
      key: 'ideation',
      label: 'Ideation',
      icon: <LightbulbIcon />,
      color: '#FF9800',
      description: 'Define policy objectives and scope',
    },
    {
      key: 'analysis',
      label: 'Analysis',
      icon: <AnalyticsIcon />,
      color: '#2196F3',
      description: 'Analyze data and stakeholders',
    },
    {
      key: 'implementation',
      label: 'Implementation',
      icon: <PlayCircleOutlineIcon />,
      color: '#4CAF50',
      description: 'Execute policy plan',
    },
    {
      key: 'monitoring',
      label: 'Monitoring',
      icon: <TrendingUpIcon />,
      color: '#9C27B0',
      description: 'Track progress and metrics',
    },
    {
      key: 'evaluation',
      label: 'Evaluation',
      icon: <AssessmentIcon />,
      color: '#F44336',
      description: 'Assess impact and outcomes',
    },
    {
      key: 'success',
      label: 'Success',
      icon: <StarIcon />,
      color: '#FFC107',
      description: 'Policy achieved objectives',
    },
  ];

  const stageData = {
    ideation: {
      title: 'Policy Ideation & Planning',
      tasks: [
        'Define policy objectives',
        'Identify stakeholders',
        'Set timeline and milestones',
        'Allocate resources',
        'Risk assessment',
      ],
      completion: 75,
      stakeholders: 8,
    },
    analysis: {
      title: 'Data Analysis & Research',
      tasks: [
        'Collect relevant data',
        'Statistical analysis',
        'SWOT analysis',
        'Cost-benefit analysis',
        'Impact assessment',
      ],
      completion: 60,
      stakeholders: 12,
    },
    implementation: {
      title: 'Implementation Planning',
      tasks: [
        'Action plan development',
        'Team assignment',
        'Budget allocation',
        'Communication strategy',
        'Training programs',
      ],
      completion: 40,
      stakeholders: 15,
    },
    monitoring: {
      title: 'Monitoring & Reporting',
      tasks: [
        'KPI tracking',
        'Progress reports',
        'Issue identification',
        'Stakeholder updates',
        'Adjustment planning',
      ],
      completion: 30,
      stakeholders: 10,
    },
    evaluation: {
      title: 'Evaluation & Learning',
      tasks: [
        'Outcome measurement',
        'Impact analysis',
        'Lessons learned',
        'Recommendations',
        'Future planning',
      ],
      completion: 20,
      stakeholders: 8,
    },
    success: {
      title: 'Policy Success Achieved',
      tasks: [
        'Objectives met',
        'Stakeholder satisfaction',
        'Sustainable impact',
        'Knowledge transfer',
        'Scaling opportunities',
      ],
      completion: 10,
      stakeholders: 5,
    },
  };

  const handleNext = () => {
    const nextStep = activeStep + 1;
    if (nextStep <= steps.length - 1) {
      setActiveStep(nextStep);
      setCompletedStages(prev => ({ ...prev, [steps[activeStep].key]: true }));
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(0, prev - 1));
  };

  const handleStageComplete = () => {
    onStageUpdate(steps[activeStep].key, { completed: true, completedAt: new Date() });
    handleNext();
  };

  const getCurrentStage = () => steps[activeStep];
  const currentStageData = stageData[getCurrentStage().key];

  return (
    <Box>
      {/* Stepper Header */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.key} completed={completedStages[step.key] || index < activeStep}>
              <StepLabel
                StepIconComponent={() => (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: completedStages[step.key] || index < activeStep ? step.color : 'grey.200',
                        color: completedStages[step.key] || index < activeStep ? 'white' : 'grey.500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        boxShadow: 2,
                      }}
                    >
                      {completedStages[step.key] || index < activeStep ? (
                        <CheckCircleIcon />
                      ) : (
                        step.icon
                      )}
                      {index === activeStep && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            bgcolor: step.color,
                            border: '3px solid white',
                            animation: 'pulse 2s infinite',
                          }}
                        />
                      )}
                    </Box>
                  </motion.div>
                )}
              >
                <Typography variant="subtitle2" fontWeight="600">
                  {step.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {step.description}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Current Stage Content */}
      <motion.div
        key={activeStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Paper elevation={2} sx={{ p: 4, mb: 3, borderRadius: 3 }}>
          <Box display="flex" alignItems="center" mb={3}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: getCurrentStage().color,
                color: 'white',
                mr: 2,
              }}
            >
              {getCurrentStage().icon}
            </Box>
            <Box flex={1}>
              <Typography variant="h5" fontWeight="700">
                {currentStageData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stage {activeStep + 1} of {steps.length}
              </Typography>
            </Box>
            <Chip
              label={`${currentStageData.completion}% Complete`}
              color={currentStageData.completion >= 75 ? 'success' : 
                     currentStageData.completion >= 50 ? 'warning' : 'default'}
            />
          </Box>

          {/* Progress */}
          <Box mb={4}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Progress
              </Typography>
              <Typography variant="body2" fontWeight="600">
                {currentStageData.completion}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={currentStageData.completion}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: `${getCurrentStage().color}20`,
                '& .MuiLinearProgress-bar': {
                  bgcolor: getCurrentStage().color,
                  borderRadius: 5,
                },
              }}
            />
          </Box>

          {/* Tasks */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Key Tasks
              </Typography>
              <List>
                {currentStageData.tasks.map((task, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <Box display="flex" alignItems="center">
                      <CheckCircleIcon 
                        sx={{ 
                          fontSize: 20, 
                          color: index < currentStageData.tasks.length * (currentStageData.completion / 100) ? 
                                 getCurrentStage().color : 'grey.300',
                          mr: 1.5,
                        }} 
                      />
                      <Typography variant="body2">
                        {task}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Stakeholders
              </Typography>
              <Box mb={3}>
                <AvatarGroup max={5} sx={{ justifyContent: 'flex-start', mb: 2 }}>
                  {[...Array(currentStageData.stakeholders)].map((_, i) => (
                    <Avatar 
                      key={i}
                      sx={{ 
                        bgcolor: getCurrentStage().color,
                        width: 40,
                        height: 40,
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </Avatar>
                  ))}
                </AvatarGroup>
                <Typography variant="body2" color="text.secondary">
                  {currentStageData.stakeholders} stakeholders involved
                </Typography>
              </Box>

              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    size="small"
                  >
                    Export Data
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ShareIcon />}
                    size="small"
                  >
                    Share Progress
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Navigation */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Previous Stage
        </Button>

        <Box display="flex" gap={2}>
          {activeStep === steps.length - 1 ? (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => onStageUpdate('success', { completed: true })}
              >
                Mark as Successful
              </Button>
              <Button variant="outlined">
                Generate Final Report
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => onStageUpdate(getCurrentStage().key, { 
                  status: 'in-progress',
                  updatedAt: new Date(),
                })}
              >
                Save Progress
              </Button>
              <Button
                variant="contained"
                onClick={handleStageComplete}
                sx={{
                  background: `linear-gradient(45deg, ${getCurrentStage().color}, ${getCurrentStage().color}cc)`,
                }}
              >
                Complete {getCurrentStage().label}
                <ArrowForwardIcon sx={{ ml: 1 }} />
              </Button>
            </>
          )}
        </Box>
      </Box>

      {/* Step-by-Step Guide */}
      <Paper elevation={1} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Step-by-Step Guide
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Follow these steps to successfully navigate through the policy process:
        </Typography>
        <ol>
          <li>
            <Typography variant="body2" paragraph>
              <strong>Ideation:</strong> Generate and discuss new policy ideas.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              <strong>Analysis:</strong> Evaluate the feasibility and impact of the ideas.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              <strong>Implementation:</strong> Develop a detailed plan and execute it.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              <strong>Monitoring:</strong> Track the progress and make adjustments as needed.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" paragraph>
              <strong>Evaluation:</strong> Assess the outcomes and identify lessons learned.
            </Typography>
          </li>
        </ol>
      </Paper>
    </Box>
  );
};

// Helper List component
const List = ({ children }) => (
  <Box component="ul" sx={{ listStyle: 'none', pl: 0 }}>
    {children}
  </Box>
);

const ListItem = ({ children, disablePadding, sx }) => (
  <Box component="li" sx={{ py: 0.5, ...(disablePadding ? {} : { pl: 0 }), ...sx }}>
    {children}
  </Box>
);

export default PolicyWorkflow;