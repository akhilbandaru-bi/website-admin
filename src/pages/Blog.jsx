import React from 'react';
import { Squircle } from '@squircle-js/react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './PageTemplate1.css';

const Blogs = () => {
  const navigate = useNavigate();

  const handleCreateBlog = () => {
    navigate('/dashboard/blogs/create');
  };

  return (
    <div className="page-template">
      <div className="page-header blog-header">
        <div className="page-header-info">
          <h1 className="page-title">Blogs</h1>
          <p className="page-subtitle">Manage your blog posts and articles</p>
        </div>
        <Button className="page-header-action" onClick={handleCreateBlog}>
          Create New Blog
        </Button>
      </div>

      <Squircle
        cornerRadius={24}
        cornerSmoothing={1}
        className="content-card"
      >
        <div className="card-content">
          <p className="placeholder-text">Blog management interface will appear here</p>
        </div>
      </Squircle>
    </div>
  );
};

export default Blogs;