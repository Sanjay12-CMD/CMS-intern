import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
import logo from '../assets/clg logo.jpeg';

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  ),
  staff: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M16 9c2.5 0 4.5-2 4.5-4.5S18.5 0 16 0s-4.5 2-4.5 4.5S13.5 9 16 9zm-8 3c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm8 2c-2.33 0-7 1.17-7 3.5V20h14v-2.5c0-2.33-4.67-3.5-7-3.5zm-8 3c-1.2 0-3.71.6-4.79 1.48C4.54 18.23 6.13 19 8 19c.92 0 1.9-.17 2.76-.48-.68-.61-1.84-1.52-2.76-1.52z" />
    </svg>
  )
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setCollapsed(!collapsed);
  const staffOpen = location.pathname.startsWith('/staff');

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <img src={logo} alt="College Logo" className="logo" />
        {!collapsed && <span className="college-name">KAMP College</span>}
        <button className="collapse-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          {collapsed ? '›' : '‹'}
        </button>
      </div>
      <nav className="menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="icon">{icons.dashboard}</span>
          {!collapsed && <span className="title">Dashboard</span>}
        </NavLink>

        <div className={`menu-group ${staffOpen ? 'open' : ''}`}>
          <NavLink
            to="/staff"
            className={() => `menu-item ${staffOpen ? 'active' : ''}`}
          >
            <span className="icon">{icons.staff}</span>
            {!collapsed && (
              <>
                <span className="title">Staff</span>
                <span className="submenu-arrow">⌄</span>
              </>
            )}
          </NavLink>

          {!collapsed && (
            <div className="submenu">
              <NavLink
                to="/staff"
                end
                className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}
              >
                <span>▦</span>
                Staff Directory
              </NavLink>
              <NavLink
                to="/staff/marks"
                className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}
              >
                <span>📊</span>
                Student Marks Entry
              </NavLink>
              <NavLink
                to="/staff/attendance"
                className={({ isActive }) => `submenu-item ${isActive ? 'active' : ''}`}
              >
                <span>📅</span>
                Student Attendance Update
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
