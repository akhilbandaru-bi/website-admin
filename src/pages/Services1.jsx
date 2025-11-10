import React from 'react';
import { Squircle } from '@squircle-js/react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './PageTemplate1.css';

const Services = () => {
  const navigate = useNavigate();

  const handleCreateService = () => {
    navigate('/dashboard/services/create');
  };

  return (
    <div className="page-template">
      <div className="page-header blog-header">
        <div className="page-header-info">
          <h1 className="page-title">Services</h1>
          <p className="page-subtitle">Manage your services and offerings</p>
        </div>
        <Button className="page-header-action" onClick={handleCreateService}>
          Create New Service
        </Button>
      </div>

      <Squircle cornerRadius={24} cornerSmoothing={1} className="content-card">
        <div className="card-content">
          <p className="placeholder-text">Services management interface will appear here.</p>
        </div>
      </Squircle>
    </div>
  );
};

export default Services;