import React from 'react';
import { Squircle } from '@squircle-js/react';
import './PageTemplate.css';

const Pages = () => {
  return (
    <div className="page-template">
      <div className="page-header">
        <h1 className="page-title">Pages</h1>
        <p className="page-subtitle">Manage your website pages and content</p>
      </div>

      <Squircle
        cornerRadius={24}
        cornerSmoothing={1}
        className="content-card"
      >
        <div className="card-content">
          <p className="placeholder-text">Page management interface will appear here</p>
        </div>
      </Squircle>
    </div>
  );
};

export default Pages;

