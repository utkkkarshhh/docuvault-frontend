import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import SolidButton from "@/components/ui/Buttons/SolidButton/SolidButton";
import { FaBars, FaTimes } from "react-icons/fa";
import Avatar from "@/components/ui/Buttons/AvatarButton/Avatar";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = true;
  const userName = "Utkarsh";

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToDevelopers = () => {
    const developersSection = document.getElementById("developers");
    if (developersSection) {
      developersSection.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`navbar ${isLoggedIn ? "logged-in" : ""}`}>
      <div className="navbar-icon">
        <p className="navbar-icon-text">
          <Link to={isLoggedIn ? "/home" : "/"} >DocuVault</Link>
        </p>
      </div>

      {/* Hamburger Icon - Only shown when not logged in */}
      {!isLoggedIn && (
        <div
          className="hamburger-menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      )}

      {/* Navigation Items */}
      <div className={`navbar-buttons ${isMobileMenuOpen ? "open" : ""}`}>
        {!isLoggedIn && (
          <>
            <p className="navbar-item" onClick={scrollToFeatures}>
              Features
            </p>
            <p className="navbar-item" onClick={scrollToDevelopers}>
              Developers
            </p>
            <p className="navbar-item" onClick={scrollToDevelopers}>
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
      {isLoggedIn && <Avatar name={userName} />}
    </div>
  );
};

export default Navbar;
