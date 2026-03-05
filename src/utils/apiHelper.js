import { responseMessages } from "@/constants/messages"

/**
 * Handle API errors with fallback messages
 * @param {Error} error - The error object from axios or API call
 * @param {string} fallbackMessage - Fallback message if error message is not found
 * @returns {string} - Error message to display to user
 */
export const handleApiError = (error, fallbackMessage = responseMessages.general.error) => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }

  if (error.message === "Network Error") {
    return responseMessages.general.networkError
  }

  if (error.response?.status === 401) {
    return responseMessages.auth.unauthorizedAccess
  }

  if (error.response?.status === 403) {
    return responseMessages.auth.unauthorizedAccess
  }

  if (error.response?.status === 404) {
    return responseMessages.general.noResults
  }

  if (error.response?.status === 500) {
    return responseMessages.general.somethingWentWrong
  }

  return fallbackMessage
}

/**
 * Format API response with consistent structure
 * @param {*} data - Response data
 * @param {string} successMessage - Success message to include
 * @returns {Object} - Formatted response object
 */
export const formatApiResponse = (data, successMessage = responseMessages.general.success) => {
  return {
    success: true,
    message: successMessage,
    data: data,
  }
}

/**
 * Format API error response with consistent structure
 * @param {string} errorMessage - Error message
 * @param {*} error - Error details
 * @returns {Object} - Formatted error response object
 */
export const formatApiErrorResponse = (errorMessage, error = null) => {
  return {
    success: false,
    message: errorMessage,
    error: error,
  }
}

/**
 * Validate required fields in payload
 * @param {Object} payload - Payload to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - Validation result with success and errors
 */
export const validatePayload = (payload, requiredFields = []) => {
  const errors = {}

  requiredFields.forEach((field) => {
    if (!payload[field] || payload[field]?.toString().trim() === "") {
      errors[field] = `${field} is required`
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors,
  }
}

/**
 * Get authorization header with token
 * @returns {Object} - Headers object with authorization token
 */
export const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken")
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

/**
 * Check if token exists and is valid
 * @returns {boolean} - True if token exists
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken")
}

/**
 * Store authentication token
 * @param {string} token - Authentication token
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token)
  }
}

/**
 * Clear authentication token
 */
export const clearAuthToken = () => {
  localStorage.removeItem("authToken")
}
