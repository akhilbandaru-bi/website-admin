import React from 'react';
import { Squircle } from '@squircle-js/react';
import './PageTemplate.css';

const CaseStudies = () => {
  return (
    <div className="page-template">
      <div className="page-header">
        <h1 className="page-title">Case Studies</h1>
        <p className="page-subtitle">Manage your case studies and success stories</p>
      </div>

      <Squircle
        cornerRadius={24}
        cornerSmoothing={1}
        className="content-card"
      >
        <div className="card-content">
          <p className="placeholder-text">Case studies management interface will appear here</p>
        </div>
      </Squircle>
    </div>
  );
};

export default CaseStudies;

