import React from 'react';
import { Squircle } from '@squircle-js/react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './PageTemplate1.css';

const CaseStudies = () => {
  const navigate = useNavigate();

  const handleCreateCaseStudy = () => {
    navigate('/dashboard/case-studies/create');
  };

  return (
    <div className="page-template">
      <div className="page-header blog-header">
        <div className="page-header-info">
          <h1 className="page-title">Case Studies</h1>
          <p className="page-subtitle">Manage your case studies and success stories</p>
        </div>
        <Button className="page-header-action" onClick={handleCreateCaseStudy}>
          Create New Case Study
        </Button>
      </div>

      <Squircle cornerRadius={24} cornerSmoothing={1} className="content-card">
        <div className="card-content">
          <p className="placeholder-text">Case studies management interface will appear here.</p>
        </div>
      </Squircle>
    </div>
  );
};

export default CaseStudies;