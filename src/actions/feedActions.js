import { responseMessages } from "@/constants/messages"
import { MOCK_FEED_POSTS } from "@/utils/mockData"

/**
 * Get all feed posts
 * Note: Currently using mock data. Replace with API call when available.
 * @returns {Promise} - API response with posts list
 */
export const getAllFeedPosts = async () => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      message: responseMessages.general.success,
      data: MOCK_FEED_POSTS,
    }
  } catch (error) {
    return {
      success: false,
      message: responseMessages.feed.postsLoadError,
      error: error,
    }
  }
}

/**
 * Create a new feed post
 * Note: Currently using mock data. Replace with API call when available.
 * @param {Object} payload - Post data
 * @returns {Promise} - API response
 */
export const createFeedPost = async (payload) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newPost = {
      id: MOCK_FEED_POSTS.length + 1,
      ...payload,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
    }

    return {
      success: true,
      message: responseMessages.feed.postCreateSuccess,
      data: newPost,
    }
  } catch (error) {
    return {
      success: false,
      message: responseMessages.feed.postCreateError,
      error: error,
    }
  }
}

/**
 * Delete a feed post
 * Note: Currently using mock data. Replace with API call when available.
 * @param {string} postId - ID of post to delete
 * @returns {Promise} - API response
 */
export const deleteFeedPost = async (postId) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      message: responseMessages.feed.postDeleteSuccess,
      data: { id: postId },
    }
  } catch (error) {
    return {
      success: false,
      message: responseMessages.feed.postDeleteError,
      error: error,
    }
  }
}

/**
 * Like a feed post
 * Note: Currently using mock data. Replace with API call when available.
 * @param {string} postId - ID of post to like
 * @returns {Promise} - API response
 */
export const likeFeedPost = async (postId) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return {
      success: true,
      message: responseMessages.feed.likeSuccess,
      data: { postId },
    }
  } catch (error) {
    return {
      success: false,
      message: responseMessages.feed.interactionError,
      error: error,
    }
  }
}

/**
 * Unlike a feed post
 * Note: Currently using mock data. Replace with API call when available.
 * @param {string} postId - ID of post to unlike
 * @returns {Promise} - API response
 */
export const unlikeFeedPost = async (postId) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return {
      success: true,
      message: responseMessages.feed.unlikeSuccess,
      data: { postId },
    }
  } catch (error) {
    return {
      success: false,
      message: responseMessages.feed.interactionError,
      error: error,
    }
  }
}

/**
 * Get feed post comments
 * Note: Currently using mock data. Replace with API call when available.
 * @param {string} postId - ID of post
 * @returns {Promise} - API response
 */
export const getFeedPostComments = async (postId) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      message: responseMessages.general.success,
      data: [],
    }
  } catch (error) {
    return {
      success: false,
      message: responseMessages.general.error,
      error: error,
    }
  }
}

/**
 * Add comment to feed post
 * Note: Currently using mock data. Replace with API call when available.
 * @param {string} postId - ID of post
 * @param {string} comment - Comment text
 * @returns {Promise} - API response
 */
export const addFeedPostComment = async (postId, comment) => {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return {
      success: true,
      message: responseMessages.general.success,
      data: { postId, comment, timestamp: new Date() },
    }
  } catch (error) {
    return {
      success: false,
      message: responseMessages.general.error,
      error: error,
    }
  }
}
