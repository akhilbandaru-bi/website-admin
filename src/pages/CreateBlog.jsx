import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Squircle } from '@squircle-js/react';
import Button from '../components/ui/Button';
import Dropdown from '../components/ui/Dropdown';
import Toggle from '../components/ui/Toggle';
import TextEditor from '../components/ui/TextEditor';
import TagInput from '../components/ui/TagInput';
import './CreateBlog.css';

const tabs = [
  { id: 'form', label: 'Form Builder', description: 'Capture the blog essentials' },
  { id: 'preview', label: 'Live Preview', description: 'Review before publishing' },
  { id: 'export', label: 'Content Export', description: 'Copy structured JSON' },
];

const blogCategories = [
  'Technology',
  'Innovation & Research',
  'Industry Insights',
  'Projects & Case Studies',
  'Sustainability & Environment',
  'Data & Analytics',
  'Operations & Process',
  'Business & Strategy',
  'Careers & Culture',
  'Company News & Announcements',
  'Learning & Tutorials',
  'Design & UI/UX',
  'Customer Stories',
  'Thought Leadership',
  'Product Updates',
];

const READING_SPEED_WPM = 200;

const initialBlogData = {
  title: '',
  slug: '',
  introTitle: '',
  summary: '',
  category: '',
  readTime: 0,
  views: 0,
  likes: 0,
  viewsEnabled: true,
  likesEnabled: true,
  metaTitle: '',
  metaDescription: '',
  keywords: '',
  tags: '',
  densityTarget: '',
  content: '',
  imageUrls: '',
  authorName: '',
  authorImage: '',
  publishedDate: '',
  updatedDate: '',
  recentBlogs: '',
  trendingNews: '',
  ctaTitle: '',
  ctaDescription: '',
  ctaButtonText: '',
  newsletterCta: '',
};

const FormIcon = () => (
  <svg className="blog-tab-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M6 4h7l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm7 0v4a1 1 0 0 0 1 1h4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.75 13h6.5M8.75 17h3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PreviewIcon = () => (
  <svg className="blog-tab-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 5c5.25 0 9 6.5 9 7s-3.75 7-9 7-9-6.5-9-7 3.75-7 9-7Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="2.75"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ExportIcon = () => (
  <svg className="blog-tab-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M8 12h8M8 16h8M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4l-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconMap = {
  form: <FormIcon />,
  preview: <PreviewIcon />,
  export: <ExportIcon />,
};

