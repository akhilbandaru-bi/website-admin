import React from 'react';
import { Squircle } from '@squircle-js/react';
import './Dashboard1.module.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome to your CMS admin panel</p>
      </div>

      <div className="dashboard-grid">
        <Squircle
          cornerRadius={24}
          cornerSmoothing={1}
          className="dashboard-card"
        >
          <div className="card-content">
            <h3 className="card-title">Overview</h3>
            <p className="card-description">
              Manage your website content, track metrics, and monitor user activity from this central dashboard.
            </p>
          </div>
        </Squircle>

        <Squircle
          cornerRadius={24}
          cornerSmoothing={1}
          className="dashboard-card"
        >
          <div className="card-content">
            <h3 className="card-title">Quick Actions</h3>
            <div className="quick-actions">
              <p className="placeholder-text">Quick action buttons will appear here</p>
            </div>
          </div>
        </Squircle>

        <Squircle
          cornerRadius={24}
          cornerSmoothing={1}
          className="dashboard-card"
        >
          <div className="card-content">
            <h3 className="card-title">Recent Activity</h3>
            <div className="activity-list">
              <p className="placeholder-text">Recent activity feed will appear here</p>
            </div>
          </div>
        </Squircle>

        <Squircle
          cornerRadius={24}
          cornerSmoothing={1}
          className="dashboard-card"
        >
          <div className="card-content">
            <h3 className="card-title">Statistics</h3>
            <div className="stats-grid">
              <p className="placeholder-text">Statistics and metrics will appear here</p>
            </div>
          </div>
        </Squircle>
      </div>
    </div>
  );
};

export default Dashboard;

