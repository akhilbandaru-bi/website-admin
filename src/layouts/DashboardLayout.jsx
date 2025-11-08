import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Squircle } from '@squircle-js/react';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'pages', label: 'Pages', path: '/dashboard/pages' },
    { id: 'services', label: 'Services', path: '/dashboard/services' },
    { id: 'solutions', label: 'Solutions', path: '/dashboard/solutions' },
    { id: 'verticals', label: 'Verticals', path: '/dashboard/verticals' },
    { id: 'blogs', label: 'Blogs', path: '/dashboard/blogs' },
    { id: 'case-studies', label: 'Case Studies', path: '/dashboard/case-studies' },
    { id: 'leads', label: 'Leads', path: '/dashboard/leads' },
    { id: 'subscribed-users', label: 'Subscribed Users', path: '/dashboard/subscribed-users' },
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      {isSidebarOpen && isMobile && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <Squircle
          cornerRadius={24}
          cornerSmoothing={1}
          className="sidebar-container"
        >
          <div className="sidebar-header">
            <h2 className="sidebar-logo">CMS Admin</h2>
            <button
              className="sidebar-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <img src="/icons/menu-toggle.svg" alt="Toggle menu" />
            </button>
          </div>
          
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.path)}
              >
                <span className="nav-item-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>
              <span>Logout</span>
            </button>
          </div>
        </Squircle>
      </aside>

      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="content-wrapper">
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle menu"
          >
            <img src="/icons/mobile-menu.svg" alt="Toggle menu" />
          </button>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

