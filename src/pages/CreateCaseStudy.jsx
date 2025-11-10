import React, { useMemo, useState } from 'react';
import { Squircle } from '@squircle-js/react';
import Button from '../components/ui/Button';
import Dropdown from '../components/ui/Dropdown';
import Toggle from '../components/ui/Toggle';
import './PageTemplate1.css';
import './CreateCaseStudy.css';


const metricTemplate = { label: '', value: '', order: '' };
const challengeTemplate = { number: '', title: '', description: '', icon: '' };
const approachTemplate = { number: '', title: '', description: '', icon: '' };
const tocTemplate = { title: '', anchor: '' };
const contactEntryTemplate = { label: '', value: '', icon: '' };
const formFieldTemplate = { label: '', placeholder: '', type: '' };
const recentBlogTemplate = { title: '', link: '' };

const caseStudyCategories = [
  'Energy & Utilities',
  'Smart Infrastructure',
  'Grid Modernization',
  'Sustainability',
  'Digital Transformation',
  'Industrial Automation',
  'Data & Analytics',
  'Customer Success',
];

const initialCaseStudyData = {
  heroTitle: '',
  heroSubtitle: '',
  category: '',
  publishedDate: '',
  showLikes: true,
  featured: false,
  tableOfContents: [tocTemplate],

  progressTag: '',
  progressTitle: '',
  progressDescription: '',
  progressBackgroundVideo: '',
  progressButtonLabel: '',

  metrics: [metricTemplate],

  clientTag: '',
  clientName: '',
  clientDescription: '',
  clientImageOne: '',
  clientImageTwo: '',

  challengesTag: '',
  challengeCards: [challengeTemplate],
  approachCards: [approachTemplate],

  testimonialTag: '',
  testimonialTitle: '',
  testimonialQuote: '',
  testimonialAuthor: '',
  testimonialAuthorInfo: '',
  testimonialRating: '',
  testimonialImage: '',

  recentBlogs: [recentBlogTemplate],

  contactTag: '',
  contactTitle: '',
  contactButtonLabel: '',
  contactLocations: [contactEntryTemplate],
  contactPhones: [contactEntryTemplate],
  contactEmails: [contactEntryTemplate],
  contactFormFields: [formFieldTemplate],

  ctaTitle: '',
  ctaDescription: '',
  ctaBackgroundImage: '',
  ctaButtonLabel: '',
};

