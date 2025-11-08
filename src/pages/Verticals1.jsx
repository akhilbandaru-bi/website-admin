import React from 'react';
import { Squircle } from '@squircle-js/react';
import './PageTemplate1.css';

const Verticals = () => {
  return (
    <div className="page-template">
      <div className="page-header">
        <h1 className="page-title">Verticals</h1>
        <p className="page-subtitle">Manage your industry verticals</p>
      </div>

      <Squircle
        cornerRadius={24}
        cornerSmoothing={1}
        className="content-card"
      >
        <div className="card-content">
          <p className="placeholder-text">Verticals management interface will appear here</p>
        </div>
      </Squircle>
    </div>
  );
};

export default Verticals;

