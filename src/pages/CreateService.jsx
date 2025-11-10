import React, { useMemo, useState } from 'react';
import { Squircle } from '@squircle-js/react';
import Button from '../components/ui/Button';
import './PageTemplate1.css';
import './CreateService.css';

const heroIconTemplate = { iconImage: '', iconLabel: '' };
const serviceTemplate = {
  title: '',
  image: '',
  description: '',
  order: '',
  link: '',
};
const supportFeatureTemplate = { title: '', description: '' };
const supportStatTemplate = { label: '', value: '' };
const faqTemplate = { question: '', answer: '', order: '' };
const capabilityTemplate = { title: '', description: '', icon: '' };

const initialServiceData = {
  heroTag: '',
  heroTitle: '',
  heroSubtitle: '',
  heroBackgroundImage: '',
  heroIcons: [heroIconTemplate],

  servicesTag: '',
  servicesTitle: '',
  servicesDescription: '',
  servicesList: [serviceTemplate],

  supportTag: '',
  supportTitle: '',
  supportDescription: '',
  supportImage: '',
  supportCtaLabel: '',
  supportCtaPlaceholder: '',
  supportFeatures: [supportFeatureTemplate],
  supportStats: [supportStatTemplate],

  faqTag: '',
  faqTitle: '',
  faqDescription: '',
  faqImage: '',
  faqItems: [faqTemplate],

  capabilitiesTag: '',
  capabilitiesTitle: '',
  capabilitiesDescription: '',
  capabilitiesImage: '',
  capabilityCards: [capabilityTemplate],

  ctaTitle: '',
  ctaDescription: '',
  ctaBackgroundImage: '',
  ctaButtonLabel: '',
};

