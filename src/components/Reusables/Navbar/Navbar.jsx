import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import SolidButton from "@/components/custom/Buttons/SolidButton/SolidButton";
import { FaBars, FaTimes } from "react-icons/fa";
import Avatar from "@/components/custom/Buttons/AvatarButton/Avatar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, user } = useSelector(state => state.auth);
  const { currentUser } =  useSelector(state => state.user);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`navbar ${isLoggedIn ? "logged-in" : ""}`}>
      <div className="navbar-icon">
        <p className="navbar-icon-text">
          <Link to={isLoggedIn ? "/home" : "/"}>DocuVault</Link>
        </p>
      </div>

      {/* Hamburger Icon - Only shown when not logged in */}
      {!isLoggedIn && (
        <div
          className="hamburger-menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      )}

      {/* Navigation Items */}
      <div className={`navbar-buttons ${isMobileMenuOpen ? "open" : ""}`}>
        {!isLoggedIn && (
          <>
            <p
              className="navbar-item"
              onClick={() => scrollToSection("features")}
            >
              Features
            </p>
            <p
              className="navbar-item"
              onClick={() => scrollToSection("developers")}
            >
              Developers
            </p>
            <p
              className="navbar-item"
              onClick={() => scrollToSection("pricing")}
            >
              Pricing
            </p>
            <SolidButton
              onClick={() => {
                console.log("Login/ Register");
              }}
              buttonName={"Get Started"}
            />
          </>
        )}
      </div>

      {/* Avatar is always visible and outside the hamburger menu */}
      {isLoggedIn && <Avatar name={currentUser?.username} />}
    </div>
  );
};

export default Navbar;
