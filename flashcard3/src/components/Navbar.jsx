import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../firebase';
import './Navbar.css';

const Navbar = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dash" className="logo">LearnLoop</Link>
      </div>

      <div className="navbar-links">
        {/* Add any other nav links here if needed */}
      </div>

      <div className="navbar-user">
        {currentUser ? (
          <>
            {currentUser.photoURL && (
              <img
                src={currentUser.photoURL}
                alt="user"
                className="avatar"
                title={currentUser.displayName}
              />
            )}
            <span>{currentUser.displayName?.split(' ')[0]}</span>
            <button onClick={handleLogout} className="login-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
