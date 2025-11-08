import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Squircle } from '@squircle-js/react';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const viewportIsMobile = useRef(null);
  const sidebarRef = useRef(null);
  const [squircleVersion, setSquircleVersion] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar on mobile by default
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;

      setIsMobile(mobile);

      if (viewportIsMobile.current === null || viewportIsMobile.current !== mobile) {
        setIsSidebarOpen(!mobile);
      }

      viewportIsMobile.current = mobile;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !sidebarRef.current || !('ResizeObserver' in window)) {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      setSquircleVersion((prev) => prev + 1);
    });

    observer.observe(sidebarRef.current);

    return () => observer.disconnect();
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '/icons/dashboard.svg' },
    { id: 'pages', label: 'Pages', path: '/dashboard/pages', icon: '/icons/web.svg' },
    { id: 'services', label: 'Services', path: '/dashboard/services', icon: '/icons/services.svg' },
    { id: 'solutions', label: 'Solutions', path: '/dashboard/solutions', icon: '/icons/solutions.svg' },
    { id: 'verticals', label: 'Verticals', path: '/dashboard/verticals', icon: '/icons/verticals.svg' },
    { id: 'blogs', label: 'Blogs', path: '/dashboard/blogs', icon: '/icons/blogs.svg' },
    { id: 'case-studies', label: 'Case Studies', path: '/dashboard/case-studies', icon: '/icons/case-studies.svg' },
    { id: 'leads', label: 'Leads', path: '/dashboard/leads', icon: '/icons/leads.svg' },
    { id: 'subscribed-users', label: 'Subscribed Users', path: '/dashboard/subscribed-users', icon: '/icons/subscribed-users.svg' },
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
      <aside
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
      >
        <Squircle
          key={squircleVersion}
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
              <img
                src="/icons/menu-toggle.svg"
                alt="Toggle menu"
                className="sidebar-toggle-icon"
              />
            </button>
          </div>
          
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.path)}
                title={item.label}
              >
                <span className="nav-item-icon" aria-hidden="true">
                  <img src={item.icon} alt="" />
                </span>
                <span className="nav-item-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>
              <img src="/icons/logout.svg" alt="Logout" />
              <span className="logout-button-text">Logout</span>
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
            <img
              src="/icons/mobile-menu.svg"
              alt="Toggle menu"
              className="mobile-menu-icon"
            />
          </button>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

