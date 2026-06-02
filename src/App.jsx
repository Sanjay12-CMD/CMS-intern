import React, { useState } from 'react';
import Sidebar from './main/sidebar.jsx';
import Header from './main/header.jsx';
import Department from './department/departemt.jsx';
import heroImg from './assets/hero.png';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-container">
      {/* Sidebar Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Header Component */}
        <Header />

        {/* Home Landing Page / Hero Section */}
        <main className="content-body">
          {activeTab === 'home' ? (
            <section className="hero-section">
              <div className="hero-grid">
                
                {/* Left Side Content */}
                <div className="hero-left">
                  <div className="tagline-container">
                    <span className="hero-tagline">"INSPIRING FUTURES WITH PURPOSE"</span>
                  </div>
                  
                  <h1 className="hero-main-title">
                    <span className="title-word title-kamp">KAMP</span>
                    <span className="title-word">COLLEGE OF</span>
                    <span className="title-word">ENGINEERING</span>
                    <span className="title-word">AND</span>
                    <span className="title-word">TECHNOLOGY</span>
                  </h1>

                  <p className="hero-description">
                    Empowering the next generation of engineers, builders, and innovators with state-of-the-art labs, top-tier faculty, and outstanding placement opportunities.
                  </p>

                  <div className="hero-actions">
                    <button className="btn-primary" onClick={() => setActiveTab('about')}>
                      Explore Programs
                      <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                    <button className="btn-secondary" onClick={() => setActiveTab('contact')}>
                      Contact Admissions
                    </button>
                  </div>
                </div>

                {/* Right Side Student Image Card & Overlays */}
                <div className="hero-right">
                  <div className="student-card-container">
                    
                    {/* The main rounded rectangle student card */}
                    <div className="student-image-card">
                      <img 
                        src={heroImg} 
                        className="student-image" 
                        alt="KAMP College Student" 
                        loading="eager"
                      />
                      <div className="card-ambient-glow"></div>
                    </div>

                    {/* Placement Success Card Overlay - 95+ Placement Success */}
                    <div className="overlay-card placement-success-card">
                      <div className="overlay-badge">
                        <span className="badge-icon">🎯</span>
                      </div>
                      <div className="overlay-stats">
                        <h3 className="stats-number">95+</h3>
                        <p className="stats-label">Placement Success</p>
                      </div>
                    </div>

                    {/* Additional floating statistics card - 40+ */}
                    <div className="overlay-card floating-stats-card">
                      <div className="overlay-badge">
                        <span className="badge-icon">🏢</span>
                      </div>
                      <div className="overlay-stats">
                        <h3 className="stats-number">40+</h3>
                        <p className="stats-label">Global Partners</p>
                      </div>
                    </div>
                    
                  </div>
                </div>

              </div>
            </section>
          ) : activeTab === 'departments' ? (
            <Department />
          ) : (
            // Fallback content for other tabs to keep the UI fully functional
            <section className="info-tab-section">
              <div className="info-card">
                <h2 className="info-title">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
                </h2>
                <p className="info-desc">
                  This section displays information related to the "{activeTab}" menu item of KAMP College of Engineering and Technology.
                </p>
                <button className="btn-primary" onClick={() => setActiveTab('home')}>
                  Return to Home
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
