import { API_BASE_URL } from '../config';

export async function createBlog(postData) {
  const response = await fetch(`${API_BASE_URL}/api/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    const errorBody = await safeParseJson(response);
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

export async function updateBlog(blogId, postData) {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    const errorBody = await safeParseJson(response);
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

export async function getBlogById(blogId) {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}`);
  if (!response.ok) {
    const errorBody = await safeParseJson(response);
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

export async function getBlogs() {
  const response = await fetch(`${API_BASE_URL}/api/blogs`);
  if (!response.ok) {
    const errorBody = await safeParseJson(response);
    const message = errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

export async function deleteBlog(blogId) {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${blogId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorBody = await safeParseJson(response);
    const message =
      errorBody?.error || errorBody?.message || `Request failed with ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

export function extractBlogId(result) {
  if (!result || typeof result !== 'object') return null;
  // Try common shapes: { _id }, { id }, { blog: { _id } }, { data: { _id } }
  return (
    result._id ||
    result.id ||
    result?.blog?._id ||
    result?.blog?.id ||
    result?.data?._id ||
    result?.data?.id ||
    null
  );
}

async function safeParseJson(resp) {
  try {
    return await resp.json();
  } catch {
    return null;
  }
}


