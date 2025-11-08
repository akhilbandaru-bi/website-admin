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
  const [expandedSections, setExpandedSections] = useState(() => new Set());
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

  const menuSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: '/icons/dashboard.svg',
    },
    {
      id: 'pages',
      label: 'Pages',
      path: '/dashboard/pages',
      icon: '/icons/pages.svg',
      children: [
        { id: 'pages-services', label: 'Services', path: '/dashboard/services', icon: '/icons/services.svg' },
        { id: 'pages-verticals', label: 'Verticals', path: '/dashboard/verticals', icon: '/icons/verticals.svg' },
        { id: 'pages-products', label: 'Products', path: '/dashboard/products', icon: '/icons/pages.svg' },
        { id: 'pages-solutions', label: 'Solutions', path: '/dashboard/solutions', icon: '/icons/solutions.svg' },
      ],
    },
    {
      id: 'blogs',
      label: 'Blogs',
      path: '/dashboard/blogs',
      icon: '/icons/blogs.svg',
      children: [
        { id: 'blogs-series', label: 'Series', path: '/dashboard/blogs/series', icon: '/icons/blogs.svg' },
      ],
    },
    {
      id: 'case-studies',
      label: 'Case Studies',
      path: '/dashboard/case-studies',
      icon: '/icons/case-studies.svg',
      children: [
        { id: 'case-studies-submenus', label: 'Submenus', path: '/dashboard/case-studies/submenus', icon: '/icons/case-studies.svg' },
      ],
    },
    {
      id: 'marketing',
      label: 'Marketing',
      path: '/dashboard/marketing',
      icon: '/icons/leads.svg',
      children: [
        { id: 'marketing-leads', label: 'Leads', path: '/dashboard/leads', icon: '/icons/leads.svg' },
        { id: 'marketing-analytics', label: 'Analytics', path: '/dashboard/marketing/analytics', icon: '/icons/dashboard.svg' },
        { id: 'marketing-newsletters', label: 'News Letters', path: '/dashboard/marketing/newsletters', icon: '/icons/subscribed-users.svg' },
        { id: 'marketing-landing-pages', label: 'Landing Pages', path: '/dashboard/marketing/landing-pages', icon: '/icons/pages.svg' },
        { id: 'marketing-demos', label: "Demo's", path: '/dashboard/marketing/demos', icon: '/icons/solutions.svg' },
      ],
    },
  ];

  const handleMenuClick = (path) => {
    if (!path) return;
    navigate(path);
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const pathMatches = (path) => {
    if (!path) return false;
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const isSectionActive = (section) => {
    if (pathMatches(section.path)) return true;
    if (section.children) {
      return section.children.some((child) => pathMatches(child.path));
    }
    return false;
  };

  useEffect(() => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      menuSections.forEach((section) => {
        if (isSectionActive(section)) {
          next.add(section.id);
        }
      });
      return next;
    });
  }, [location.pathname]);

  const isSectionExpanded = (sectionId) => expandedSections.has(sectionId);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
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
            {menuSections.map((section) => {
              const sectionActive = isSectionActive(section);
              const hasChildren = Array.isArray(section.children) && section.children.length > 0;
              const sectionExpanded = hasChildren ? isSectionExpanded(section.id) : false;

              return (
                <div
                  className={`nav-section ${hasChildren ? 'has-children' : ''} ${
                    sectionActive ? 'active' : ''
                  } ${sectionExpanded ? 'expanded' : ''}`}
                  key={section.id}
                >
                  <button
                    className={`nav-item ${hasChildren ? 'has-children' : ''} ${
                      sectionActive ? 'active' : ''
                    }`}
                    type="button"
                    aria-expanded={hasChildren ? sectionExpanded : undefined}
                    onClick={() => handleMenuClick(section.path)}
                    title={section.label}
                  >
                    <span className="nav-item-icon" aria-hidden="true">
                      <img src={section.icon} alt="" />
                    </span>
                    <span className="nav-item-label">{section.label}</span>
                    {hasChildren && (
                      <span
                        className="nav-item-caret"
                        role="button"
                        tabIndex={0}
                        aria-label={sectionExpanded ? 'Collapse section' : 'Expand section'}
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleSection(section.id);
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            event.stopPropagation();
                            toggleSection(section.id);
                          }
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 3.5L10.5 8L5.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </button>

                  {hasChildren && (
                    <div className={`nav-subitems ${sectionActive ? 'active' : ''} ${sectionExpanded ? 'expanded' : ''}`}>
                      {section.children.map((child) => (
                        <button
                          type="button"
                          key={child.id}
                          className={`nav-subitem ${pathMatches(child.path) ? 'active' : ''}`}
                          onClick={() => handleMenuClick(child.path)}
                          title={child.label}
                        >
                          <span className="nav-subitem-icon" aria-hidden="true">
                            <img src={child.icon} alt="" />
                          </span>
                          <span className="nav-subitem-label">{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <button className="logout-button" onClick={handleLogout}>
              <span className="logout-button-icon" aria-hidden="true">
                <img src="/icons/logout.svg" alt="Logout" />
              </span>
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

