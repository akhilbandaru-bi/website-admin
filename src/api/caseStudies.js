import { API_BASE_URL } from '../config';

/**
 * Create a new case study
 * @param {Object} postData - Case study data
 * @returns {Promise<Object>} Created case study
 */
export async function createCaseStudy(postData) {
  const response = await fetch(`${API_BASE_URL}/api/case-studies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

/**
 * Update an existing case study
 * @param {string|number} id - Case study ID
 * @param {Object} postData - Updated case study data
 * @returns {Promise<Object>} Updated case study
 */
export async function updateCaseStudy(id, postData) {
  const response = await fetch(`${API_BASE_URL}/api/case-studies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

/**
 * Get a case study by ID
 * @param {string|number} id - Case study ID
 * @returns {Promise<Object>} Case study data
 */
export async function getCaseStudyById(id) {
  const response = await fetch(`${API_BASE_URL}/api/case-studies/${id}`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

/**
 * Get all case studies
 * @returns {Promise<Array>} Array of case studies
 */
export async function getCaseStudies() {
  const response = await fetch(`${API_BASE_URL}/api/case-studies`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

/**
 * Delete a case study
 * @param {string|number} id - Case study ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export async function deleteCaseStudy(id) {
  const response = await fetch(`${API_BASE_URL}/api/case-studies/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

/**
 * Extract case study ID from API response
 * @param {Object} result - API response
 * @returns {string|number|null} Case study ID
 */
export function extractCaseStudyId(result) {
  if (!result || typeof result !== 'object') return null;
  return result._id || result.id || result?.caseStudy?._id || result?.data?._id || result?.data?.id || null;
}

