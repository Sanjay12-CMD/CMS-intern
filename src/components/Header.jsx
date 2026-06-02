import { useState, useEffect } from 'react';
import './Header.css';

export default function Header() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <header className="top-header">
      <div className="header-right">
        <label className="theme-toggle">
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} aria-label="Toggle Theme" />
          <span className="slider">
            <span className="sun-icon">☀️</span>
            <span className="moon-icon">🌙</span>
          </span>
        </label>
        <button className="logout-btn-icon" onClick={handleLogout} aria-label="Logout">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
            <path d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3H4c-1.1 0-2 .9-2 2v4h2V5h16v14H4v-4H2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
    </header>
  );
}
