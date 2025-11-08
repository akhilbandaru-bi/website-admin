import React from 'react';
import { Squircle } from '@squircle-js/react';
import './PageTemplate1.css';

const Leads = () => {
  return (
    <div className="page-template">
      <div className="page-header">
        <h1 className="page-title">Leads</h1>
        <p className="page-subtitle">View and manage your leads</p>
      </div>

      <Squircle
        cornerRadius={24}
        cornerSmoothing={1}
        className="content-card"
      >
        <div className="card-content">
          <p className="placeholder-text">Leads management interface will appear here</p>
        </div>
      </Squircle>
    </div>
  );
};

export default Leads;

