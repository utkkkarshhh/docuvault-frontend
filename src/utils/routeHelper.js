import { ROUTES } from "@/constants/routeConfig"

/**
 * Get the appropriate redirect URL based on authentication status
 * @param {boolean} isAuthenticated - Whether user is authenticated
 * @returns {string} - Redirect URL
 */
export const getRedirectUrl = (isAuthenticated) => {
  return isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN
}

/**
 * Navigate to a route using the router
 * @param {Object} router - React router object
 * @param {string} path - Path to navigate to
 * @param {Object} options - Navigation options
 */
export const navigateTo = (router, path, options = {}) => {
  router.push(path)
}

/**
 * Build full URL from path
 * @param {string} path - Path to convert to URL
 * @returns {string} - Full URL
 */
export const buildUrl = (path) => {
  return `${window.location.origin}${path}`
}

/**
 * Get current route from pathname
 * @param {string} pathname - Current pathname
 * @returns {string} - Current route name
 */
export const getCurrentRoute = (pathname) => {
  for (const [key, value] of Object.entries(ROUTES)) {
    if (value === pathname) {
      return key
    }
  }
  return "UNKNOWN"
}

/**
 * Check if current route matches a pattern
 * @param {string} pathname - Current pathname
 * @param {string} route - Route to check against
 * @returns {boolean} - True if route matches
 */
export const isRouteActive = (pathname, route) => {
  return pathname === route || pathname.startsWith(route + "/")
}

/**
 * Get the previous route from navigation history
 * @param {Object} navigate - React router navigate object
 * @param {string} defaultRoute - Default route if no history
 * @returns {void}
 */
export const goBack = (navigate, defaultRoute = ROUTES.DASHBOARD) => {
  // Try to go back in history, fallback to default route
  if (window.history.length > 1) {
    navigate(-1)
  } else {
    navigate(defaultRoute)
  }
}

/**
 * Format route path with parameters
 * @param {string} path - Route path
 * @param {Object} params - Parameters to insert
 * @returns {string} - Formatted path
 */
export const formatRoutePath = (path, params = {}) => {
  let formattedPath = path
  Object.entries(params).forEach(([key, value]) => {
    formattedPath = formattedPath.replace(`:${key}`, value)
  })
  return formattedPath
}