const CreateCaseStudy = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [caseStudyData, setCaseStudyData] = useState(initialCaseStudyData);

  const handleInputChange = (field, value) => {
    setCaseStudyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleListChange = (listName, index, field, value) => {
    setCaseStudyData((prev) => {
      const updated = [...prev[listName]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [listName]: updated };
    });
  };

  const handleAddListItem = (listName, template) => {
    setCaseStudyData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], { ...template }],
    }));
  };

  const handleRemoveListItem = (listName, index) => {
    setCaseStudyData((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, idx) => idx !== index),
    }));
  };

  const summaryStats = useMemo(
    () => ({
      metricsCount: caseStudyData.metrics.filter((metric) => metric.label || metric.value).length,
      tocCount: caseStudyData.tableOfContents.filter((item) => item.title || item.anchor).length,
      challengeCount: caseStudyData.challengeCards.filter(
        (card) => card.title || card.description,
      ).length,
      approachCount: caseStudyData.approachCards.filter(
        (card) => card.title || card.description,
      ).length,
      recentBlogCount: caseStudyData.recentBlogs.filter((blog) => blog.title || blog.link).length,
      formFieldCount: caseStudyData.contactFormFields.filter(
        (field) => field.label || field.placeholder,
      ).length,
    }),
    [caseStudyData],
  );

  return (
    <div className="page-template case-study-create">
      <div className="page-header case-study-create-header">
        <div className="page-header-info">
          <h1 className="page-title">Create Case Study</h1>
          <p className="page-subtitle">
            Capture the challenge, solution, and impact to showcase your success story.
          </p>
        </div>
      </div>

      <div className="case-study-tabs">
        <div className={`case-study-tab-content ${activeTab === 'form' ? 'active' : ''}`}>
          <div className="case-study-form-content">
            <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
              <div className="case-study-card-section">
                <div className="case-study-card-header">
                  <h2 className="case-study-card-title">Case Study Overview</h2>
                  <p className="case-study-card-subtitle">
                    Set the foundational information and meta details for this case study.
                  </p>
                </div>
                <div className="case-study-card-body">

                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="heroTitle">
                      Case Study Title
                    </label>
                    <input
                      id="heroTitle"
                      className="case-study-input"
                      placeholder="Rebuilding Grid Resilience for Northern Utilities"
                      value={caseStudyData.heroTitle}
                      onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                    />
                  </div>

                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="heroSubtitle">
                      Case Study Summary
                    </label>
                    <textarea
                      id="heroSubtitle"
                      className="case-study-textarea"
                      rows={3}
                      placeholder="Summarize the project scope and highlight the key outcomes in one or two sentences."
                      value={caseStudyData.heroSubtitle}
                      onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                    />
                  </div>

                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="category">
                        Category
                      </label>
                      <Dropdown
                        id="category"
                        value={caseStudyData.category}
                        onChange={(value) => handleInputChange('category', value)}
                        options={caseStudyCategories}
                        placeholder="Select a category"
                      />
                    </div>
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="publishedDate">
                        Published Date
                      </label>
                      <input
                        id="publishedDate"
                        className="case-study-input"
                        type="date"
                        value={caseStudyData.publishedDate}
                        onChange={(e) => handleInputChange('publishedDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="case-study-form-group case-study-toggle-group">
                    <div className="case-study-toggle-row">
                      <span className="case-study-label">Likes</span>
                      <Toggle
                        id="showLikes"
                        checked={caseStudyData.showLikes}
                        onChange={(checked) => handleInputChange('showLikes', checked)}
                        onLabel="Shown"
                        offLabel="Hidden"
                      />
                    </div>
                    <p className="case-study-field-hint">
                      Control whether the like count is visible on the published case study.
                    </p>
                  </div>

                  <div className="case-study-form-group">
                    <div className="case-study-list-header">
                      <span className="case-study-label">Table of Contents</span>
                      <button
                        type="button"
                        className="case-study-inline-btn"
                        onClick={() => handleAddListItem('tableOfContents', tocTemplate)}
                      >
                        + Add Section
                      </button>
                    </div>
                    <div className="case-study-list">
                      {caseStudyData.tableOfContents.map((item, index) => (
                        <div className="case-study-list-item" key={`toc-${index}`}>
                          <div className="case-study-form-grid case-study-form-grid-two">
                            <div className="case-study-form-group">
                              <label className="case-study-label">Section Title</label>
                              <input
                                className="case-study-input"
                                placeholder="The Challenge"
                                value={item.title}
                                onChange={(e) =>
                                  handleListChange('tableOfContents', index, 'title', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Anchor / Link</label>
                              <input
                                className="case-study-input"
                                placeholder="#challenge"
                                value={item.anchor}
                                onChange={(e) =>
                                  handleListChange(
                                    'tableOfContents',
                                    index,
                                    'anchor',
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                          </div>
                          {caseStudyData.tableOfContents.length > 1 && (
                            <button
                              type="button"
                              className="case-study-remove-btn"
                              onClick={() => handleRemoveListItem('tableOfContents', index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
              <div className="case-study-card-section">
                <div className="case-study-card-header">
                  <h2 className="case-study-card-title">Progress Section</h2>
                  <p className="case-study-card-subtitle">
                    Showcase the transformation journey with a compelling narrative and visuals.
                  </p>
                </div>
                <div className="case-study-card-body">
                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="progressTag">
                        Tag
                      </label>
                      <input
                        id="progressTag"
                        className="case-study-input"
                        placeholder="Progress"
                        value={caseStudyData.progressTag}
                        onChange={(e) => handleInputChange('progressTag', e.target.value)}
                      />
                    </div>
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="progressBackgroundVideo">
                        Background Video URL
                      </label>
                      <input
                        id="progressBackgroundVideo"
                        className="case-study-input"
                        placeholder="https://..."
                        value={caseStudyData.progressBackgroundVideo}
                        onChange={(e) =>
                          handleInputChange('progressBackgroundVideo', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="progressTitle">
                      Section Title
                    </label>
                    <input
                      id="progressTitle"
                      className="case-study-input"
                      placeholder="Transforming Grid Reliability"
                      value={caseStudyData.progressTitle}
                      onChange={(e) => handleInputChange('progressTitle', e.target.value)}
                    />
                  </div>

                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="progressDescription">
                      Section Description
                    </label>
                    <textarea
                      id="progressDescription"
                      className="case-study-textarea"
                      rows={3}
                      placeholder="Describe the journey, milestones, and acceleration that took place."
                      value={caseStudyData.progressDescription}
                      onChange={(e) => handleInputChange('progressDescription', e.target.value)}
                    />
                  </div>

                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="progressButtonLabel">
                      Button Label
                    </label>
                    <input
                      id="progressButtonLabel"
                      className="case-study-input"
                      placeholder="Watch the Journey"
                      value={caseStudyData.progressButtonLabel}
                      onChange={(e) => handleInputChange('progressButtonLabel', e.target.value)}
                    />
                  </div>

                  <div className="case-study-form-group">
                    <div className="case-study-list-header">
                      <span className="case-study-label">Metrics</span>
                      <button
                        type="button"
                        className="case-study-inline-btn"
                        onClick={() => handleAddListItem('metrics', metricTemplate)}
                      >
                        + Add Metric
                      </button>
                    </div>
                    <div className="case-study-list">
                      {caseStudyData.metrics.map((metric, index) => (
                        <div className="case-study-list-item" key={`metric-${index}`}>
                          <div className="case-study-form-grid case-study-form-grid-three">
                            <div className="case-study-form-group">
                              <label className="case-study-label">Metric Label</label>
                              <input
                                className="case-study-input"
                                placeholder="Downtime Reduced"
                                value={metric.label}
                                onChange={(e) =>
                                  handleListChange('metrics', index, 'label', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Metric Value</label>
                              <input
                                className="case-study-input"
                                placeholder="73%"
                                value={metric.value}
                                onChange={(e) =>
                                  handleListChange('metrics', index, 'value', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Display Order</label>
                              <input
                                className="case-study-input"
                                placeholder="1"
                                value={metric.order}
                                onChange={(e) =>
                                  handleListChange('metrics', index, 'order', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          {caseStudyData.metrics.length > 1 && (
                            <button
                              type="button"
                              className="case-study-remove-btn"
                              onClick={() => handleRemoveListItem('metrics', index)}
                            >
                              Remove Metric
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
              <div className="case-study-card-section">
                <div className="case-study-card-header">
                  <h2 className="case-study-card-title">About the Client</h2>
                  <p className="case-study-card-subtitle">
                    Share details about the client, their background, and brand visuals.
                  </p>
                </div>
                <div className="case-study-card-body">
                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="clientTag">
                        Tag
                      </label>
                      <input
                        id="clientTag"
                        className="case-study-input"
                        placeholder="Client"
                        value={caseStudyData.clientTag}
                        onChange={(e) => handleInputChange('clientTag', e.target.value)}
                      />
                    </div>
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="clientName">
                        Client Name
                      </label>
                      <input
                        id="clientName"
                        className="case-study-input"
                        placeholder="Northern Utilities"
                        value={caseStudyData.clientName}
                        onChange={(e) => handleInputChange('clientName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="clientDescription">
                      Client Description
                    </label>
                    <textarea
                      id="clientDescription"
                      className="case-study-textarea"
                      rows={3}
                      placeholder="Describe the client's mission, scale, and why they chose your organization."
                      value={caseStudyData.clientDescription}
                      onChange={(e) => handleInputChange('clientDescription', e.target.value)}
                    />
                  </div>

                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="clientImageOne">
                        Client Image 1
                      </label>
                      <input
                        id="clientImageOne"
                        className="case-study-input"
                        placeholder="https://..."
                        value={caseStudyData.clientImageOne}
                        onChange={(e) => handleInputChange('clientImageOne', e.target.value)}
                      />
                    </div>
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="clientImageTwo">
                        Client Image 2
                      </label>
                      <input
                        id="clientImageTwo"
                        className="case-study-input"
                        placeholder="https://..."
                        value={caseStudyData.clientImageTwo}
                        onChange={(e) => handleInputChange('clientImageTwo', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
              <div className="case-study-card-section">
                <div className="case-study-card-header">
                  <h2 className="case-study-card-title">Challenges & Approach</h2>
                  <p className="case-study-card-subtitle">
                    Detail the hurdles you tackled and the strategies you deployed.
                  </p>
                </div>
                <div className="case-study-card-body">
                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="challengesTag">
                      Tag
                    </label>
                    <input
                      id="challengesTag"
                      className="case-study-input"
                      placeholder="Challenges"
                      value={caseStudyData.challengesTag}
                      onChange={(e) => handleInputChange('challengesTag', e.target.value)}
                    />
                  </div>

                  <div className="case-study-form-group">
                    <div className="case-study-list-header">
                      <span className="case-study-label">Challenges Cards</span>
                      <button
                        type="button"
                        className="case-study-inline-btn"
                        onClick={() => handleAddListItem('challengeCards', challengeTemplate)}
                      >
                        + Add Challenge
                      </button>
                    </div>
                    <div className="case-study-list">
                      {caseStudyData.challengeCards.map((challenge, index) => (
                        <div className="case-study-list-item" key={`challenge-${index}`}>
                          <div className="case-study-form-grid case-study-form-grid-three">
                            <div className="case-study-form-group">
                              <label className="case-study-label">Number</label>
                              <input
                                className="case-study-input"
                                placeholder="01"
                                value={challenge.number}
                                onChange={(e) =>
                                  handleListChange('challengeCards', index, 'number', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Title</label>
                              <input
                                className="case-study-input"
                                placeholder="Aging Infrastructure"
                                value={challenge.title}
                                onChange={(e) =>
                                  handleListChange('challengeCards', index, 'title', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Icon URL</label>
                              <input
                                className="case-study-input"
                                placeholder="https://..."
                                value={challenge.icon}
                                onChange={(e) =>
                                  handleListChange('challengeCards', index, 'icon', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="case-study-form-group">
                            <label className="case-study-label">Description</label>
                            <textarea
                              className="case-study-textarea"
                              rows={2}
                              placeholder="Explain the nature of this challenge and the stakes involved."
                              value={challenge.description}
                              onChange={(e) =>
                                handleListChange(
                                  'challengeCards',
                                  index,
                                  'description',
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          {caseStudyData.challengeCards.length > 1 && (
                            <button
                              type="button"
                              className="case-study-remove-btn"
                              onClick={() => handleRemoveListItem('challengeCards', index)}
                            >
                              Remove Challenge
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="case-study-form-group">
                    <div className="case-study-list-header">
                      <span className="case-study-label">Approach Cards</span>
                      <button
                        type="button"
                        className="case-study-inline-btn"
                        onClick={() => handleAddListItem('approachCards', approachTemplate)}
                      >
                        + Add Approach
                      </button>
                    </div>
                    <div className="case-study-list">
                      {caseStudyData.approachCards.map((approach, index) => (
                        <div className="case-study-list-item" key={`approach-${index}`}>
                          <div className="case-study-form-grid case-study-form-grid-three">
                            <div className="case-study-form-group">
                              <label className="case-study-label">Number</label>
                              <input
                                className="case-study-input"
                                placeholder="01"
                                value={approach.number}
                                onChange={(e) =>
                                  handleListChange('approachCards', index, 'number', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Title</label>
                              <input
                                className="case-study-input"
                                placeholder="Digital Twin Deployment"
                                value={approach.title}
                                onChange={(e) =>
                                  handleListChange('approachCards', index, 'title', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Icon URL</label>
                              <input
                                className="case-study-input"
                                placeholder="https://..."
                                value={approach.icon}
                                onChange={(e) =>
                                  handleListChange('approachCards', index, 'icon', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="case-study-form-group">
                            <label className="case-study-label">Description</label>
                            <textarea
                              className="case-study-textarea"
                              rows={2}
                              placeholder="Describe the strategy, execution steps, and rationale."
                              value={approach.description}
                              onChange={(e) =>
                                handleListChange(
                                  'approachCards',
                                  index,
                                  'description',
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          {caseStudyData.approachCards.length > 1 && (
                            <button
                              type="button"
                              className="case-study-remove-btn"
                              onClick={() => handleRemoveListItem('approachCards', index)}
                            >
                              Remove Approach
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
              <div className="case-study-card-section">
                <div className="case-study-card-header">
                  <h2 className="case-study-card-title">Testimonial Section</h2>
                  <p className="case-study-card-subtitle">
                    Validate the results with a powerful testimonial from your client.
                  </p>
                </div>
                <div className="case-study-card-body">
                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="testimonialTag">
                        Tag
                      </label>
                      <input
                        id="testimonialTag"
                        className="case-study-input"
                        placeholder="Testimonials"
                        value={caseStudyData.testimonialTag}
                        onChange={(e) => handleInputChange('testimonialTag', e.target.value)}
                      />
                    </div>
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="testimonialTitle">
                        Section Title
                      </label>
                      <input
                        id="testimonialTitle"
                        className="case-study-input"
                        placeholder="What Our Partners Say"
                        value={caseStudyData.testimonialTitle}
                        onChange={(e) => handleInputChange('testimonialTitle', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="testimonialQuote">
                      Testimonial Quote
                    </label>
                    <textarea
                      id="testimonialQuote"
                      className="case-study-textarea"
                      rows={3}
                      placeholder="Share the client's quote about your work."
                      value={caseStudyData.testimonialQuote}
                      onChange={(e) => handleInputChange('testimonialQuote', e.target.value)}
                    />
                  </div>

                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="testimonialAuthor">
                        Testimonial Author
                      </label>
                      <input
                        id="testimonialAuthor"
                        className="case-study-input"
                        placeholder="Sarah Jensen"
                        value={caseStudyData.testimonialAuthor}
                        onChange={(e) => handleInputChange('testimonialAuthor', e.target.value)}
                      />
                    </div>
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="testimonialAuthorInfo">
                        Author Info / Role
                      </label>
                      <input
                        id="testimonialAuthorInfo"
                        className="case-study-input"
                        placeholder="VP of Operations, Northern Utilities"
                        value={caseStudyData.testimonialAuthorInfo}
                        onChange={(e) => handleInputChange('testimonialAuthorInfo', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="testimonialRating">
                        Rating
                      </label>
                      <input
                        id="testimonialRating"
                        className="case-study-input"
                        placeholder="4.9/5"
                        value={caseStudyData.testimonialRating}
                        onChange={(e) => handleInputChange('testimonialRating', e.target.value)}
                      />
                    </div>
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="testimonialImage">
                        Testimonial Image URL
                      </label>
                      <input
                        id="testimonialImage"
                        className="case-study-input"
                        placeholder="https://..."
                        value={caseStudyData.testimonialImage}
                        onChange={(e) => handleInputChange('testimonialImage', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
              <div className="case-study-card-section">
                <div className="case-study-card-header">
                  <h2 className="case-study-card-title">Recent Blogs</h2>
                  <p className="case-study-card-subtitle">
                    Highlight relevant follow-up content or blog posts that build on this story.
                  </p>
                </div>
                <div className="case-study-card-body">
                  <div className="case-study-form-group">
                    <div className="case-study-list-header">
                      <span className="case-study-label">Blog Entries</span>
                      <button
                        type="button"
                        className="case-study-inline-btn"
                        onClick={() => handleAddListItem('recentBlogs', recentBlogTemplate)}
                      >
                        + Add Blog
                      </button>
                    </div>
                    <div className="case-study-list">
                      {caseStudyData.recentBlogs.map((blog, index) => (
                        <div className="case-study-list-item" key={`recent-blog-${index}`}>
                          <div className="case-study-form-group">
                            <label className="case-study-label">Blog Title</label>
                            <input
                              className="case-study-input"
                              placeholder="How Utilities Embrace AI"
                              value={blog.title}
                              onChange={(e) =>
                                handleListChange('recentBlogs', index, 'title', e.target.value)
                              }
                            />
                          </div>
                          <div className="case-study-form-group">
                            <label className="case-study-label">Blog Link</label>
                            <input
                              className="case-study-input"
                              placeholder="https://..."
                              value={blog.link}
                              onChange={(e) =>
                                handleListChange('recentBlogs', index, 'link', e.target.value)
                              }
                            />
                          </div>
                          {caseStudyData.recentBlogs.length > 1 && (
                            <button
                              type="button"
                              className="case-study-remove-btn"
                              onClick={() => handleRemoveListItem('recentBlogs', index)}
                            >
                              Remove Blog
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
              <div className="case-study-card-section">
                <div className="case-study-card-header">
                  <h2 className="case-study-card-title">Contact Section</h2>
                  <p className="case-study-card-subtitle">
                    Provide location, phone, and email details along with form fields to capture
                    leads.
                  </p>
                </div>
                <div className="case-study-card-body">
                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="contactTag">
                        Tag
                      </label>
                      <input
                        id="contactTag"
                        className="case-study-input"
                        placeholder="Contact"
                        value={caseStudyData.contactTag}
                        onChange={(e) => handleInputChange('contactTag', e.target.value)}
                      />
                    </div>
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="contactTitle">
                        Section Title
                      </label>
                      <input
                        id="contactTitle"
                        className="case-study-input"
                        placeholder="Let’s Discuss Your Next Project"
                        value={caseStudyData.contactTitle}
                        onChange={(e) => handleInputChange('contactTitle', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="contactButtonLabel">
                        Contact Button Label
                      </label>
                      <input
                        id="contactButtonLabel"
                        className="case-study-input"
                        placeholder="Book a Consultation"
                        value={caseStudyData.contactButtonLabel}
                        onChange={(e) => handleInputChange('contactButtonLabel', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="case-study-form-group">
                    <div className="case-study-list-header">
                      <span className="case-study-label">Locations</span>
                      <button
                        type="button"
                        className="case-study-inline-btn"
                        onClick={() =>
                          handleAddListItem('contactLocations', contactEntryTemplate)
                        }
                      >
                        + Add Location
                      </button>
                    </div>
                    <div className="case-study-list">
                      {caseStudyData.contactLocations.map((location, index) => (
                        <div className="case-study-list-item" key={`location-${index}`}>
                          <div className="case-study-form-grid case-study-form-grid-three">
                            <div className="case-study-form-group">
                              <label className="case-study-label">Location Label</label>
                              <input
                                className="case-study-input"
                                placeholder="Headquarters"
                                value={location.label}
                                onChange={(e) =>
                                  handleListChange('contactLocations', index, 'label', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Location</label>
                              <input
                                className="case-study-input"
                                placeholder="123 Energy Blvd, Seattle"
                                value={location.value}
                                onChange={(e) =>
                                  handleListChange('contactLocations', index, 'value', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Icon URL</label>
                              <input
                                className="case-study-input"
                                placeholder="https://..."
                                value={location.icon}
                                onChange={(e) =>
                                  handleListChange('contactLocations', index, 'icon', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          {caseStudyData.contactLocations.length > 1 && (
                            <button
                              type="button"
                              className="case-study-remove-btn"
                              onClick={() => handleRemoveListItem('contactLocations', index)}
                            >
                              Remove Location
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="case-study-form-group">
                    <div className="case-study-list-header">
                      <span className="case-study-label">Phone Contacts</span>
                      <button
                        type="button"
                        className="case-study-inline-btn"
                        onClick={() => handleAddListItem('contactPhones', contactEntryTemplate)}
                      >
                        + Add Phone
                      </button>
                    </div>
                    <div className="case-study-list">
                      {caseStudyData.contactPhones.map((phone, index) => (
                        <div className="case-study-list-item" key={`phone-${index}`}>
                          <div className="case-study-form-grid case-study-form-grid-three">
                            <div className="case-study-form-group">
                              <label className="case-study-label">Phone Label</label>
                              <input
                                className="case-study-input"
                                placeholder="Support"
                                value={phone.label}
                                onChange={(e) =>
                                  handleListChange('contactPhones', index, 'label', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Phone Number</label>
                              <input
                                className="case-study-input"
                                placeholder="+1 (555) 123-4567"
                                value={phone.value}
                                onChange={(e) =>
                                  handleListChange('contactPhones', index, 'value', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Icon URL</label>
                              <input
                                className="case-study-input"
                                placeholder="https://..."
                                value={phone.icon}
                                onChange={(e) =>
                                  handleListChange('contactPhones', index, 'icon', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          {caseStudyData.contactPhones.length > 1 && (
                            <button
                              type="button"
                              className="case-study-remove-btn"
                              onClick={() => handleRemoveListItem('contactPhones', index)}
                            >
                              Remove Phone
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="case-study-form-group">
                    <div className="case-study-list-header">
                      <span className="case-study-label">Email Contacts</span>
                      <button
                        type="button"
                        className="case-study-inline-btn"
                        onClick={() => handleAddListItem('contactEmails', contactEntryTemplate)}
                      >
                        + Add Email
                      </button>
                    </div>
                    <div className="case-study-list">
                      {caseStudyData.contactEmails.map((email, index) => (
                        <div className="case-study-list-item" key={`email-${index}`}>
                          <div className="case-study-form-grid case-study-form-grid-three">
                            <div className="case-study-form-group">
                              <label className="case-study-label">Email Label</label>
                              <input
                                className="case-study-input"
                                placeholder="General Inquiries"
                                value={email.label}
                                onChange={(e) =>
                                  handleListChange('contactEmails', index, 'label', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Email Address</label>
                              <input
                                className="case-study-input"
                                placeholder="hello@bestinfra.com"
                                value={email.value}
                                onChange={(e) =>
                                  handleListChange('contactEmails', index, 'value', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Icon URL</label>
                              <input
                                className="case-study-input"
                                placeholder="https://..."
                                value={email.icon}
                                onChange={(e) =>
                                  handleListChange('contactEmails', index, 'icon', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          {caseStudyData.contactEmails.length > 1 && (
                            <button
                              type="button"
                              className="case-study-remove-btn"
                              onClick={() => handleRemoveListItem('contactEmails', index)}
                            >
                              Remove Email
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="case-study-form-group">
                    <div className="case-study-list-header">
                      <span className="case-study-label">Contact Form Fields</span>
                      <button
                        type="button"
                        className="case-study-inline-btn"
                        onClick={() =>
                          handleAddListItem('contactFormFields', formFieldTemplate)
                        }
                      >
                        + Add Field
                      </button>
                    </div>
                    <div className="case-study-list">
                      {caseStudyData.contactFormFields.map((field, index) => (
                        <div className="case-study-list-item" key={`form-field-${index}`}>
                          <div className="case-study-form-grid case-study-form-grid-three">
                            <div className="case-study-form-group">
                              <label className="case-study-label">Field Label</label>
                              <input
                                className="case-study-input"
                                placeholder="Full Name"
                                value={field.label}
                                onChange={(e) =>
                                  handleListChange('contactFormFields', index, 'label', e.target.value)
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Placeholder</label>
                              <input
                                className="case-study-input"
                                placeholder="Enter your name"
                                value={field.placeholder}
                                onChange={(e) =>
                                  handleListChange(
                                    'contactFormFields',
                                    index,
                                    'placeholder',
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <div className="case-study-form-group">
                              <label className="case-study-label">Input Type</label>
                              <input
                                className="case-study-input"
                                placeholder="text, email, tel"
                                value={field.type}
                                onChange={(e) =>
                                  handleListChange('contactFormFields', index, 'type', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          {caseStudyData.contactFormFields.length > 1 && (
                            <button
                              type="button"
                              className="case-study-remove-btn"
                              onClick={() => handleRemoveListItem('contactFormFields', index)}
                            >
                              Remove Field
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
              <div className="case-study-card-section">
                <div className="case-study-card-header">
                  <h2 className="case-study-card-title">Final CTA</h2>
                  <p className="case-study-card-subtitle">
                    End the story with a compelling call to action for prospective clients.
                  </p>
                </div>
                <div className="case-study-card-body">
                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="ctaTitle">
                      CTA Title
                    </label>
                    <input
                      id="ctaTitle"
                      className="case-study-input"
                      placeholder="Ready to Achieve Similar Results?"
                      value={caseStudyData.ctaTitle}
                      onChange={(e) => handleInputChange('ctaTitle', e.target.value)}
                    />
                  </div>
                  <div className="case-study-form-group">
                    <label className="case-study-label" htmlFor="ctaDescription">
                      CTA Description
                    </label>
                    <textarea
                      id="ctaDescription"
                      className="case-study-textarea"
                      rows={3}
                      placeholder="Encourage the reader to take the next step and connect with your team."
                      value={caseStudyData.ctaDescription}
                      onChange={(e) => handleInputChange('ctaDescription', e.target.value)}
                    />
                  </div>
                  <div className="case-study-form-grid case-study-form-grid-two">
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="ctaBackgroundImage">
                        Background Image URL
                      </label>
                      <input
                        id="ctaBackgroundImage"
                        className="case-study-input"
                        placeholder="https://..."
                        value={caseStudyData.ctaBackgroundImage}
                        onChange={(e) => handleInputChange('ctaBackgroundImage', e.target.value)}
                      />
                    </div>
                    <div className="case-study-form-group">
                      <label className="case-study-label" htmlFor="ctaButtonLabel">
                        Button Label
                      </label>
                      <input
                        id="ctaButtonLabel"
                        className="case-study-input"
                        placeholder="Schedule a Consultation"
                        value={caseStudyData.ctaButtonLabel}
                        onChange={(e) => handleInputChange('ctaButtonLabel', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <div className="case-study-preview-button">
              <Button className="case-study-preview-btn" onClick={() => setActiveTab('preview')}>
                Submit
              </Button>
            </div>
          </div>
        </div>

        <div className={`case-study-tab-content ${activeTab === 'preview' ? 'active' : ''}`}>
          <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
            <div className="case-study-card-section">
              <div className="case-study-card-header">
                <h2 className="case-study-card-title">Case Study Preview</h2>
                <p className="case-study-card-subtitle">
                  Review the information entered to ensure the story flows cohesively.
                </p>
              </div>
              <div className="case-study-card-body">
                <div className="case-study-preview">
                  <section className="case-study-preview-section">
                    <h3>Overview</h3>
                    <h4>{caseStudyData.heroTitle || 'Case study title not set'}</h4>
                    <p>{caseStudyData.heroSubtitle || 'Add a summary for this case study.'}</p>
                    <div className="case-study-preview-meta">
                      <span>
                        {caseStudyData.showLikes ? 'Likes displayed' : 'Likes hidden'}
                      </span>
                      <span>{caseStudyData.category || 'Category TBD'}</span>
                      <span>
                        {caseStudyData.publishedDate
                          ? caseStudyData.publishedDate
                          : 'Publish date not set'}
                      </span>
                      <span>
                        {caseStudyData.featured ? 'Featured case study' : 'Standard case study'}
                      </span>
                      <span>{summaryStats.tocCount} table of contents items</span>
                    </div>
                  </section>

                  <section className="case-study-preview-section">
                    <h3>Progress Section</h3>
                    <p className="case-study-preview-tag">
                      {caseStudyData.progressTag || 'Progress Tag'}
                    </p>
                    <h4>{caseStudyData.progressTitle || 'Progress section title missing'}</h4>
                    <p>
                      {caseStudyData.progressDescription ||
                        'Add details about the project progression.'}
                    </p>
                    <div className="case-study-preview-meta">
                      <span>{summaryStats.metricsCount} metrics configured</span>
                      <span>
                        {caseStudyData.progressBackgroundVideo
                          ? 'Background video set'
                          : 'No background video'}
                      </span>
                    </div>
                  </section>

                  <section className="case-study-preview-section">
                    <h3>About the Client</h3>
                    <p className="case-study-preview-tag">
                      {caseStudyData.clientTag || 'Client Tag'}
                    </p>
                    <h4>{caseStudyData.clientName || 'Client name missing'}</h4>
                    <p>
                      {caseStudyData.clientDescription ||
                        'Describe the client and their background.'}
                    </p>
                  </section>

                  <section className="case-study-preview-section">
                    <h3>Challenges & Approach</h3>
                    <p className="case-study-preview-meta">
                      {summaryStats.challengeCount} challenges • {summaryStats.approachCount}{' '}
                      approaches
                    </p>
                  </section>

                  <section className="case-study-preview-section">
                    <h3>Testimonial</h3>
                    <h4>{caseStudyData.testimonialTitle || 'Testimonial title missing'}</h4>
                    <blockquote>
                      {caseStudyData.testimonialQuote || 'Add a testimonial quote here.'}
                    </blockquote>
                    <p className="case-study-preview-meta">
                      {caseStudyData.testimonialAuthor || 'Author name'}
                      {caseStudyData.testimonialAuthorInfo
                        ? ` — ${caseStudyData.testimonialAuthorInfo}`
                        : ''}
                    </p>
                  </section>

                  <section className="case-study-preview-section">
                    <h3>Recent Blogs</h3>
                    <p className="case-study-preview-meta">
                      {summaryStats.recentBlogCount} blog entries listed
                    </p>
                  </section>

                  <section className="case-study-preview-section">
                    <h3>Contact Section</h3>
                    <p className="case-study-preview-tag">
                      {caseStudyData.contactTag || 'Contact Tag'}
                    </p>
                    <h4>{caseStudyData.contactTitle || 'Contact title missing'}</h4>
                    <p className="case-study-preview-meta">
                      {summaryStats.formFieldCount} form fields configured
                    </p>
                  </section>

                  <section className="case-study-preview-section">
                    <h3>Final CTA</h3>
                    <h4>{caseStudyData.ctaTitle || 'CTA title not set'}</h4>
                    <p>{caseStudyData.ctaDescription || 'Add a CTA description.'}</p>
                    <p className="case-study-preview-meta">
                      Button:{' '}
                      {caseStudyData.ctaButtonLabel
                        ? caseStudyData.ctaButtonLabel
                        : 'CTA button label missing'}
                    </p>
                  </section>
                </div>
                <div className="case-study-preview-actions">
                  <Button onClick={() => setActiveTab('form')}>Back to Form</Button>
                  <Button variant="secondary" onClick={() => setActiveTab('export')}>
                    View JSON
                  </Button>
                </div>
              </div>
            </div>
          </Squircle>
        </div>

        <div className={`case-study-tab-content ${activeTab === 'export' ? 'active' : ''}`}>
          <Squircle cornerRadius={24} cornerSmoothing={1} className="case-study-card">
            <div className="case-study-card-section">
              <div className="case-study-card-header">
                <h2 className="case-study-card-title">Case Study JSON Payload</h2>
                <p className="case-study-card-subtitle">
                  Copy this JSON output to integrate the case study data with your backend or CMS.
                </p>
              </div>
              <div className="case-study-card-body">
                <pre className="case-study-export-pre">
                  {JSON.stringify(caseStudyData, null, 2)}
                </pre>
                <div className="case-study-preview-actions">
                  <Button onClick={() => setActiveTab('form')}>Back to Form</Button>
                  <Button variant="secondary" onClick={() => setActiveTab('preview')}>
                    Preview Case Study
                  </Button>
                </div>
              </div>
            </div>
          </Squircle>
        </div>
      </div>
    </div>
  );
};

export default CreateCaseStudy;

