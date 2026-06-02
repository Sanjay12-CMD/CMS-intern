import React, { useState } from 'react';
import './sidebar.css';

// Reusable menu data array with standard custom SVG icons for high-quality aesthetics
const MENU_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    // SVG Home Icon
    icon: (
      <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: 'departments',
    label: 'Departments',
    // SVG Grid Icon for Departments
    icon: (
      <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )
  },
  {
    id: 'about',
    label: 'About',
    // SVG Graduation Cap Icon
    icon: (
      <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    )
  },
  {
    id: 'gallery',
    label: 'Gallery',
    // SVG Gallery/Image Icon
    icon: (
      <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    )
  },
  {
    id: 'contact',
    label: 'Contact Details',
    // SVG Contact/Envelope/Phone Icon
    icon: (
      <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    )
  }
];

export default function Sidebar({ activeTab, setActiveTab }) {
  // Use state if not passed from parent, else default to 'home'
  const [localActive, setLocalActive] = useState('home');
  
  const currentActive = activeTab || localActive;
  const handleSelect = (id) => {
    if (setActiveTab) {
      setActiveTab(id);
    } else {
      setLocalActive(id);
    }
  };

  return (
    <aside className="sidebar">
      {/* College Logo / Brand Section at the top */}
      <div className="logo-container">
        <div className="logo-shield">
          <svg viewBox="0 0 100 100" className="shield-svg">
            <defs>
              <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#143D7A" />
                <stop offset="100%" stopColor="#8E6BBE" />
              </linearGradient>
            </defs>
            {/* Elegant shield outline */}
            <path 
              d="M50,10 C75,10 85,25 85,55 C85,80 50,92 50,92 C50,92 15,80 15,55 C15,25 25,10 50,10 Z" 
              fill="url(#shield-grad)" 
              stroke="#FFF" 
              strokeWidth="3"
            />
            {/* Letter K */}
            <text x="50" y="65" textAnchor="middle" fill="#FFF" className="shield-text">K</text>
          </svg>
        </div>
        <div className="logo-text">
          <span className="logo-brand">KAMP</span>
          <span className="logo-sub">COLLEGE</span>
        </div>
      </div>

      {/* Navigation menu list */}
      <nav className="sidebar-nav">
        {MENU_ITEMS.map((item) => {
          const isActive = currentActive === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`sidebar-btn ${isActive ? 'active' : ''}`}
              aria-label={item.label}
            >
              <div className="btn-icon-wrapper">
                {item.icon}
              </div>
              <span className="btn-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Subtle bottom design element */}
      <div className="sidebar-footer">
        <div className="dot-indicator"></div>
        <span className="footer-tag">ESTD. 2026</span>
      </div>
    </aside>
  );
}
