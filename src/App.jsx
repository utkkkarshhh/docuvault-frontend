import {
  BrowserRouter as Router,
  Route,
  Routes as RoutingTable,
} from "react-router-dom";
import "./App.scss";
import ProtectedRoute from "@/store/ProtectedRoute";
import Navbar from "@/components/Reusables/Navbar/Navbar";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";
import ProfilePage from "@/pages/ProfilePage";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import SettingsPage from "@/pages/SettingsPage";
import Footer from "@/components/Reusables/Footer/Footer";

const isAuthenticated = true;

function App() {
  return (
    <Router>
      <Navbar />
      <RoutingTable>
        {/* Authenticated Routes / Private Routes */}
        <Route path="/home" index element={<HomePage />} />
        <Route path="/profile" index element={<ProfilePage />} />
        <Route path="/settings" index element={<SettingsPage />} />

        {/* Public Routes */}
        <Route path="/" index element={<LandingPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/register" index element={<RegisterPage />} />

        {/* Select All */}
        {isAuthenticated ? (
          <Route path="*" index element={<HomePage />} />
        ) : (
          <Route path="*" index element={<LandingPage />} />
        )}
      </RoutingTable>
      <Footer />
    </Router>
  );
}

export default App;
