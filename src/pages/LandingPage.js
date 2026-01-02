import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Policy360</h1>
        <p>Your ultimate solution for policy analysis and management.</p>
        <div className="landing-buttons">
          <Link to="/dashboard" className="btn btn-primary">Get Started</Link>
        </div>
      </header>
      <section className="features">
        <div className="feature">
          <h2>Analyze Policies</h2>
          <p>Use our tools to evaluate and improve policy effectiveness.</p>
        </div>
        <div className="feature">
          <h2>Collaborate</h2>
          <p>Work with your team in real-time to develop impactful policies.</p>
        </div>
        <div className="feature">
          <h2>Monitor Progress</h2>
          <p>Track the implementation and outcomes of your policies.</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;