const CreateService = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [serviceData, setServiceData] = useState(initialServiceData);

  const handleInputChange = (field, value) => {
    setServiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleListChange = (listName, index, field, value) => {
    setServiceData((prev) => {
      const updated = [...prev[listName]];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return { ...prev, [listName]: updated };
    });
  };

  const handleAddListItem = (listName, template) => {
    setServiceData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], { ...template }],
    }));
  };

  const handleRemoveListItem = (listName, index) => {
    setServiceData((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, idx) => idx !== index),
    }));
  };

  const summaryStats = useMemo(
    () => ({
      heroIcons: serviceData.heroIcons.filter(
        (icon) => icon.iconImage || icon.iconLabel,
      ).length,
      servicesCount: serviceData.servicesList.filter(
        (service) => service.title || service.description,
      ).length,
      featuresCount: serviceData.supportFeatures.filter(
        (feature) => feature.title || feature.description,
      ).length,
      statsCount: serviceData.supportStats.filter(
        (stat) => stat.label || stat.value,
      ).length,
      faqCount: serviceData.faqItems.filter(
        (item) => item.question || item.answer,
      ).length,
      capabilityCount: serviceData.capabilityCards.filter(
        (card) => card.title || card.description,
      ).length,
    }),
    [serviceData],
  );

  return (
    <div className="page-template service-create">
      <div className="page-header service-create-header">
        <div className="page-header-info">
          <h1 className="page-title">Create Service</h1>
          <p className="page-subtitle">
            Configure a new service offering, add descriptions, pricing, and supporting assets.
          </p>
        </div>
      </div>

      <div className="service-tabs">
        <div className={`service-tab-content ${activeTab === 'form' ? 'active' : ''}`}>
          <div className="service-form-content">
            <Squircle cornerRadius={24} cornerSmoothing={1} className="service-card">
              <div className="service-card-section">
                <div className="service-card-header">
                  <h2 className="service-card-title">Hero Section</h2>
                  <p className="service-card-subtitle">
                    Define the hero banner that greets visitors on the services page.
                  </p>
                </div>
                <div className="service-card-body">
                  <div className="service-form-grid service-form-grid-two">
                    <div className="service-form-group">
                      <label htmlFor="heroTag" className="service-label">
                        Tag
                      </label>
                      <input
                        id="heroTag"
                        className="service-input"
                        placeholder="Solutions"
                        value={serviceData.heroTag}
                        onChange={(e) => handleInputChange('heroTag', e.target.value)}
                      />
                    </div>
                    <div className="service-form-group">
                      <label htmlFor="heroBackgroundImage" className="service-label">
                        Background Image URL
                      </label>
                      <input
                        id="heroBackgroundImage"
                        className="service-input"
                        placeholder="https://..."
                        value={serviceData.heroBackgroundImage}
                        onChange={(e) =>
                          handleInputChange('heroBackgroundImage', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="heroTitle" className="service-label">
                      Title
                    </label>
                    <input
                      id="heroTitle"
                      className="service-input"
                      placeholder="Powering Reliable Infrastructure"
                      value={serviceData.heroTitle}
                      onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="heroSubtitle" className="service-label">
                      Subtitle
                    </label>
                    <textarea
                      id="heroSubtitle"
                      className="service-textarea"
                      rows={3}
                      placeholder="Craft a compelling summary that highlights the value of your services."
                      value={serviceData.heroSubtitle}
                      onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <div className="service-list-header">
                      <span className="service-label">Hero Icons</span>
                      <button
                        type="button"
                        className="service-inline-btn"
                        onClick={() => handleAddListItem('heroIcons', heroIconTemplate)}
                      >
                        + Add Icon
                      </button>
                    </div>
                    <div className="service-list">
                      {serviceData.heroIcons.map((icon, index) => (
                        <div className="service-list-item" key={`hero-icon-${index}`}>
                          <div className="service-form-grid service-form-grid-two">
                            <div className="service-form-group">
                              <label className="service-label">Icon Image URL</label>
                              <input
                                className="service-input"
                                placeholder="https://..."
                                value={icon.iconImage}
                                onChange={(e) =>
                                  handleListChange('heroIcons', index, 'iconImage', e.target.value)
                                }
                              />
                            </div>
                            <div className="service-form-group">
                              <label className="service-label">Icon Label</label>
                              <input
                                className="service-input"
                                placeholder="24/7 Support"
                                value={icon.iconLabel}
                                onChange={(e) =>
                                  handleListChange('heroIcons', index, 'iconLabel', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          {serviceData.heroIcons.length > 1 && (
                            <button
                              type="button"
                              className="service-remove-btn"
                              onClick={() => handleRemoveListItem('heroIcons', index)}
                            >
                              Remove Icon
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="service-card">
              <div className="service-card-section">
                <div className="service-card-header">
                  <h2 className="service-card-title">Services Section</h2>
                  <p className="service-card-subtitle">
                    Showcase your core services with descriptions and supporting links.
                  </p>
                </div>
                <div className="service-card-body">
                  <div className="service-form-group">
                    <label htmlFor="servicesTag" className="service-label">
                      Tag
                    </label>
                    <input
                      id="servicesTag"
                      className="service-input"
                      placeholder="Our Services"
                      value={serviceData.servicesTag}
                      onChange={(e) => handleInputChange('servicesTag', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="servicesTitle" className="service-label">
                      Section Title
                    </label>
                    <input
                      id="servicesTitle"
                      className="service-input"
                      placeholder="Comprehensive Power Solutions"
                      value={serviceData.servicesTitle}
                      onChange={(e) => handleInputChange('servicesTitle', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="servicesDescription" className="service-label">
                      Section Description
                    </label>
                    <textarea
                      id="servicesDescription"
                      className="service-textarea"
                      rows={3}
                      placeholder="Describe what this services section will cover."
                      value={serviceData.servicesDescription}
                      onChange={(e) =>
                        handleInputChange('servicesDescription', e.target.value)
                      }
                    />
                  </div>

                  <div className="service-form-group">
                    <div className="service-list-header">
                      <span className="service-label">Services</span>
                      <button
                        type="button"
                        className="service-inline-btn"
                        onClick={() => handleAddListItem('servicesList', serviceTemplate)}
                      >
                        + Add Service
                      </button>
                    </div>
                    <div className="service-list">
                      {serviceData.servicesList.map((service, index) => (
                        <div className="service-list-item" key={`service-${index}`}>
                          <div className="service-form-grid service-form-grid-two">
                            <div className="service-form-group">
                              <label className="service-label">Service Title</label>
                              <input
                                className="service-input"
                                placeholder="Grid Modernization"
                                value={service.title}
                                onChange={(e) =>
                                  handleListChange('servicesList', index, 'title', e.target.value)
                                }
                              />
                            </div>
                            <div className="service-form-group">
                              <label className="service-label">Display Order</label>
                              <input
                                className="service-input"
                                placeholder="1"
                                value={service.order}
                                onChange={(e) =>
                                  handleListChange('servicesList', index, 'order', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="service-form-group">
                            <label className="service-label">Service Image URL</label>
                            <input
                              className="service-input"
                              placeholder="https://..."
                              value={service.image}
                              onChange={(e) =>
                                handleListChange('servicesList', index, 'image', e.target.value)
                              }
                            />
                          </div>
                          <div className="service-form-group">
                            <label className="service-label">Service Description</label>
                            <textarea
                              className="service-textarea"
                              rows={3}
                              placeholder="Give an overview of this service."
                              value={service.description}
                              onChange={(e) =>
                                handleListChange(
                                  'servicesList',
                                  index,
                                  'description',
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div className="service-form-group">
                            <label className="service-label">Service Link</label>
                            <input
                              className="service-input"
                              placeholder="https://..."
                              value={service.link}
                              onChange={(e) =>
                                handleListChange('servicesList', index, 'link', e.target.value)
                              }
                            />
                          </div>
                          {serviceData.servicesList.length > 1 && (
                            <button
                              type="button"
                              className="service-remove-btn"
                              onClick={() => handleRemoveListItem('servicesList', index)}
                            >
                              Remove Service
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="service-card">
              <div className="service-card-section">
                <div className="service-card-header">
                  <h2 className="service-card-title">Support Section</h2>
                  <p className="service-card-subtitle">
                    Highlight supporting resources, CTAs, and proof points.
                  </p>
                </div>
                <div className="service-card-body">
                  <div className="service-form-grid service-form-grid-two">
                    <div className="service-form-group">
                      <label htmlFor="supportTag" className="service-label">
                        Tag
                      </label>
                      <input
                        id="supportTag"
                        className="service-input"
                        placeholder="Support"
                        value={serviceData.supportTag}
                        onChange={(e) => handleInputChange('supportTag', e.target.value)}
                      />
                    </div>
                    <div className="service-form-group">
                      <label htmlFor="supportImage" className="service-label">
                        Left Image URL
                      </label>
                      <input
                        id="supportImage"
                        className="service-input"
                        placeholder="https://..."
                        value={serviceData.supportImage}
                        onChange={(e) => handleInputChange('supportImage', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="supportTitle" className="service-label">
                      Section Title
                    </label>
                    <input
                      id="supportTitle"
                      className="service-input"
                      placeholder="Expert Support at Every Step"
                      value={serviceData.supportTitle}
                      onChange={(e) => handleInputChange('supportTitle', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="supportDescription" className="service-label">
                      Section Description
                    </label>
                    <textarea
                      id="supportDescription"
                      className="service-textarea"
                      rows={3}
                      placeholder="Explain how your team supports customers throughout the service lifecycle."
                      value={serviceData.supportDescription}
                      onChange={(e) => handleInputChange('supportDescription', e.target.value)}
                    />
                  </div>

                  <div className="service-form-grid service-form-grid-two">
                    <div className="service-form-group">
                      <label htmlFor="supportCtaLabel" className="service-label">
                        CTA Button Label
                      </label>
                      <input
                        id="supportCtaLabel"
                        className="service-input"
                        placeholder="Talk to an Expert"
                        value={serviceData.supportCtaLabel}
                        onChange={(e) => handleInputChange('supportCtaLabel', e.target.value)}
                      />
                    </div>
                    <div className="service-form-group">
                      <label htmlFor="supportCtaPlaceholder" className="service-label">
                        CTA Input Placeholder
                      </label>
                      <input
                        id="supportCtaPlaceholder"
                        className="service-input"
                        placeholder="Enter your email"
                        value={serviceData.supportCtaPlaceholder}
                        onChange={(e) => handleInputChange('supportCtaPlaceholder', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="service-form-group">
                    <div className="service-list-header">
                      <span className="service-label">Features</span>
                      <button
                        type="button"
                        className="service-inline-btn"
                        onClick={() =>
                          handleAddListItem('supportFeatures', supportFeatureTemplate)
                        }
                      >
                        + Add Feature
                      </button>
                    </div>
                    <div className="service-list">
                      {serviceData.supportFeatures.map((feature, index) => (
                        <div className="service-list-item" key={`feature-${index}`}>
                          <div className="service-form-group">
                            <label className="service-label">Feature Title</label>
                            <input
                              className="service-input"
                              placeholder="Dedicated Account Manager"
                              value={feature.title}
                              onChange={(e) =>
                                handleListChange('supportFeatures', index, 'title', e.target.value)
                              }
                            />
                          </div>
                          <div className="service-form-group">
                            <label className="service-label">Feature Description</label>
                            <textarea
                              className="service-textarea"
                              rows={2}
                              placeholder="Describe the value this feature provides."
                              value={feature.description}
                              onChange={(e) =>
                                handleListChange(
                                  'supportFeatures',
                                  index,
                                  'description',
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          {serviceData.supportFeatures.length > 1 && (
                            <button
                              type="button"
                              className="service-remove-btn"
                              onClick={() => handleRemoveListItem('supportFeatures', index)}
                            >
                              Remove Feature
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="service-form-group">
                    <div className="service-list-header">
                      <span className="service-label">Statistics</span>
                      <button
                        type="button"
                        className="service-inline-btn"
                        onClick={() => handleAddListItem('supportStats', supportStatTemplate)}
                      >
                        + Add Stat
                      </button>
                    </div>
                    <div className="service-list">
                      {serviceData.supportStats.map((stat, index) => (
                        <div className="service-list-item" key={`stat-${index}`}>
                          <div className="service-form-grid service-form-grid-two">
                            <div className="service-form-group">
                              <label className="service-label">Stat Label</label>
                              <input
                                className="service-input"
                                placeholder="Years of Experience"
                                value={stat.label}
                                onChange={(e) =>
                                  handleListChange('supportStats', index, 'label', e.target.value)
                                }
                              />
                            </div>
                            <div className="service-form-group">
                              <label className="service-label">Stat Value</label>
                              <input
                                className="service-input"
                                placeholder="25+"
                                value={stat.value}
                                onChange={(e) =>
                                  handleListChange('supportStats', index, 'value', e.target.value)
                                }
                              />
                            </div>
                          </div>
                          {serviceData.supportStats.length > 1 && (
                            <button
                              type="button"
                              className="service-remove-btn"
                              onClick={() => handleRemoveListItem('supportStats', index)}
                            >
                              Remove Stat
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="service-card">
              <div className="service-card-section">
                <div className="service-card-header">
                  <h2 className="service-card-title">FAQ Section</h2>
                  <p className="service-card-subtitle">
                    Address common questions to help your audience make decisions faster.
                  </p>
                </div>
                <div className="service-card-body">
                  <div className="service-form-grid service-form-grid-two">
                    <div className="service-form-group">
                      <label htmlFor="faqTag" className="service-label">
                        Tag
                      </label>
                      <input
                        id="faqTag"
                        className="service-input"
                        placeholder="FAQ"
                        value={serviceData.faqTag}
                        onChange={(e) => handleInputChange('faqTag', e.target.value)}
                      />
                    </div>
                    <div className="service-form-group">
                      <label htmlFor="faqImage" className="service-label">
                        FAQ Image URL
                      </label>
                      <input
                        id="faqImage"
                        className="service-input"
                        placeholder="https://..."
                        value={serviceData.faqImage}
                        onChange={(e) => handleInputChange('faqImage', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="faqTitle" className="service-label">
                      Section Title
                    </label>
                    <input
                      id="faqTitle"
                      className="service-input"
                      placeholder="Frequently Asked Questions"
                      value={serviceData.faqTitle}
                      onChange={(e) => handleInputChange('faqTitle', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="faqDescription" className="service-label">
                      Section Description
                    </label>
                    <textarea
                      id="faqDescription"
                      className="service-textarea"
                      rows={3}
                      placeholder="Provide context for the FAQ section."
                      value={serviceData.faqDescription}
                      onChange={(e) => handleInputChange('faqDescription', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <div className="service-list-header">
                      <span className="service-label">FAQ Items</span>
                      <button
                        type="button"
                        className="service-inline-btn"
                        onClick={() => handleAddListItem('faqItems', faqTemplate)}
                      >
                        + Add FAQ
                      </button>
                    </div>
                    <div className="service-list">
                      {serviceData.faqItems.map((faq, index) => (
                        <div className="service-list-item" key={`faq-${index}`}>
                          <div className="service-form-group">
                            <label className="service-label">Question</label>
                            <input
                              className="service-input"
                              placeholder="How quickly can we deploy?"
                              value={faq.question}
                              onChange={(e) =>
                                handleListChange('faqItems', index, 'question', e.target.value)
                              }
                            />
                          </div>
                          <div className="service-form-group">
                            <label className="service-label">Answer</label>
                            <textarea
                              className="service-textarea"
                              rows={2}
                              placeholder="Provide a clear and concise answer."
                              value={faq.answer}
                              onChange={(e) =>
                                handleListChange('faqItems', index, 'answer', e.target.value)
                              }
                            />
                          </div>
                          <div className="service-form-group">
                            <label className="service-label">Display Order</label>
                            <input
                              className="service-input"
                              placeholder="1"
                              value={faq.order}
                              onChange={(e) =>
                                handleListChange('faqItems', index, 'order', e.target.value)
                              }
                            />
                          </div>
                          {serviceData.faqItems.length > 1 && (
                            <button
                              type="button"
                              className="service-remove-btn"
                              onClick={() => handleRemoveListItem('faqItems', index)}
                            >
                              Remove FAQ
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="service-card">
              <div className="service-card-section">
                <div className="service-card-header">
                  <h2 className="service-card-title">Core Capabilities</h2>
                  <p className="service-card-subtitle">
                    Emphasize the capabilities that make your organization stand out.
                  </p>
                </div>
                <div className="service-card-body">
                  <div className="service-form-group">
                    <label htmlFor="capabilitiesTag" className="service-label">
                      Tag
                    </label>
                    <input
                      id="capabilitiesTag"
                      className="service-input"
                      placeholder="Capabilities"
                      value={serviceData.capabilitiesTag}
                      onChange={(e) => handleInputChange('capabilitiesTag', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="capabilitiesTitle" className="service-label">
                      Section Title
                    </label>
                    <input
                      id="capabilitiesTitle"
                      className="service-input"
                      placeholder="Built for Performance & Reliability"
                      value={serviceData.capabilitiesTitle}
                      onChange={(e) => handleInputChange('capabilitiesTitle', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="capabilitiesDescription" className="service-label">
                      Section Description
                    </label>
                    <textarea
                      id="capabilitiesDescription"
                      className="service-textarea"
                      rows={3}
                      placeholder="Explain the overarching value of your capabilities."
                      value={serviceData.capabilitiesDescription}
                      onChange={(e) =>
                        handleInputChange('capabilitiesDescription', e.target.value)
                      }
                    />
                  </div>

                  <div className="service-form-group">
                    <label htmlFor="capabilitiesImage" className="service-label">
                      Section Image URL
                    </label>
                    <input
                      id="capabilitiesImage"
                      className="service-input"
                      placeholder="https://..."
                      value={serviceData.capabilitiesImage}
                      onChange={(e) => handleInputChange('capabilitiesImage', e.target.value)}
                    />
                  </div>

                  <div className="service-form-group">
                    <div className="service-list-header">
                      <span className="service-label">Capability Cards</span>
                      <button
                        type="button"
                        className="service-inline-btn"
                        onClick={() =>
                          handleAddListItem('capabilityCards', capabilityTemplate)
                        }
                      >
                        + Add Capability
                      </button>
                    </div>
                    <div className="service-list">
                      {serviceData.capabilityCards.map((card, index) => (
                        <div className="service-list-item" key={`capability-${index}`}>
                          <div className="service-form-group">
                            <label className="service-label">Capability Title</label>
                            <input
                              className="service-input"
                              placeholder="Grid Automation"
                              value={card.title}
                              onChange={(e) =>
                                handleListChange('capabilityCards', index, 'title', e.target.value)
                              }
                            />
                          </div>
                          <div className="service-form-group">
                            <label className="service-label">Capability Icon</label>
                            <input
                              className="service-input"
                              placeholder="https://..."
                              value={card.icon}
                              onChange={(e) =>
                                handleListChange('capabilityCards', index, 'icon', e.target.value)
                              }
                            />
                          </div>
                          <div className="service-form-group">
                            <label className="service-label">Capability Description</label>
                            <textarea
                              className="service-textarea"
                              rows={2}
                              placeholder="Summarize the capability benefits."
                              value={card.description}
                              onChange={(e) =>
                                handleListChange(
                                  'capabilityCards',
                                  index,
                                  'description',
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          {serviceData.capabilityCards.length > 1 && (
                            <button
                              type="button"
                              className="service-remove-btn"
                              onClick={() => handleRemoveListItem('capabilityCards', index)}
                            >
                              Remove Capability
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <Squircle cornerRadius={24} cornerSmoothing={1} className="service-card">
              <div className="service-card-section">
                <div className="service-card-header">
                  <h2 className="service-card-title">Final CTA</h2>
                  <p className="service-card-subtitle">
                    Close out the page with a strong call to action and supporting visuals.
                  </p>
                </div>
                <div className="service-card-body">
                  <div className="service-form-group">
                    <label htmlFor="ctaTitle" className="service-label">
                      CTA Title
                    </label>
                    <input
                      id="ctaTitle"
                      className="service-input"
                      placeholder="Ready to Modernize Your Infrastructure?"
                      value={serviceData.ctaTitle}
                      onChange={(e) => handleInputChange('ctaTitle', e.target.value)}
                    />
                  </div>
                  <div className="service-form-group">
                    <label htmlFor="ctaDescription" className="service-label">
                      CTA Description
                    </label>
                    <textarea
                      id="ctaDescription"
                      className="service-textarea"
                      rows={3}
                      placeholder="Encourage visitors to connect with your team."
                      value={serviceData.ctaDescription}
                      onChange={(e) => handleInputChange('ctaDescription', e.target.value)}
                    />
                  </div>
                  <div className="service-form-grid service-form-grid-two">
                    <div className="service-form-group">
                      <label htmlFor="ctaBackgroundImage" className="service-label">
                        Background Image URL
                      </label>
                      <input
                        id="ctaBackgroundImage"
                        className="service-input"
                        placeholder="https://..."
                        value={serviceData.ctaBackgroundImage}
                        onChange={(e) => handleInputChange('ctaBackgroundImage', e.target.value)}
                      />
                    </div>
                    <div className="service-form-group">
                      <label htmlFor="ctaButtonLabel" className="service-label">
                        Button Label
                      </label>
                      <input
                        id="ctaButtonLabel"
                        className="service-input"
                        placeholder="Schedule a Consultation"
                        value={serviceData.ctaButtonLabel}
                        onChange={(e) => handleInputChange('ctaButtonLabel', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Squircle>

            <div className="service-preview-button">
              <Button className="service-preview-btn" onClick={() => setActiveTab('preview')}>
                Submit
              </Button>
            </div>
          </div>
        </div>

        <div className={`service-tab-content ${activeTab === 'preview' ? 'active' : ''}`}>
          <Squircle cornerRadius={24} cornerSmoothing={1} className="service-card">
            <div className="service-card-section">
              <div className="service-card-header">
                <h2 className="service-card-title">Service Preview</h2>
                <p className="service-card-subtitle">
                  Review the structured summary of your new service page before publishing.
                </p>
              </div>
              <div className="service-card-body">
                <div className="service-preview">
                  <section className="service-preview-section">
                    <h3>Hero</h3>
                    <p className="service-preview-tag">{serviceData.heroTag || 'Tag TBD'}</p>
                    <h4>{serviceData.heroTitle || 'Hero title not set'}</h4>
                    <p>{serviceData.heroSubtitle || 'Add a compelling hero subtitle.'}</p>
                    <div className="service-preview-meta">
                      <span>{summaryStats.heroIcons} hero icons</span>
                      <span>{serviceData.heroBackgroundImage ? 'Background set' : 'No background image'}</span>
                    </div>
                  </section>

                  <section className="service-preview-section">
                    <h3>Services</h3>
                    <p className="service-preview-tag">
                      {serviceData.servicesTag || 'Services Tag'}
                    </p>
                    <h4>{serviceData.servicesTitle || 'Services section title missing'}</h4>
                    <p>{serviceData.servicesDescription || 'Add a description for services.'}</p>
                    <ul className="service-preview-list">
                      {serviceData.servicesList.map((service, index) => (
                        <li key={`preview-service-${index}`}>
                          <strong>{service.title || `Service ${index + 1}`}</strong>
                          <span>{service.description || 'No description provided.'}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="service-preview-section">
                    <h3>Support</h3>
                    <p className="service-preview-tag">{serviceData.supportTag || 'Support Tag'}</p>
                    <h4>{serviceData.supportTitle || 'Support section title missing'}</h4>
                    <p>{serviceData.supportDescription || 'Add support description.'}</p>
                    <div className="service-preview-meta">
                      <span>{summaryStats.featuresCount} features</span>
                      <span>{summaryStats.statsCount} statistics</span>
                      <span>
                        CTA:{' '}
                        {serviceData.supportCtaLabel
                          ? serviceData.supportCtaLabel
                          : 'CTA label not set'}
                      </span>
                    </div>
                  </section>

                  <section className="service-preview-section">
                    <h3>FAQ</h3>
                    <p className="service-preview-tag">{serviceData.faqTag || 'FAQ Tag'}</p>
                    <h4>{serviceData.faqTitle || 'FAQ section title missing'}</h4>
                    <p>{serviceData.faqDescription || 'Add FAQ description.'}</p>
                    <p className="service-preview-meta">
                      {summaryStats.faqCount} FAQs configured
                    </p>
                  </section>

                  <section className="service-preview-section">
                    <h3>Core Capabilities</h3>
                    <p className="service-preview-tag">
                      {serviceData.capabilitiesTag || 'Capabilities Tag'}
                    </p>
                    <h4>
                      {serviceData.capabilitiesTitle || 'Capabilities section title missing'}
                    </h4>
                    <p>
                      {serviceData.capabilitiesDescription || 'Add capabilities description.'}
                    </p>
                    <p className="service-preview-meta">
                      {summaryStats.capabilityCount} capability cards
                    </p>
                  </section>

                  <section className="service-preview-section">
                    <h3>Final CTA</h3>
                    <h4>{serviceData.ctaTitle || 'CTA title not set'}</h4>
                    <p>{serviceData.ctaDescription || 'Add CTA description.'}</p>
                    <p className="service-preview-meta">
                      Button:{' '}
                      {serviceData.ctaButtonLabel
                        ? serviceData.ctaButtonLabel
                        : 'CTA button label missing'}
                    </p>
                  </section>
                </div>
                <div className="service-preview-actions">
                  <Button onClick={() => setActiveTab('form')}>Back to Form</Button>
                  <Button variant="secondary" onClick={() => setActiveTab('export')}>
                    View JSON
                  </Button>
                </div>
              </div>
            </div>
          </Squircle>
        </div>

        <div className={`service-tab-content ${activeTab === 'export' ? 'active' : ''}`}>
          <Squircle cornerRadius={24} cornerSmoothing={1} className="service-card">
            <div className="service-card-section">
              <div className="service-card-header">
                <h2 className="service-card-title">Service JSON Payload</h2>
                <p className="service-card-subtitle">
                  Copy this JSON output to send the payload to your backend or CMS.
                </p>
              </div>
              <div className="service-card-body">
                <pre className="service-export-pre">
                  {JSON.stringify(serviceData, null, 2)}
                </pre>
                <div className="service-preview-actions">
                  <Button onClick={() => setActiveTab('form')}>Back to Form</Button>
                  <Button variant="secondary" onClick={() => setActiveTab('preview')}>
                    Preview Service
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

export default CreateService;