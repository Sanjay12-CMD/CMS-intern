import React from 'react';
import './header.css';

export default function Header() {
  return (
    <header className="college-header">
      <div className="header-content">
        <span className="welcome-tag">WELCOME TO</span>
        <h1 className="college-title">
          KAMP COLLEGE OF ENGINEERING AND TECHNOLOGY
        </h1>
      </div>
      <div className="header-decor-line"></div>
    </header>
  );
}
