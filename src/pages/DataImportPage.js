import React from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CreateIcon from '@mui/icons-material/Create';
import WebIcon from '@mui/icons-material/Web';

const ImportCard = ({ title, description, icon, onClick }) => (
    <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {icon}
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>{description}</Typography>
        <Button variant="contained" onClick={onClick} startIcon={icon}>
            Open
        </Button>
    </Paper>
);

const DataImportPage = () => {
    return (
        <Box sx={{ width: '100%', py: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>Data Import</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Import documents, manually enter data, or scrape relevant sources to feed the policy analysis process.
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <ImportCard
                        title="Import Documents"
                        description="Upload PDF, DOCX or CSV documents related to policy evidence and reports."
                        icon={<CloudUploadIcon />}
                        onClick={() => alert('Open Import Documents')}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <ImportCard
                        title="Manual Entry"
                        description="Add policy data manually via guided forms for small datasets or corrections."
                        icon={<CreateIcon />}
                        onClick={() => alert('Open Manual Entry')}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <ImportCard
                        title="Web Scraping"
                        description="Configure scrapers to collect public data from sector-specific platforms and portals."
                        icon={<WebIcon />}
                        onClick={() => alert('Open Web Scraping')}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default DataImportPage;