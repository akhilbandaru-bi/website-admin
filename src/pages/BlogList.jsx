import React, { useState } from 'react';
import { Squircle } from '@squircle-js/react';
import Table from '../components/ui/Table';
import './PageTemplate1.css';
import './BlogList.css';

const BLOG_POSTS = [
  {
    id: 'post-1',
    title: 'Bedtime Breathwork',
    duration: '09:46',
    author: 'Adriene Mishler',
    authorAvatar: 'https://i.pravatar.cc/48?img=5',
    publishedOn: 'Feb 26, 2024',
    status: 'private',
    statusLabel: 'Private',
    thumbnail: 'https://images.unsplash.com/photo-1557434440-6ad85dd0d4d0?auto=format&fit=crop&w=160&h=100&q=60',
  },
  {
    id: 'post-2',
    title: 'Rewiring The Upper Body',
    duration: '15:43',
    author: 'Joshua Jones',
    authorAvatar: 'https://i.pravatar.cc/48?img=12',
    publishedOn: 'Feb 22, 2024',
    status: 'public',
    statusLabel: 'Published',
    thumbnail: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=160&h=100&q=60',
  },
  {
    id: 'post-3',
    title: 'Alia Everyday Yin',
    duration: '21:52',
    author: 'Alia Sanders',
    authorAvatar: 'https://i.pravatar.cc/48?img=47',
    publishedOn: 'Feb 22, 2024',
    status: 'private',
    statusLabel: 'Private',
    thumbnail: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=160&h=100&q=60',
  },
  {
    id: 'post-4',
    title: 'Union Practice',
    duration: '15:34',
    author: 'Jenn Wooten',
    authorAvatar: 'https://i.pravatar.cc/48?img=19',
    publishedOn: 'Feb 18, 2024',
    status: 'public',
    statusLabel: 'Published',
    thumbnail: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=160&h=100&q=60',
  },
  {
    id: 'post-5',
    title: 'Yoga For Desk Jobs',
    duration: '07:48',
    author: 'Bradley Lawlor',
    authorAvatar: 'https://i.pravatar.cc/48?img=33',
    publishedOn: 'Feb 14, 2024',
    status: 'draft',
    statusLabel: 'Draft',
    thumbnail: 'https://images.unsplash.com/photo-1546484959-fcc74af59f9c?auto=format&fit=crop&w=160&h=100&q=60',
  },
  {
    id: 'post-6',
    title: 'Pilates: Healthy Spine',
    duration: '06:15',
    author: 'Katie Sims',
    authorAvatar: 'https://i.pravatar.cc/48?img=28',
    publishedOn: 'Feb 12, 2024',
    status: 'public',
    statusLabel: 'Published',
    thumbnail: 'https://images.unsplash.com/photo-1530825894095-9c184b068fcb?auto=format&fit=crop&w=160&h=100&q=60',
  },
  {
    id: 'post-7',
    title: 'Breathing Room Core & Hips',
    duration: '09:40',
    author: 'Adriene Mishler',
    authorAvatar: 'https://i.pravatar.cc/48?img=5',
    publishedOn: 'Feb 11, 2024',
    status: 'private',
    statusLabel: 'Private',
    thumbnail: 'https://images.unsplash.com/photo-1517348560651-125b0fc3da87?auto=format&fit=crop&w=160&h=100&q=60',
  },
];

const BlogList = () => {
  const [selectedIds, setSelectedIds] = useState(new Set());

  const handleSelectionChange = (selected) => {
    setSelectedIds(new Set(selected));
  };

  const handleEdit = (item) => {
    console.log('Edit item:', item);
    // Implement edit functionality here
  };

  const handleDelete = (item) => {
    console.log('Delete item:', item);
    // Implement delete functionality here
  };

  const columns = [
    {
      key: 'thumbnail',
      title: '',
      width: '80px',
      render: (value, item) => (
        <div className="blog-thumbnail" aria-hidden="true">
          <img src={item.thumbnail} alt="" />
        </div>
      )
    },
    {
      key: 'info',
      title: 'Title',
      render: (value, item) => (
        <div className="blog-info">
          <h3 className="blog-title">{item.title}</h3>
          <span className="blog-duration">{item.duration}</span>
        </div>
      )
    },
    {
      key: 'author',
      title: 'Author',
      render: (value, item) => (
        <div className="blog-author">
          <img src={item.authorAvatar} alt="" className="author-avatar" />
          <span className="author-name">{item.author}</span>
        </div>
      )
    },
    {
      key: 'publishedOn',
      title: 'Date',
      className: 'blog-date'
    },
    {
      key: 'status',
      title: 'Status',
      render: (value, item) => (
        <span className={`blog-status status-${item.status}`}>
          {item.statusLabel}
        </span>
      )
    }
  ];

  const selectedCount = selectedIds.size;
  const totalCount = BLOG_POSTS.length;

  return (
    <div className="page-template blog-list-page">
      <div className="page-header">
        <h1 className="page-title">Blog List</h1>
        <p className="page-subtitle">
          Review and manage published, scheduled, and draft blog posts
        </p>
      </div>

      <Squircle
        cornerRadius={24}
        cornerSmoothing={1}
        className="blog-list-card"
      >
        <div className={`blog-toolbar ${selectedCount > 0 ? 'is-active' : ''}`}>
          <label className="blog-checkbox select-all">
            <input
              type="checkbox"
              checked={selectedCount > 0 && selectedCount === totalCount}
              onChange={(e) => {
                if (e.target.checked) {
                  const allIds = BLOG_POSTS.map(post => post.id);
                  setSelectedIds(new Set(allIds));
                  handleSelectionChange(allIds);
                } else {
                  setSelectedIds(new Set());
                  handleSelectionChange([]);
                }
              }}
              aria-label={selectedCount === totalCount ? 'Deselect all posts' : 'Select all posts'}
            />
            <span className="checkbox-indicator" />
          </label>
          <span className="toolbar-caption">
            {selectedCount > 0 ? `${selectedCount} selected` : `${totalCount} posts`}
          </span>
          <button type="button" className="toolbar-button primary">
            {selectedCount > 0 ? '+ Add to...' : '+ New Post'}
          </button>
          <div className="toolbar-spacer" />
          <button
            type="button"
            className="toolbar-button ghost"
            disabled={selectedCount === 0}
          >
            Delete
          </button>
        </div>

        <Table
          data={BLOG_POSTS}
          columns={columns}
          selectable={true}
          onSelectionChange={handleSelectionChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Squircle>
    </div>
  );
};

export default BlogList;