import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Squircle } from '@squircle-js/react';
import Table from '../components/ui/Table';
import './PageTemplate1.css';
import './BlogList.css';
import { getBlogs, deleteBlog } from '../api/blogs';

const FALLBACK_THUMBNAIL =
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=160&h=100&q=60';
const FALLBACK_AVATAR = 'https://i.pravatar.cc/48?img=7';

const BlogList = () => {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [deletingIds, setDeletingIds] = useState(new Set());

  useEffect(() => {
    let isMounted = true;
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setErrorMessage('');
        const response = await getBlogs();
        const apiBlogs = Array.isArray(response?.data) ? response.data : response;
        if (isMounted) {
          setBlogData(apiBlogs || []);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error?.message || 'Failed to load blogs.');
          setBlogData([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  const formattedPosts = useMemo(
    () =>
      blogData.map((blog) => {
        const thumbnail = Array.isArray(blog.imageUrls) && blog.imageUrls.length > 0
          ? blog.imageUrls[0]
          : FALLBACK_THUMBNAIL;
        const authorAvatar = blog.authorImage || FALLBACK_AVATAR;
        const readMinutes = blog.readTime || blog.read_time_minutes || 0;
        const duration =
          readMinutes > 0 ? `${String(readMinutes).padStart(2, '0')}:00` : '—';
        const publishedDate = blog.publishedAt || blog.published_at;
        const status = blog.status || (publishedDate ? 'public' : 'draft');
        const statusLabel =
          status === 'public'
            ? 'Published'
            : status === 'private'
              ? 'Private'
              : 'Draft';
        return {
          id: blog.id || blog._id,
          title: blog.title || 'Untitled',
          duration,
          author: blog.authorName || 'Unknown Author',
          authorAvatar,
          publishedOn: publishedDate
            ? new Date(publishedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Not scheduled',
          status,
          statusLabel,
          thumbnail,
          raw: blog,
        };
      }),
    [blogData]
  );

  const handleSelectionChange = (selected) => {
    setSelectedIds(new Set(selected));
  };

  const handleEdit = (item) => {
    if (!item?.raw?.id && !item?.raw?._id) {
      return;
    }
    const id = item.raw.id || item.raw._id;
    navigate(`/dashboard/blogs/create?id=${id}`);
  };

  const handleDelete = async (item) => {
    const blogId = item?.raw?.id || item?.raw?._id;
    if (!blogId) {
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.title || 'this blog'}"?`
    );
    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingIds((prev) => new Set(prev).add(blogId));
      await deleteBlog(blogId);
      setBlogData((prev) => prev.filter((blog) => (blog.id || blog._id) !== blogId));
      setSelectedIds((prev) => {
        const updated = new Set(prev);
        updated.delete(blogId);
        return updated;
      });
      setActionMessage('Blog deleted successfully.');
    } catch (error) {
      setErrorMessage(error?.message || 'Failed to delete blog.');
    } finally {
      setDeletingIds((prev) => {
        const updated = new Set(prev);
        updated.delete(blogId);
        return updated;
      });
    }
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
  const totalCount = formattedPosts.length;

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
                  const allIds = formattedPosts.map((post) => post.id);
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

        {loading ? (
          <div className="blog-alert info">Loading blogs…</div>
        ) : (
          <>
            {errorMessage && <div className="blog-alert error">{errorMessage}</div>}
            {actionMessage && <div className="blog-alert success">{actionMessage}</div>}
            <Table
              data={formattedPosts.map((post) => ({
                ...post,
                deleting: deletingIds.has(post.id),
              }))}
              columns={columns}
              selectable={true}
              onSelectionChange={handleSelectionChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </Squircle>
    </div>
  );
};

export default BlogList;