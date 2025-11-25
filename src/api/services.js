import { API_BASE_URL } from '../config';

/**
 * Create a new service
 * @param {Object} postData - Service data
 * @returns {Promise<Object>} Created service
 */
export async function createService(postData) {
  const response = await fetch(`${API_BASE_URL}/api/services`, {
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
 * Update an existing service
 * @param {string|number} id - Service ID
 * @param {Object} postData - Updated service data
 * @returns {Promise<Object>} Updated service
 */
export async function updateService(id, postData) {
  const response = await fetch(`${API_BASE_URL}/api/services/${id}`, {
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
 * Get a service by ID
 * @param {string|number} id - Service ID
 * @returns {Promise<Object>} Service data
 */
export async function getServiceById(id) {
  const response = await fetch(`${API_BASE_URL}/api/services/${id}`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

/**
 * Get all services
 * @returns {Promise<Array>} Array of services
 */
export async function getServices() {
  const response = await fetch(`${API_BASE_URL}/api/services`);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

/**
 * Delete a service
 * @param {string|number} id - Service ID
 * @returns {Promise<Object>} Deletion confirmation
 */
export async function deleteService(id) {
  const response = await fetch(`${API_BASE_URL}/api/services/${id}`, {
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
 * Extract service ID from API response
 * @param {Object} result - API response
 * @returns {string|number|null} Service ID
 */
export function extractServiceId(result) {
  if (!result || typeof result !== 'object') return null;
  return result._id || result.id || result?.service?._id || result?.data?._id || result?.data?.id || null;
}

