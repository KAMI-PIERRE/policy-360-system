import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Policy360</h4>
          <p>Policy360 is your ultimate solution for data-driven policy analysis and management.</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@policy360.com</p>
          <p>Phone: +250 123 456 789</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Twitter | LinkedIn | Facebook</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Policy360. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;