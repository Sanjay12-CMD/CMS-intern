import React, { useState, useEffect } from 'react';
import { 
  Award, 
  BookOpen, 
  Users, 
  ArrowRight, 
  Quote,
  Sparkles,
  Compass
} from 'lucide-react';
import './Home.css';

export default function Home({ onNavigate, isLoggedIn }) {
  const quotes = [
    { text: "Education is the key to success.", author: "Albert Einstein" },
    { text: "Learning today leads to leadership tomorrow.", author: "Margaret Fuller" },
    { text: "Dream big and achieve bigger.", author: "A.P.J. Abdul Kalam" },
    { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Brian Herbert" }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: BookOpen, number: "15+", label: "Engineering Disciplines" },
    { icon: Users, number: "250+", label: "Experienced Faculty" },
    { icon: Award, number: "95%", label: "Placement Success Rate" },
    { icon: Compass, number: "20+", label: "Research Laboratories" }
  ];

  return (
    <div className="home-container bg-orbs">
      {/* Hero Banner Section */}
      <section className="hero-section glass-panel">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} className="badge-icon" />
            <span>Nurturing Excellence, Inspiring Innovation</span>
          </div>
          
          <h2 className="hero-title">
            Empowering Minds for a <span className="highlight-text">Brighter Tomorrow</span>
          </h2>
          
          <p className="hero-description">
            Welcome to KAMP College of Engineering and Technology. We offer a world-class academic environment, top-tier research labs, and state-of-the-art campus facilities to launch your technical career.
          </p>

          <div className="hero-buttons">
            <button 
              type="button" 
              className="btn-primary"
              onClick={() => onNavigate('about')}
            >
              <span>Explore Campus</span>
              <ArrowRight size={16} />
            </button>
            
            {!isLoggedIn && (
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => onNavigate('login')}
              >
                <span>Student & Staff Portal</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Inspirational Quote Section */}
      <section className="quote-section glass-panel">
        <div className="quote-icon-container">
          <Quote size={28} />
        </div>
        <div className="quote-carousel">
          {quotes.map((quote, idx) => (
            <div 
              key={idx} 
              className={`quote-item ${idx === currentQuoteIndex ? 'active' : 'inactive'}`}
            >
              <p className="quote-text">"{quote.text}"</p>
              <p className="quote-author">— {quote.author}</p>
            </div>
          ))}
        </div>
        <div className="quote-indicators">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`quote-dot ${idx === currentQuoteIndex ? 'active' : ''}`}
              onClick={() => setCurrentQuoteIndex(idx)}
              aria-label={`Go to quote ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card glass-panel glass-panel-hover">
              <div className="stat-icon-wrapper">
                <Icon size={24} />
              </div>
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          );
        })}
      </section>

      {/* Introduction Card Section */}
      <section className="intro-section glass-panel">
        <h3 className="section-title">About the College</h3>
        <p className="intro-text">
          Established with the vision of offering high-quality technical education, KAMP College of Engineering and Technology stands as a beacon of academic excellence in engineering, science, and computing. We strive to provide a holistic ecosystem combining core curricular knowledge, advanced laboratories, research opportunities, and vibrant campus life.
        </p>
        <p className="intro-text">
          Our active alliances with global tech corporations and research institutes enable students to engage in internships, real-world capstones, and modern mentorship programs, preparing them to be leaders of tomorrow.
        </p>
      </section>
    </div>
  );
}
