import {
  BrowserRouter as Router,
  Route,
  Routes as RoutingTable,
} from "react-router-dom"
import { useEffect } from "react"
import "./App.scss"
import ProtectedRoute from "@/store/ProtectedRoute"
import PublicRoute from "@/store/PublicRoute"
import Navbar from "@/components/Reusables/Navbar/Navbar"
import HomePage from "@/pages/HomePage"
import LandingPage from "@/pages/LandingPage"
import ProfilePage from "@/pages/ProfilePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import SettingsPage from "@/pages/SettingsPage"
import ResetPasswordPage from "@/pages/ResetPasswordPage"
import PricingPage from "@/pages/PricingPage"
import FeedPage from "@/pages/FeedPage"
import DownloadHistoryPage from "@/pages/DownloadHistoryPage"
import Footer from "@/components/Reusables/Footer/Footer"
import { useDispatch, useSelector } from "react-redux"
import { loadUserFromLocalStorage } from "@/utils/CheckAuthState"
import { Toaster } from "react-hot-toast"


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    loadUserFromLocalStorage(dispatch);
  }, [dispatch]);
  
  const isAuthenticated = useSelector((state) => !!state.user.currentUser);

  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} /> 
      <RoutingTable>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/pricing"
          element={
            <PublicRoute>
              <PricingPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/forget_password"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />

        {/* Authenticated Routes / Private Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FeedPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/download-history"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DownloadHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Routes */}
        <Route
          path="*"
          element={isAuthenticated ? <HomePage /> : <LandingPage />}
        />
      </RoutingTable>
      <Footer />
    </Router>
  );
}

export default App;
