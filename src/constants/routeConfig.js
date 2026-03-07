/**
 * Central route configuration for the application
 * Use these constants for all navigation links and button routing
 */

const ROUTES = {
  // Public Routes
  HOME: "/",
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  RESET_PASSWORD: "/reset-password",
  PRICING: "/pricing",

  // Protected Routes
  DASHBOARD: "/dashboard",
  FEED: "/feed",
  DOWNLOAD_HISTORY: "/download-history",
  SETTINGS: "/settings",
  PROFILE: "/profile",
}

/**
 * Route metadata for navigation menus
 */
const NAVIGATION_ITEMS = {
  // Public Navigation
  PUBLIC: [
    { label: "Pricing", path: ROUTES.PRICING, icon: "tag" },
    { label: "Sign In", path: ROUTES.LOGIN, icon: "login" },
  ],

  // Authenticated Navigation - Sidebar
  AUTHENTICATED: [
    { label: "Dashboard", path: ROUTES.DASHBOARD, icon: "home" },
    { label: "Feed", path: ROUTES.FEED, icon: "feed" },
    { label: "Download History", path: ROUTES.DOWNLOAD_HISTORY, icon: "download" },
    { label: "Pricing", path: ROUTES.PRICING, icon: "tag" },
    { label: "Settings", path: ROUTES.SETTINGS, icon: "settings" },
    { label: "Profile", path: ROUTES.PROFILE, icon: "user" },
  ],
}

/**
 * Check if a route requires authentication
 */
const isProtectedRoute = (pathname) => {
  const protectedRoutes = [
    ROUTES.DASHBOARD,
    ROUTES.FEED,
    ROUTES.DOWNLOAD_HISTORY,
    ROUTES.SETTINGS,
    ROUTES.PROFILE,
  ]
  return protectedRoutes.includes(pathname)
}

/**
 * Check if a route is public
 */
const isPublicRoute = (pathname) => {
  const publicRoutes = [
    ROUTES.HOME,
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.RESET_PASSWORD,
    ROUTES.PRICING,
  ]
  return publicRoutes.includes(pathname)
}

export { ROUTES, NAVIGATION_ITEMS, isProtectedRoute, isPublicRoute }
