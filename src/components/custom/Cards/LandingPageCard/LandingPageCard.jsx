import React from "react";
import "./LandingPageCard.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function LandingPageCard(props) {
  return (
    <div className="landing-page-card">
      <div className="landing-page-card-top">
        <p>Sounds Fascinating? 🚀</p>
      </div>
      <div className="landing-page-card-bottom">
        <div className="landing-page-card-bottom-line">
          <p>Why wait? Experience the future of document management today!</p>
        </div>
        <div className="landing-page-card-bottom-line-button">
          <p>
            <Link to="/register">Register Now</Link>
          </p>
          <FaArrowRightLong />
        </div>
      </div>
    </div>
  );
}
