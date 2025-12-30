// src/components/data/DataImportTabs.js
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  Button,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Edit as EditIcon,
  Language as LanguageIcon,
  CheckCircle as CheckCircleIcon,
  Description as DescriptionIcon,
  TableChart as TableChartIcon,
  InsertDriveFile as InsertDriveFileIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import DocumentUpload from './DocumentUpload';
import ManualEntryForm from './ManualEntryForm';
import WebScrapingSetup from './WebScrapingSetup';

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ p: 3 }}>{children}</Box>
        </motion.div>
      )}
    </div>
  );
};

const supportedFormats = [
  { icon: <DescriptionIcon />, format: 'PDF Documents', description: 'Policy documents, reports, research papers' },
  { icon: <TableChartIcon />, format: 'Excel/CSV', description: 'Statistical data, survey results, financial records' },
  { icon: <InsertDriveFileIcon />, format: 'Word Docs', description: 'Policy drafts, meeting minutes, proposals' },
  { icon: <TableChartIcon />, format: 'JSON/XML', description: 'API data, structured datasets, configuration files' },
];

const DataImportTabs = ({ policy, onDataImported }) => {
  const [tabValue, setTabValue] = useState(0);
  const [importHistory, setImportHistory] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImportComplete = (data, type) => {
    setIsImporting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newImport = {
        id: Date.now(),
        type,
        fileName: type === 'document' ? data.name : `${type} import`,
        date: new Date().toLocaleString(),
        size: type === 'document' ? data.size : 'N/A',
        status: 'completed',
      };
      
      setImportHistory(prev => [newImport, ...prev]);
      setIsImporting(false);
      onDataImported(data);
      
      // Show success message
      alert.success(`Data imported successfully via ${type}!`);
    }, 1500);
  };

  return (
    <Paper elevation={0} sx={{ width: '100%', borderRadius: 3 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              py: 2,
              fontSize: '0.9rem',
              fontWeight: 600,
            },
          }}
        >
          <Tab icon={<CloudUploadIcon />} iconPosition="start" label="Document Upload" />
          <Tab icon={<EditIcon />} iconPosition="start" label="Manual Entry" />
          <Tab icon={<LanguageIcon />} iconPosition="start" label="Web Scraping" />
        </Tabs>
      </Box>

      {/* Import Methods Overview */}
      <Box sx={{ p: 3, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          Choose Your Data Import Method
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Import data from various sources to enhance your policy analysis. All imported data will be automatically analyzed and integrated into your policy workflow.
        </Typography>
        
        <List dense>
          {supportedFormats.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.format}
                secondary={item.description}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <DocumentUpload 
          policy={policy}
          onUploadComplete={(data) => handleImportComplete(data, 'document')}
        />
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <ManualEntryForm 
          policy={policy}
          onSubmit={(data) => handleImportComplete(data, 'manual')}
        />
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        <WebScrapingSetup 
          policy={policy}
          onScrapingComplete={(data) => handleImportComplete(data, 'scraping')}
        />
      </TabPanel>

      {/* Import History */}
      {importHistory.length > 0 && (
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>
            Recent Imports
          </Typography>
          <List>
            {importHistory.slice(0, 3).map((item) => (
              <ListItem key={item.id}>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={`${item.fileName} (${item.type})`}
                  secondary={`Imported on ${item.date} • ${item.size}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {isImporting && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <CircularProgress size={24} sx={{ mr: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Processing imported data...
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default DataImportTabs;