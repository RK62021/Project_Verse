// Full API service for backend communication
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Core API request helper
 * - Automatically handles JSON vs FormData
 * - Sends cookies
 * - Handles errors cleanly
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    ...options.headers,
  };

  // ✅ Only set Content-Type for JSON bodies
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    credentials: 'include', // send cookies
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    let data = null;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const message =
        data?.message ||
        data?.error ||
        (typeof data === 'string' ? data : `HTTP ${response.status}`);
      throw new Error(message);
    }

    return data;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Network error occurred');
  }
}

/* =========================
   AUTH API
========================= */
export const authAPI = {
  login(email, password) {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register(name, email, password) {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  logout() {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  verify() {
    return apiRequest('/auth/verify', {
      method: 'GET',
    });
  },
};

/* =========================
   PROFILE API
========================= */
export const profileAPI = {
  getProfile() {
    return apiRequest('/profile', { method: 'GET' });
  },

  updateProfile(profileData) {
    return apiRequest('/profile/createOrUpdateProfile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  },

  uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    return apiRequest('/profile/uploadAvatar', {
      method: 'POST',
      body: formData, // ❗ no headers here
    });
  },
};

/* =========================
   PROJECTS API
========================= */
export const projectsAPI = {
  getAllProjects(params = {}) {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/projects${query ? `?${query}` : ''}`, {
      method: 'GET',
    });
  },

  getProjectById(id) {
    return apiRequest(`/projects/${id}`, { method: 'GET' });
  },

  getProjectsByUserId(userId) {
    return apiRequest(`/projects/user/${userId}`, { method: 'GET' });
  },

  createProject(projectData) {
    const formData = new FormData();

    Object.entries(projectData).forEach(([key, value]) => {
      if (!value) return;

      if (key === 'projectImage') {
        formData.append(key, value);
      } else if (Array.isArray(value) || typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    return apiRequest('/projects', {
      method: 'POST',
      body: formData,
    });
  },

  updateProject(id, projectData) {
    return apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },

  deleteProject(id) {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    });
  },

  toggleLike(projectId) {
    return apiRequest(`/projects/${projectId}/like`, {
      method: 'POST',
    });
  },

  addView(projectId) {
    return apiRequest(`/projects/${projectId}/view`, {
      method: 'POST',
    });
  },
};

export default apiRequest;