const CreateBlog = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [blogData, setBlogData] = useState(initialBlogData);

  const parseDelimitedInput = useCallback((rawValue) => {
    if (!rawValue) {
      return [];
    }
    return rawValue
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }, []);

  const stringifyTags = useCallback((tagsArray) => tagsArray.join(','), []);

  const handleInputChange = (field, value) => {
    setBlogData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = () => {
    setBlogData((prev) => {
      const base = prev.title || prev.metaTitle;
      if (!base) {
        return prev;
      }

      const slug = base
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      return { ...prev, slug };
    });
  };

  const plainTextContent = useMemo(() => {
    if (!blogData.content) {
      return '';
    }

    return blogData.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }, [blogData.content]);

  const previewMeta = useMemo(() => {
    const embeddedImages = blogData.content
      ? (blogData.content.match(/<img\b[^>]*>/gi) || []).length
      : 0;
    const referencedImages = blogData.imageUrls
      ? blogData.imageUrls.split(',').filter((url) => url.trim()).length
      : 0;

    return {
      wordCount: plainTextContent ? plainTextContent.split(/\s+/).filter(Boolean).length : 0,
      imageCount: embeddedImages + referencedImages,
    };
  }, [plainTextContent, blogData.content, blogData.imageUrls]);

  const estimatedReadTime = useMemo(() => {
    if (!previewMeta.wordCount) {
      return 0;
    }

    return Math.max(1, Math.ceil(previewMeta.wordCount / READING_SPEED_WPM));
  }, [previewMeta.wordCount]);

  useEffect(() => {
    setBlogData((prev) => {
      if (prev.readTime === estimatedReadTime) {
        return prev;
      }

      return { ...prev, readTime: estimatedReadTime };
    });
  }, [estimatedReadTime]);

  return (
    <div className="page-template blog-create">
      <div className="page-header blog-create-header">
        <div className="page-header-info">
          <h1 className="page-title">Create Blog</h1>
          <p className="page-subtitle">
            Craft a new article, optimize for SEO, and prepare it for publishing.
          </p>
        </div>
      </div>

      <div className="blog-create-body">
        <div className="blog-tabs">
          <div className={`blog-tab-content ${activeTab === 'form' ? 'active' : ''}`}>
            <div className="blog-form-content">

            <Squircle cornerRadius={24} cornerSmoothing={1} className="blog-card">
                <div className="blog-card-section">
                  <div className="blog-card-header">
                    <h2 className="blog-card-title">SEO & Metadata</h2>
                    <p className="blog-card-description">
                      Optimize your article for search engines.
                    </p>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-form-group">
                      <label htmlFor="metaTitle" className="blog-label">
                        Meta Title
                      </label>
                      <input
                        id="metaTitle"
                        className="blog-input"
                        placeholder="SEO-friendly title (up to 60 characters)"
                        value={blogData.metaTitle}
                        onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                      />
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="metaDescription" className="blog-label">
                        Meta Description
                      </label>
                      <textarea
                        id="metaDescription"
                        className="blog-textarea"
                        placeholder="SEO description (150-160 characters)"
                        value={blogData.metaDescription}
                        onChange={(e) =>
                          handleInputChange('metaDescription', e.target.value)
                        }
                        rows={3}
                      />
                    </div>

                    <div className="blog-form-grid blog-form-grid-two">
                    <div className="blog-form-group">
                      <TagInput
                        id="keywords"
                        label="Keywords"
                        placeholder="Type a keyword and press Enter"
                        values={parseDelimitedInput(blogData.keywords)}
                        onChange={(newTags) => handleInputChange('keywords', stringifyTags(newTags))}
                      />
                    </div>
                    <div className="blog-form-group">
                      <TagInput
                        id="tags"
                        label="Tags"
                        placeholder="Add tags and press Enter"
                        values={parseDelimitedInput(blogData.tags)}
                        onChange={(newTags) => handleInputChange('tags', stringifyTags(newTags))}
                      />
                    </div>
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="densityTarget" className="blog-label">
                        Keyword Density Target (%)
                      </label>
                      <input
                        id="densityTarget"
                        className="blog-input"
                        type="number"
                        placeholder="2"
                        value={blogData.densityTarget}
                        onChange={(e) =>
                          handleInputChange('densityTarget', e.target.value)
                        }
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>
              </Squircle>

              <Squircle cornerRadius={24} cornerSmoothing={1} className="blog-card">
                <div className="blog-card-section">
                  <div className="blog-card-header">
                    <h2 className="blog-card-title">Basic Information</h2>
                    <p className="blog-card-description">
                      Essential details about your blog article.
                    </p>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-form-grid blog-form-grid-two">
                      <div className="blog-form-group">
                        <label htmlFor="title" className="blog-label">
                          Title *
                        </label>
                        <input
                          id="title"
                          className="blog-input"
                          placeholder="Enter your blog title (55-70 characters)"
                          value={blogData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                      </div>
                      <div className="blog-form-group">
                        <label htmlFor="slug" className="blog-label">
                          Slug
                        </label>
                        <div className="blog-input-with-button">
                          <input
                            id="slug"
                            className="blog-input"
                            placeholder="url-friendly-slug"
                            value={blogData.slug}
                            onChange={(e) => handleInputChange('slug', e.target.value)}
                          />
                          <button
                            type="button"
                            className="blog-inline-button"
                            onClick={generateSlug}
                          >
                            Generate
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="introTitle" className="blog-label">
                        Intro Title
                      </label>
                      <input
                        id="introTitle"
                        className="blog-input"
                        placeholder="Catchy introduction title"
                        value={blogData.introTitle}
                        onChange={(e) => handleInputChange('introTitle', e.target.value)}
                      />
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="summary" className="blog-label">
                        Summary *
                      </label>
                      <textarea
                        id="summary"
                        className="blog-textarea"
                        placeholder="Brief summary (140-160 characters for SEO)"
                        value={blogData.summary}
                        onChange={(e) => handleInputChange('summary', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="blog-form-grid blog-form-grid-four">
                      <div className="blog-form-group">
                        <label htmlFor="category" className="blog-label">
                          Category
                        </label>
                        <Dropdown
                          id="category"
                          value={blogData.category}
                          onChange={(value) => handleInputChange('category', value)}
                          options={blogCategories}
                          placeholder="Select a category"
                        />
                      </div>
                      <div className="blog-form-group">
                        <label htmlFor="readTime" className="blog-label">
                          Read Time (mins)
                        </label>
                        <input
                          id="readTime"
                          className="blog-input"
                          type="number"
                          placeholder="Auto-calculated"
                          value={blogData.readTime > 0 ? blogData.readTime : ''}
                          readOnly
                        />
                        <p className="blog-field-hint">
                          Auto-calculated from the current word count (average {READING_SPEED_WPM} wpm).
                        </p>
                      </div>
                      <div className="blog-form-group blog-toggle-group">
                        <div className="blog-toggle-row">
                          <span className="blog-label">Views</span>
                          <Toggle
                            id="viewsEnabled"
                            checked={blogData.viewsEnabled}
                            onChange={(checked) => handleInputChange('viewsEnabled', checked)}
                            onLabel="Enabled"
                            offLabel="Disabled"
                          />
                        </div>
                        <p className="blog-field-hint">
                          Enable automatic view counting for this article.
                        </p>
                      </div>
                      <div className="blog-form-group blog-toggle-group">
                        <div className="blog-toggle-row">
                          <span className="blog-label">Likes</span>
                          <Toggle
                            id="likesEnabled"
                            checked={blogData.likesEnabled}
                            onChange={(checked) => handleInputChange('likesEnabled', checked)}
                            onLabel="Enabled"
                            offLabel="Disabled"
                          />
                        </div>
                        <p className="blog-field-hint">
                          Allow readers to like the article when published.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Squircle>

              <Squircle cornerRadius={24} cornerSmoothing={1} className="blog-card">
                <div className="blog-card-section">
                  <div className="blog-card-header">
                    <h2 className="blog-card-title">Content</h2>
                    <p className="blog-card-description">The main body of your article.</p>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-form-group">
                      <label htmlFor="content" className="blog-label">
                        Blog Content *
                      </label>
                      <TextEditor
                        id="content"
                        value={blogData.content}
                        onChange={(html) => handleInputChange('content', html)}
                        placeholder="Write your amazing blog content here. Use headings, lists, quotes, images, and links to bring your article to life."
                      />
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="imageUrls" className="blog-label">
                        Image URLs
                      </label>
                      <textarea
                        id="imageUrls"
                        className="blog-textarea"
                        placeholder="Comma-separated image URLs (cover, inline images, thumbnails)"
                        value={blogData.imageUrls}
                        onChange={(e) => handleInputChange('imageUrls', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </Squircle>

              <Squircle cornerRadius={24} cornerSmoothing={1} className="blog-card">
                <div className="blog-card-section">
                  <div className="blog-card-header">
                    <h2 className="blog-card-title">Author & Dates</h2>
                    <p className="blog-card-description">
                      Author information and publication details.
                    </p>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-form-grid blog-form-grid-two">
                      <div className="blog-form-group">
                        <label htmlFor="authorName" className="blog-label">
                          Author Name
                        </label>
                        <input
                          id="authorName"
                          className="blog-input"
                          placeholder="John Doe"
                          value={blogData.authorName}
                          onChange={(e) => handleInputChange('authorName', e.target.value)}
                        />
                      </div>
                      <div className="blog-form-group">
                        <label htmlFor="authorImage" className="blog-label">
                          Author Image URL
                        </label>
                        <input
                          id="authorImage"
                          className="blog-input"
                          placeholder="https://..."
                          value={blogData.authorImage}
                          onChange={(e) => handleInputChange('authorImage', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="blog-form-grid blog-form-grid-two">
                      <div className="blog-form-group">
                        <label htmlFor="publishedDate" className="blog-label">
                          Published Date
                        </label>
                        <input
                          id="publishedDate"
                          className="blog-input"
                          type="date"
                          value={blogData.publishedDate}
                          onChange={(e) =>
                            handleInputChange('publishedDate', e.target.value)
                          }
                        />
                      </div>
                      <div className="blog-form-group">
                        <label htmlFor="updatedDate" className="blog-label">
                          Updated Date
                        </label>
                        <input
                          id="updatedDate"
                          className="blog-input"
                          type="date"
                          value={blogData.updatedDate}
                          onChange={(e) =>
                            handleInputChange('updatedDate', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Squircle>

              <Squircle cornerRadius={24} cornerSmoothing={1} className="blog-card">
                <div className="blog-card-section">
                  <div className="blog-card-header">
                    <h2 className="blog-card-title">Additional Content</h2>
                    <p className="blog-card-description">
                      Related blogs, news, and CTAs.
                    </p>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-form-group">
                      <label htmlFor="recentBlogs" className="blog-label">
                        Recent Blogs
                      </label>
                      <textarea
                        id="recentBlogs"
                        className="blog-textarea"
                        placeholder="List of recent blog titles/links"
                        value={blogData.recentBlogs}
                        onChange={(e) => handleInputChange('recentBlogs', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="trendingNews" className="blog-label">
                        Trending News
                      </label>
                      <textarea
                        id="trendingNews"
                        className="blog-textarea"
                        placeholder="List of trending news items"
                        value={blogData.trendingNews}
                        onChange={(e) => handleInputChange('trendingNews', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="ctaTitle" className="blog-label">
                        Call to Action Title
                      </label>
                      <input
                        id="ctaTitle"
                        className="blog-input"
                        placeholder="Ready to Take Action?"
                        value={blogData.ctaTitle}
                        onChange={(e) => handleInputChange('ctaTitle', e.target.value)}
                      />
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="ctaDescription" className="blog-label">
                        Call to Action Description
                      </label>
                      <textarea
                        id="ctaDescription"
                        className="blog-textarea"
                        placeholder="Describe what readers should do next"
                        value={blogData.ctaDescription}
                        onChange={(e) =>
                          handleInputChange('ctaDescription', e.target.value)
                        }
                        rows={2}
                      />
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="ctaButtonText" className="blog-label">
                        Call to Action Button Text
                      </label>
                      <input
                        id="ctaButtonText"
                        className="blog-input"
                        placeholder="Get Started"
                        value={blogData.ctaButtonText}
                        onChange={(e) =>
                          handleInputChange('ctaButtonText', e.target.value)
                        }
                      />
                    </div>

                    <div className="blog-form-group">
                      <label htmlFor="newsletterCta" className="blog-label">
                        Newsletter CTA
                      </label>
                      <input
                        id="newsletterCta"
                        className="blog-input"
                        placeholder="Subscribe to our newsletter..."
                        value={blogData.newsletterCta}
                        onChange={(e) =>
                          handleInputChange('newsletterCta', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </Squircle>

              <div className="blog-preview-button">
                <Button
                  className="blog-preview-btn"
                  variant="primary"
                  onClick={() => setActiveTab('preview')}
                >
                Submit
                </Button>
              </div>
            </div>
          </div>

          <div className={`blog-tab-content ${activeTab === 'preview' ? 'active' : ''}`}>
            <Squircle cornerRadius={24} cornerSmoothing={1} className="blog-card">
              <div className="blog-card-section">
                <div className="blog-preview">
                  <div className="blog-preview-meta">
                    <span>{blogData.category || 'Category TBD'}</span>
                    <span>{blogData.readTime ? `${blogData.readTime} min read` : 'Read time TBD'}</span>
                    <span>{previewMeta.wordCount} words</span>
                    <span>{previewMeta.imageCount} images</span>
                  </div>
                  <h2 className="blog-preview-title">
                    {blogData.title || 'Untitled Blog Article'}
                  </h2>
                  <p className="blog-preview-subtitle">
                    {blogData.summary ||
                      'Use the form tab to craft your summary and see it reflected here instantly.'}
                  </p>
                  <div className="blog-preview-separator" />
                  <div className="blog-preview-body">
                    {blogData.content ? (
                      <div
                        className="blog-preview-render"
                        dangerouslySetInnerHTML={{ __html: blogData.content }}
                      />
                    ) : (
                      <p>
                        Start writing your blog content in the form tab to see the live preview. Use
                        headings, bullet points, and links to bring your article to life.
                      </p>
                    )}
                  </div>
                  <div className="blog-preview-author">
                    <div className="blog-preview-author-info">
                      <span className="blog-preview-author-label">Author</span>
                      <strong>{blogData.authorName || 'TBD'}</strong>
                    </div>
                    <div className="blog-preview-author-info">
                      <span className="blog-preview-author-label">Published</span>
                      <strong>{blogData.publishedDate || 'Not scheduled'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>
          </div>

          <div className={`blog-tab-content ${activeTab === 'export' ? 'active' : ''}`}>
            <Squircle cornerRadius={24} cornerSmoothing={1} className="blog-card">
              <div className="blog-card-section">
                <div className="blog-export">
                  <h2>Structured Blog Payload</h2>
                  <p>Copy this JSON and send it to your backend or CMS.</p>
                  <pre className="blog-export-pre">
                    {JSON.stringify(blogData, null, 2)}
                  </pre>
                </div>
              </div>
            </Squircle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

