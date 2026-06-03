import React, { useEffect, useRef } from 'react';
import { LogIn, LogOut, User, ShieldAlert, GraduationCap, LayoutDashboard } from 'lucide-react';
import './DropdownMenu.css';

export default function DropdownMenu({
  isOpen,
  onClose,
  isLoggedIn,
  currentUser,
  onLoginClick,
  onLogoutClick,
  onNavigate,
  activeTab
}) {
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isStudent = currentUser && !currentUser.username.includes('@');

  return (
    <div className="dropdown-menu-container" ref={menuRef}>
      {isLoggedIn && currentUser && (
        <div className="dropdown-user-info">
          <div className="user-avatar">
            {isStudent ? <GraduationCap size={18} /> : <User size={18} />}
          </div>
          <div className="user-details">
            <span className="user-name">Welcome!</span>
            <span className="user-role">{currentUser.username}</span>
          </div>
        </div>
      )}
      
      <ul className="dropdown-options">
        {isLoggedIn ? (
          <>
            <li>
              <button 
                type="button" 
                onClick={() => {
                  onNavigate(isStudent ? 'student-dashboard' : 'staff-dashboard');
                  onClose();
                }}
                className={activeTab === 'student-dashboard' || activeTab === 'staff-dashboard' ? 'active-item' : ''}
              >
                <LayoutDashboard size={16} />
                <span>My Dashboard</span>
              </button>
            </li>
            <li className="dropdown-divider"></li>
            <li>
              <button 
                type="button" 
                onClick={() => {
                  onLogoutClick();
                  onClose();
                }} 
                className="logout-item"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </li>
          </>
        ) : (
          <li>
            <button 
              type="button" 
              onClick={() => {
                onLoginClick();
                onClose();
              }}
              className={activeTab === 'login' ? 'active-item' : ''}
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
