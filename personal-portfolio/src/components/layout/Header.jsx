import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 1000,
      fontFamily: 'Inconsolata, monospace'
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link 
          to="/" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}
        >
          {"{NATHAN_GOPEE}"}
        </Link>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              style={{
                color: location.pathname === item.path ? '#8e44ad' : 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'none',
                padding: '8px 12px',
                borderRadius: '4px',
                transition: 'all 0.3s ease',
                background: location.pathname === item.path ? 'rgba(142, 68, 173, 0.1)' : 'transparent'
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                color: location.pathname === item.path ? '#8e44ad' : 'white',
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          nav > div:nth-child(2) {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
