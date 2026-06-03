import { useState, useEffect, useRef } from 'react';
import './login.css';
import { validateLogin } from './login.js';
import {
  GraduationCap,
  LockKeyhole,
  UserRound,
  MoreVertical,
  LogOut,
  Mail,
  CheckCircle2,
  Home,
  Info,
  Image,
  MessageCircle,
} from 'lucide-react';
import HomeComponent from '../components/Home/Home';
import AboutComponent from '../components/About/About';
import GalleryComponent from '../components/Gallery/Gallery';
import ContactComponent from '../components/Contact/Contact';

/* ─────────────────────────────────────────────────────────────────
   UNIFIED LOGIN CARD
   ───────────────────────────────────────────────────────────────── */
function LoginCard({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateLogin({ username, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(username);
        setSuccess(false);
      }, 500);
    }
  };

  return (
    <div className="login-card-container">
      <div className="login-card-header-inner">
        <h2 className="login-card-title">Login</h2>
        <p className="login-card-subtitle">Enter your roll number or email ID and password to access the portal</p>
      </div>

      {success && (
        <div className="auth-success-banner">
          <CheckCircle2 size={18} />
          <span>Authentication successful! Accessing Dashboard...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Roll Number / Email ID</label>
          <div className={`input-icon-wrapper ${errors.username ? 'input-error' : ''}`}>
            <UserRound className="input-icon" size={18} />
            <input
              type="text"
              id="username"
              placeholder="e.g. 22CS001 or staff@kampcollege.edu"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className={`input-icon-wrapper ${errors.password ? 'input-error' : ''}`}>
            <LockKeyhole className="input-icon" size={18} />
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-login student-theme-btn">
          <span>Login</span>
        </button>
      </form>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DASHBOARD HEADER — LAVENDER PURPLE
   ───────────────────────────────────────────────────────────────── */
function DashboardHeader({ onNavigateTo, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownItemClick = (action) => {
    setDropdownOpen(false);
    if (action === 'logout') onLogout();
    else if (action === 'student-login' || action === 'staff-login') onNavigateTo('login');
  };

  return (
    <header className="dashboard-header-bar">
      <div className="header-left">
        <img src="/kamp-logo.png" alt="KAMP Logo" className="header-college-logo" />
        <div className="header-title-wrapper">
          <h1 className="header-college-name">KAMP COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
        </div>
      </div>

      <div className="header-right" ref={dropdownRef}>
        <button
          type="button"
          className={`three-dots-btn ${dropdownOpen ? 'active' : ''}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <MoreVertical size={20} />
        </button>

        {dropdownOpen && (
          <ul className="dropdown-menu-list">
            <li>
              <button type="button" onClick={() => handleDropdownItemClick('student-login')}>
                <GraduationCap size={16} />
                <span>Student Login</span>
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleDropdownItemClick('staff-login')}>
                <Mail size={16} />
                <span>Staff Login</span>
              </button>
            </li>
            <li className="dropdown-divider"></li>
            <li>
              <button type="button" onClick={() => handleDropdownItemClick('logout')} className="logout-item">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SIDEBAR — DARK VIOLET THEMED (Navigation Menu)
   ───────────────────────────────────────────────────────────────── */
function DashboardSidebar({ currentPage, onPageChange }) {
  return (
    <aside className="dashboard-sidebar-panel">
      <div className="sidebar-college-brand">
        <img src="/kamp-logo.png" alt="KAMP Logo" className="sidebar-college-logo" />
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">KAMP COLLEGE</span>
          <span className="sidebar-brand-sub">Portal</span>
        </div>
      </div>

      <nav className="sidebar-menu-nav">
        <button
          type="button"
          className={`sidebar-menu-btn ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => onPageChange('home')}
        >
          <Home size={18} />
          <span>Home</span>
        </button>
        <button
          type="button"
          className={`sidebar-menu-btn ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => onPageChange('about')}
        >
          <Info size={18} />
          <span>About</span>
        </button>
        <button
          type="button"
          className={`sidebar-menu-btn ${currentPage === 'gallery' ? 'active' : ''}`}
          onClick={() => onPageChange('gallery')}
        >
          <Image size={18} />
          <span>Gallery</span>
        </button>
        <button
          type="button"
          className={`sidebar-menu-btn ${currentPage === 'contact' ? 'active' : ''}`}
          onClick={() => onPageChange('contact')}
        >
          <MessageCircle size={18} />
          <span>Contact</span>
        </button>
      </nav>
    </aside>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN PORTAL CONTROLLER
   ───────────────────────────────────────────────────────────────── */
export default function StudentLoginDashboardApp() {
  const [currentView, setCurrentView] = useState('login');
  const [currentPage, setCurrentPage] = useState('home');

  const handleLoginSuccess = (username) => {
    // If input contains '@' → treat as Email ID → open Staff Dashboard
    // If input does not contain '@' → treat as Roll Number → open Student Dashboard
    const isEmail = username.includes('@');
    setCurrentView(isEmail ? 'staff-dashboard' : 'student-dashboard');
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentView('login');
    setCurrentPage('home');
  };

  const handleNavigateTo = (view) => {
    setCurrentView(view);
    setCurrentPage('home');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomeComponent />;
      case 'about':
        return <AboutComponent />;
      case 'gallery':
        return <GalleryComponent />;
      case 'contact':
        return <ContactComponent />;
      default:
        return <HomeComponent />;
    }
  };

  const isDashboard =
    currentView === 'student-dashboard' || currentView === 'staff-dashboard';

  if (isDashboard) {
    return (
      <div className="dashboard-layout-root">
        <DashboardHeader onNavigateTo={handleNavigateTo} onLogout={handleLogout} />

        <div className="dashboard-body-container">
          <DashboardSidebar currentPage={currentPage} onPageChange={handlePageChange} />

          <main className="dashboard-main-content">
            {renderPageContent()}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page-wrapper">
      {/* Subtle grid pattern overlay */}
      <div className="login-bg-pattern" />

      <div className="login-top-brand">
        <img src="/kamp-logo.png" alt="KAMP Logo" className="brand-logo" />
        <h1 className="brand-title">KAMP COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
      </div>

      <main className="login-card-wrapper-centered">
        <LoginCard onLoginSuccess={handleLoginSuccess} />
      </main>
    </div>
  );
}
