import axios from "axios"
import { apiEndpoints } from "@/constants/constants"
import { responseMessages } from "@/constants/messages"
import { handleApiError, getAuthHeaders } from "@/utils/apiHelper"

/**
 * Get all documents for the current user
 * @returns {Promise} - API response with documents list
 */
export const getAllUserDocuments = async () => {
  try {
    const response = await axios.get(apiEndpoints.getAllUserDocuments, {
      headers: getAuthHeaders(),
    })
    return {
      success: true,
      message: responseMessages.general.success,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.document.documentsLoadError)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}

/**
 * Upload a new document
 * @param {FormData} formData - Document file and metadata
 * @returns {Promise} - API response with uploaded document
 */
export const uploadDocument = async (formData) => {
  try {
    const response = await axios.post(apiEndpoints.uploadDocument, formData, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "multipart/form-data",
      },
    })
    return {
      success: true,
      message: responseMessages.document.uploadSuccess,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.document.uploadError)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}

/**
 * Delete a document
 * @param {string} documentId - ID of document to delete
 * @returns {Promise} - API response
 */
export const deleteDocument = async (documentId) => {
  try {
    const response = await axios.delete(`${apiEndpoints.deleteDocument}/${documentId}`, {
      headers: getAuthHeaders(),
    })
    return {
      success: true,
      message: responseMessages.document.deleteSuccess,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.document.deleteError)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}

/**
 * Get document categories
 * @returns {Promise} - API response with categories
 */
export const getDocumentCategories = async () => {
  try {
    const response = await axios.get(apiEndpoints.categoryMaster, {
      headers: getAuthHeaders(),
    })
    return {
      success: true,
      message: responseMessages.general.success,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.general.error)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}

/**
 * Download a document
 * @param {string} documentId - ID of document to download
 * @returns {Promise} - API response
 */
export const downloadDocument = async (documentId) => {
  try {
    const response = await axios.get(`${apiEndpoints.getAllUserDocuments}/${documentId}/download`, {
      headers: getAuthHeaders(),
      responseType: "blob",
    })
    return {
      success: true,
      message: responseMessages.document.downloadSuccess,
      data: response.data,
    }
  } catch (error) {
    const errorMessage = handleApiError(error, responseMessages.document.downloadError)
    return {
      success: false,
      message: errorMessage,
      error: error,
    }
  }
}
