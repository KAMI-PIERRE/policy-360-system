import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setShowDropdown(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">Policy360</Link>
          </div>
          
          {/* Hamburger Menu Icon */}
          <div 
            className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Navigation Links */}
          <ul className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            {!isAuthenticated ? (
              <>
                <li><Link to="/register" onClick={closeMobileMenu}>Register</Link></li>
                <li><Link to="/login" onClick={closeMobileMenu}>Login</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link></li>
                {location.pathname !== '/' && (
                  <>
                    <li><Link to="/import-data" onClick={closeMobileMenu}>Data Import</Link></li>
                    <li><Link to="/reports" onClick={closeMobileMenu}>Reports</Link></li>
                  </>
                )}
                <li className="navbar-user-menu">
                  <button 
                    className="user-button"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {user?.name || 'User'} ▼
                  </button>
                  {showDropdown && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <p><strong>{user?.name}</strong></p>
                        <p className="sector">{user?.sector}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => { navigate('/profile'); setShowDropdown(false); }} className="logout-btn">Profile</button>
                        <button onClick={() => { navigate('/settings'); setShowDropdown(false); }} className="logout-btn">Settings</button>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                      </div>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;