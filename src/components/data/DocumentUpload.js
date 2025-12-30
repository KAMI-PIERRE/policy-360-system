// src/components/data/DocumentUpload.js
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  LinearProgress,
  Paper,
  Alert,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  InsertDriveFile as InsertDriveFileIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const DocumentUpload = ({ policy, onUploadComplete }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError('');
    
    if (rejectedFiles.length > 0) {
      setError('Some files were rejected. Please check file types and sizes.');
    }

    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type,
      status: 'pending',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/json': ['.json'],
      'text/xml': ['.xml'],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true,
  });

  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const simulateUpload = (file) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, status: 'completed', progress: 100 } : f
          ));
          
          setUploadProgress(prev => ({ ...prev, [file.id]: 100 }));
          resolve(file);
        } else {
          setUploadProgress(prev => ({ ...prev, [file.id]: progress }));
          setFiles(prev => prev.map(f => 
            f.id === file.id ? { ...f, progress } : f
          ));
        }
      }, 200);
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select files to upload');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const pendingFiles = files.filter(f => f.status === 'pending');
      
      for (const file of pendingFiles) {
        await simulateUpload(file);
      }

      // Notify parent component
      onUploadComplete({
        files: files.map(f => ({ name: f.name, type: f.type })),
        count: files.length,
        policyId: policy.id,
      });

      // Clear files after successful upload
      setTimeout(() => {
        setFiles([]);
        setUploadProgress({});
      }, 2000);

    } catch (err) {
      setError('Upload failed. Please try again.');
      setFiles(prev => prev.map(f => 
        f.status === 'pending' ? { ...f, status: 'error' } : f
      ));
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (type) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('excel') || type.includes('csv')) return '📊';
    if (type.includes('word')) return '📝';
    if (type.includes('json') || type.includes('xml')) return '🔧';
    return '📎';
  };

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Supported formats:</strong> PDF, Excel (xls, xlsx), CSV, Word (doc, docx), JSON, XML
          <br />
          <strong>Max file size:</strong> 50MB per file
        </Typography>
      </Alert>

      {/* Dropzone */}
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Paper
          {...getRootProps()}
          elevation={isDragActive ? 8 : 2}
          sx={{
            p: 6,
            textAlign: 'center',
            cursor: 'pointer',
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'grey.300',
            bgcolor: isDragActive ? 'primary.light' : 'background.paper',
            transition: 'all 0.3s',
            mb: 3,
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            or click to browse files
          </Typography>
          <Button variant="contained">
            Select Files
          </Button>
        </Paper>
      </motion.div>

      {/* Selected Files List */}
      {files.length > 0 && (
        <Paper elevation={2} sx={{ mb: 3 }}>
          <List>
            {files.map((file) => (
              <ListItem
                key={file.id}
                secondaryAction={
                  file.status === 'pending' && (
                    <IconButton edge="end" onClick={() => removeFile(file.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemIcon>
                  <Typography variant="h5">
                    {getFileIcon(file.type)}
                  </Typography>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body1" noWrap>
                        {file.name}
                      </Typography>
                      {file.status === 'completed' && (
                        <CheckCircleIcon color="success" fontSize="small" />
                      )}
                      {file.status === 'error' && (
                        <ErrorIcon color="error" fontSize="small" />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {file.size} • {file.type}
                      </Typography>
                      {file.status === 'pending' && (
                        <LinearProgress 
                          variant="determinate" 
                          value={uploadProgress[file.id] || 0}
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Actions */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body2" color="text.secondary">
          {files.length} file(s) selected
        </Typography>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
          startIcon={uploading ? null : <CloudUploadIcon />}
          sx={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            '&:hover': {
              background: 'linear-gradient(45deg, #764ba2, #667eea)',
            },
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Files'}
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentUpload;