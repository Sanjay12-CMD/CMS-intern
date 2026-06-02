import { useEffect, useRef, useState } from 'react';
import './header.css';
import { college } from './header.js';
import { GraduationCap, Moon, MoreHorizontal, Sun, UserCog, ChevronRight } from 'lucide-react';

export default function Header({ isDarkMode, onNavigate, onThemeToggle, onLoginSelect }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const closeMenuWithKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', closeMenu);
    document.addEventListener('keydown', closeMenuWithKey);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
      document.removeEventListener('keydown', closeMenuWithKey);
    };
  }, []);

  const selectLogin = (type) => {
    setMenuOpen(false);
    onLoginSelect(type);
  };

  return (
    <header className="header" role="banner">
      {/* Left Side: Logo & College Name */}
      <div className="header-brand" onClick={() => onNavigate('home')} aria-label={college.name} style={{ cursor: 'pointer' }}>
        <img className="header-logo" src={college.logo} alt={`${college.name} logo`} />
        <div className="header-title-container">
          <span className="header-title">{college.name}</span>
          <span className="header-subtitle">Approved Professional Engineering Institution</span>
        </div>
      </div>

      {/* Right Side: Actions (No middle nav links since they are in the public sidebar!) */}
      <div className="header-actions">
        {/* Dark/Light mode toggle */}
        <button
          className="header-icon-button theme-toggle-btn"
          type="button"
          onClick={onThemeToggle}
          aria-label="Toggle dark and light mode"
        >
          {isDarkMode ? <Sun size={20} className="spin-icon" /> : <Moon size={20} className="pulse-icon" />}
        </button>

        {/* Three-dot menu */}
        <div className="header-menu-wrap" ref={menuRef}>
          <button
            className={`header-icon-button menu-trigger-btn ${menuOpen ? 'active' : ''}`}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open login options menu"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <MoreHorizontal size={22} />
          </button>

          {/* Login Dropdown Popup */}
          <div
            className={`header-login-menu ${menuOpen ? 'open' : ''}`}
            role="menu"
            aria-label="Portal Logins"
          >
            <div className="menu-header">
              <h3>Secure Portals</h3>
              <p>Select your dashboard to proceed</p>
            </div>
            
            <div className="menu-options-container">
              {/* Option 1: Student Login */}
              <button
                type="button"
                className="login-menu-card"
                role="menuitem"
                onClick={() => selectLogin('student')}
              >
                <div className="login-option-icon student-icon">
                  <GraduationCap size={22} />
                </div>
                <div className="login-card-details">
                  <span className="card-title">Student Login</span>
                  <span className="card-desc">Access grades, attendance & reports</span>
                </div>
                <ChevronRight size={18} className="arrow-indicator" />
              </button>

              {/* Option 2: Staff Login */}
              <button
                type="button"
                className="login-menu-card"
                role="menuitem"
                onClick={() => selectLogin('staff')}
              >
                <div className="login-option-icon staff-icon">
                  <UserCog size={22} />
                </div>
                <div className="login-card-details">
                  <span className="card-title">Staff Login</span>
                  <span className="card-desc">Manage marks, attendance & schedule</span>
                </div>
                <ChevronRight size={18} className="arrow-indicator" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}