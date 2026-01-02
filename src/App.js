// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { PolicyProvider } from './context/PolicyContext';

// Pages
import LoginPage from './pages/LoginPage';
// eslint-disable-next-line no-unused-vars
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PolicyDetailPage from './pages/PolicyDetailPage';
import DataImportPage from './pages/DataImportPage';
import ReportsPage from './pages/ReportsPage';
import LandingPage from './pages/LandingPage';

// Components
import Layout from './components/shared/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
// eslint-disable-next-line no-unused-vars
import RegisterForm from './components/auth/RegisterForm';
// eslint-disable-next-line no-unused-vars
import LoginForm from './components/auth/LoginForm';
import PolicyWorkflow from './components/policy/PolicyWorkflow';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0033a0', // Blue
    },
    secondary: {
      main: '#fcd116', // Yellow
    },
    background: {
      default: '#20603d', // Green
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <PolicyProvider>
          <Router>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '16px',
                },
              }}
            />
            <Navbar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/policy/:id" element={
                <ProtectedRoute>
                  <Layout>
                    <PolicyDetailPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/import-data" element={
                <ProtectedRoute>
                  <Layout>
                    <DataImportPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Layout>
                    <ReportsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/policy-workflow" element={
                <ProtectedRoute>
                  <Layout>
                    <PolicyWorkflow />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </Router>
        </PolicyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;