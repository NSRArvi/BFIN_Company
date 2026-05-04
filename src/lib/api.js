const BASE_URL = import.meta.env.VITE_ECOM_BASE_URL || "";

/**
 * Core fetch wrapper
 * @param {string} url - Endpoint path (e.g. "/api/auth/login")
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<{ data: any, status: number, ok: boolean, error: string | null }>}
 */
const request = async (url, options = {}) => {
  const fullUrl = `${BASE_URL}${url}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Attach auth token if available
  const token = localStorage.getItem("token");
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    // Handle empty responses (e.g. 204 No Content)
    const contentType = response.headers.get("content-type");
    const data =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : null;

    if (!response.ok) {
      return {
        data: null,
        status: response.status,
        ok: false,
        error: data?.message || `Request failed with status ${response.status}`,
      };
    }

    return {
      data,
      status: response.status,
      ok: true,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      status: null,
      ok: false,
      error: err.message || "Network error. Please try again.",
    };
  }
};

/**
 * POST request
 * @param {string} url - Endpoint path
 * @param {object} payload - Request body
 * @param {object} headers - Optional extra headers
 */
export const post = (url, payload, headers = {}) =>
  request(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers,
  });

/**
 * GET request
 * @param {string} url - Endpoint path
 * @param {object} headers - Optional extra headers
 */
export const get = (url, headers = {}) =>
  request(url, {
    method: "GET",
    headers,
  });

/**
 * PUT request
 * @param {string} url - Endpoint path
 * @param {object} payload - Request body
 * @param {object} headers - Optional extra headers
 */
export const put = (url, payload, headers = {}) =>
  request(url, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers,
  });

/**
 * PATCH request
 * @param {string} url - Endpoint path
 * @param {object} payload - Request body
 * @param {object} headers - Optional extra headers
 */
export const patch = (url, payload, headers = {}) =>
  request(url, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers,
  });

/**
 * DELETE request
 * @param {string} url - Endpoint path
 * @param {object} headers - Optional extra headers
 */
export const del = (url, headers = {}) =>
  request(url, {
    method: "DELETE",
    headers,
  });

const api = { post, get, put, patch, del };

export default api;
