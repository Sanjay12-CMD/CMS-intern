import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Building2, 
  Briefcase, 
  HeartHandshake, 
  FlaskConical, 
  CheckCircle 
} from 'lucide-react';
import './About.css';

export default function About() {
  const values = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      description: "Our academic curricula are designed in alliance with current global technological trends, prioritizing foundational clarity, critical thinking, and hands-on capstone engineering projects."
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description: "Learn from top academic researchers, industry experts, and experienced professors dedicated to mentoring students and providing rigorous, supportive classroom instructions."
    },
    {
      icon: Building2,
      title: "Modern Infrastructure",
      description: "Our green campus features state-of-the-art classrooms, smart boards, high-speed campus-wide Wi-Fi, fully digitized libraries, and modern student housing."
    },
    {
      icon: Briefcase,
      title: "Placement Opportunities",
      description: "An active training and placement cell collaborating with global companies to organize internships, recruitment drives, and professional career coaching workshops."
    },
    {
      icon: HeartHandshake,
      title: "Student Development",
      description: "Beyond academics, we focus on student leadership, technical clubs, sports academies, cultural societies, and community outreach for holistic development."
    },
    {
      icon: FlaskConical,
      title: "Laboratories & Facilities",
      description: "World-class computing halls and experimental engineering labs equipped with modern tools, enabling hands-on testing, simulations, and experimental research."
    }
  ];

  return (
    <div className="about-container bg-orbs animate-fade-in">
      {/* Intro section */}
      <section className="about-intro-card glass-panel">
        <h2 className="about-title">About KAMP CET</h2>
        <p className="about-subtitle-text">
          KAMP College of Engineering and Technology is a premier institution established with the mission of providing top-tier technical education and cultivating innovators who can address the complex challenges of tomorrow. 
        </p>
        <div className="about-mission-vision">
          <div className="vision-box">
            <h4>Our Vision</h4>
            <p>To be a globally recognized center of excellence in engineering education and research, fostering future technical leaders who drive positive societal transformations.</p>
          </div>
          <div className="mission-box">
            <h4>Our Mission</h4>
            <p>To deliver student-centric educational experiences, build outstanding laboratory facilities, promote industrial collaborations, and nurture ethical values in young professionals.</p>
          </div>
        </div>
      </section>

      {/* Core values cards grid */}
      <section className="about-values-section">
        <h3 className="values-heading">Why Choose KAMP?</h3>
        <p className="values-subheading-text">Discover the pillars that build academic excellence and professional growth at our campus.</p>
        
        <div className="values-grid">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="value-card glass-panel glass-panel-hover">
                <div className="value-icon-wrapper">
                  <Icon size={24} />
                </div>
                <h4 className="value-title">{item.title}</h4>
                <p className="value-description">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campus achievements */}
      <section className="achievements-section glass-panel">
        <h3 className="section-title">Institutional Highlights</h3>
        <div className="achievements-list">
          <div className="achievement-item">
            <CheckCircle size={18} className="success-icon" />
            <span>Accredited with Grade 'A+' status by national engineering boards.</span>
          </div>
          <div className="achievement-item">
            <CheckCircle size={18} className="success-icon" />
            <span>Strong alumni network with members placed across Fortune 500 tech companies.</span>
          </div>
          <div className="achievement-item">
            <CheckCircle size={18} className="success-icon" />
            <span>Funding support for student start-ups through the KAMP Incubation Center.</span>
          </div>
          <div className="achievement-item">
            <CheckCircle size={18} className="success-icon" />
            <span>Vibrant student exchange and research projects with overseas universities.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
