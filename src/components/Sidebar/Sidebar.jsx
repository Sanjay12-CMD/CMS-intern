import React from 'react';
import { 
  Home, 
  Info, 
  Image as ImageIcon, 
  GraduationCap, 
  Users, 
  Phone,
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import logo from '../../assets/logo/kamp-logo.png';
import './Sidebar.css';

export default function Sidebar({
  activeTab,
  onNavigate,
  isOpen,
  onClose,
  isLoggedIn,
  currentUser
}) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, requiresAuth: false },
    { id: 'about', label: 'About', icon: Info, requiresAuth: false },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, requiresAuth: false },
    { 
      id: 'student-dashboard', 
      label: 'Student Dashboard', 
      icon: GraduationCap, 
      requiresAuth: true,
      role: 'student'
    },
    { 
      id: 'staff-dashboard', 
      label: 'Staff Dashboard', 
      icon: Users, 
      requiresAuth: true,
      role: 'staff'
    },
    { id: 'contact', label: 'Contact', icon: Phone, requiresAuth: false }
  ];

  const handleItemClick = (itemId, requiresAuth, itemRole) => {
    // If it's a mobile screen, close the drawer
    if (isOpen) {
      onClose();
    }
    
    // Normal navigation
    onNavigate(itemId);
  };

  const isUserStudent = currentUser && !currentUser.username.includes('@');
  const isUserStaff = currentUser && currentUser.username.includes('@');

  return (
    <>
      {/* Mobile Overlay backdrop when drawer is open */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar-aside ${isOpen ? 'sidebar-mobile-open' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="KAMP Logo" className="sidebar-logo" />
          <div className="sidebar-brand-info">
            <span className="sidebar-title">KAMP COLLEGE</span>
            <span className="sidebar-subtitle">Portal Navigation</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            // Check auth status for indicators
            let isLocked = false;
            if (item.requiresAuth) {
              if (!isLoggedIn) {
                isLocked = true;
              } else if (item.role === 'student' && !isUserStudent) {
                isLocked = true;
              } else if (item.role === 'staff' && !isUserStaff) {
                isLocked = true;
              }
            }

            return (
              <button
                key={item.id}
                type="button"
                className={`sidebar-link ${isActive ? 'active' : ''} ${isLocked ? 'locked-link' : ''}`}
                onClick={() => handleItemClick(item.id, item.requiresAuth, item.role)}
                title={item.label}
              >
                <div className="sidebar-link-icon-wrapper">
                  <Icon size={20} className="sidebar-link-icon" />
                </div>
                <span className="sidebar-link-label">{item.label}</span>
                {item.requiresAuth && (
                  <span className="lock-indicator" title={isLocked ? 'Requires appropriate login' : 'Unlocked'}>
                    {isLocked ? <Lock size={12} /> : <Unlock size={12} className="unlocked" />}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-footer-text">© 2026 KAMP CET</p>
        </div>
      </aside>
    </>
  );
}
