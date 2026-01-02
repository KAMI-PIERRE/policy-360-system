import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Policy360</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li> {/* Home button */}
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        {isAuthenticated && <li><Link to="/data-import">Data Import</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;