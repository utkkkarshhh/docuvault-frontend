import axios from "axios"
import { apiEndpoints } from "@/constants/constants"
import { responseMessages } from "@/constants/messages"
import { handleApiError, getAuthHeaders } from "@/utils/apiHelper"

/**
 * Get user profile details
 * @returns {Promise} - API response with user details
 */
export const getUserDetails = async () => {
  try {
    const response = await axios.get(apiEndpoints.getUserDetails, {
      headers: getAuthHeaders(),
    })
    return {
      success: true,
      message: responseMessages.general.success,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.user.detailsLoadError)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}

/**
 * Update user profile details
 * @param {Object} payload - Updated user details
 * @returns {Promise} - API response
 */
export const updateUserDetails = async (payload) => {
  try {
    const response = await axios.patch(apiEndpoints.updateUserDetails, payload, {
      headers: getAuthHeaders(),
    })
    return {
      success: true,
      message: responseMessages.user.profileUpdateSuccess,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.user.profileUpdateError)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}

/**
 * Update user password
 * @param {Object} payload - Old password and new password
 * @returns {Promise} - API response
 */
export const updateUserPassword = async (payload) => {
  try {
    const response = await axios.patch(apiEndpoints.updateUserPassword, payload, {
      headers: getAuthHeaders(),
    })
    return {
      success: true,
      message: responseMessages.user.passwordChangeSuccess,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.user.passwordChangeError)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}

/**
 * Delete user account
 * @param {Object} payload - Password for confirmation
 * @returns {Promise} - API response
 */
export const deleteUserAccount = async (payload) => {
  try {
    const response = await axios.delete(apiEndpoints.deleteUser, {
      headers: getAuthHeaders(),
      data: payload,
    })
    return {
      success: true,
      message: responseMessages.user.accountDeleteSuccess,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.user.accountDeleteError)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}

/**
 * Update user avatar/profile picture
 * @param {FormData} formData - Form data with avatar file
 * @returns {Promise} - API response
 */
export const updateUserAvatar = async (formData) => {
  try {
    const response = await axios.patch(apiEndpoints.updateUserDetails, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    })
    return {
      success: true,
      message: responseMessages.user.avatarUpdateSuccess,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.user.avatarUpdateError)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}
