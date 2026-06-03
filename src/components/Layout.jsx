import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

export default function Layout() {
  const location = useLocation();

  // Determine the main-content class based on the current route
  const getMainContentClass = () => {
    const path = location.pathname;
    
    if (path === '/staff') {
      return 'main-content staff-directory-layout';
    } else if (path === '/staff/marks') {
      return 'main-content staff-marks-entry-layout';
    } else if (path === '/staff/attendance') {
      return 'main-content staff-attendance-layout';
    }
    
    return 'main-content';
  };

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className={getMainContentClass()}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
