import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.email) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message) newErrors.message = "Please enter your message";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form simulation
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Auto clear success banner
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-container bg-orbs animate-fade-in">
      <div className="contact-header">
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">Have questions or want to learn more about KAMP College? Reach out to us below.</p>
      </div>

      <div className="contact-layout">
        {/* Left Side: Contact Information Cards */}
        <div className="contact-info-panel">
          <div className="contact-info-card glass-panel glass-panel-hover">
            <div className="contact-icon-box">
              <Phone size={22} />
            </div>
            <div className="contact-info-details">
              <h4>Contact Number</h4>
              <p className="contact-text">+91 XXXXX XXXXX</p>
              <p className="contact-subtext">Mon-Fri from 9am to 5pm</p>
            </div>
          </div>

          <div className="contact-info-card glass-panel glass-panel-hover">
            <div className="contact-icon-box">
              <Mail size={22} />
            </div>
            <div className="contact-info-details">
              <h4>Email Address</h4>
              <p className="contact-text">
                <a href="mailto:info@kampcollege.edu">info@kampcollege.edu</a>
              </p>
              <p className="contact-subtext">We respond within 24 hours</p>
            </div>
          </div>

          <div className="contact-info-card glass-panel glass-panel-hover">
            <div className="contact-icon-box">
              <MapPin size={22} />
            </div>
            <div className="contact-info-details">
              <h4>College Location</h4>
              <p className="contact-text">KAMP College of Engineering and Technology</p>
              <p className="contact-subtext">Tamil Nadu, India</p>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="contact-form-panel glass-panel">
          <h3 className="form-heading">Send a Message</h3>
          
          {submitSuccess && (
            <div className="submit-success-banner">
              <CheckCircle2 size={18} />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="contact-form">
            <div className="form-row">
              <div className="contact-form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className={errors.name ? 'input-err' : ''}
                />
                {errors.name && <span className="field-err-msg">{errors.name}</span>}
              </div>

              <div className="contact-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. john@example.com"
                  className={errors.email ? 'input-err' : ''}
                />
                {errors.email && <span className="field-err-msg">{errors.email}</span>}
              </div>
            </div>

            <div className="contact-form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="e.g. Admission Inquiry"
              />
            </div>

            <div className="contact-form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type your message here..."
                rows="5"
                className={errors.message ? 'input-err' : ''}
              />
              {errors.message && <span className="field-err-msg">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className="btn-primary btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
