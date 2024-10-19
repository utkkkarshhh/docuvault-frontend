import React from "react";
import "./LandingPage.scss";
import SolidButton from "../components/ui/Buttons/SolidButton/SolidButton";
import WhiteButton from "../components/ui/Buttons/WhiteButton/WhiteButton";
import LandingPageCard from "../components/ui/Cards/LandingPageCard/LandingPageCard";
import DocumentVector from "../assets/images/1376310.png";
import { IoIosCloudDownload } from "react-icons/io";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GiResize } from "react-icons/gi";
import { IoMdCloudDone } from "react-icons/io";
import { CiLinkedin } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero">
        <div className="hero-vector">
          <img src={DocumentVector} alt="Document Vector" />
        </div>
        <div className="hero-text">
          <h1 className="hero-title">Secure Document Management</h1>
          <p className="hero-subtitle">
            Document Vault is a secure and intuitive solution for organizing,
            storing, and accessing your important documents anytime and anywhere
            in a format and size of your choice.
          </p>
          <div className="hero-buttons">
            <Link to="/register"><SolidButton
              onClick={() => console.log("Get Started")}
              buttonName="Get Started Now"
            /></Link>
            <Link to="https://www.youtube.com"><WhiteButton
              onClick={() => console.log("Watch Video")}
              buttonName="Watch Video"
            /></Link>
          </div>
        </div>
      </div>
      <div className="features" id="features">
        <div className="features-heading">
          <span className="heading-button">Features</span>
          <h2 className="features-heading-main">
            Why use <span className="bold-heading">DocuVault?</span>
          </h2>
          <p className="features-heading-text">
            DocuVault helps you in efficiently managing your documents!
          </p>
        </div>
        <div className="features-row">
          <div className="feature">
            <div className="feature-logo">
              <p>
                <AiOutlineSafetyCertificate />
              </p>
            </div>
            <div className="feature-text">
              <p>Securely store your important documents.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-logo">
              <p>
                <IoIosCloudDownload />
              </p>
            </div>
            <div className="feature-text">
              <p>Download anywhere and anytime you want.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-logo">
              <p>
                <GiResize />
              </p>
            </div>
            <div className="feature-text">
              <p>Download in any format, size, or dimension.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-logo">
              <p>
                <IoMdCloudDone />
              </p>
            </div>
            <div className="feature-text">
              <p>One stop place for all your conversion needs.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="developers" id="developers">
        <div className="developers-heading">
          <h2 className="developers-heading-main">
            Meet the <span className="bold-heading">creators</span>
          </h2>
          <p className="developers-heading-text">
            DocuVault is a passion project for us!
          </p>
        </div>
        <div className="developers-cards">
          <div className="developer-card">
            <div className="developer-card-image">
              <img
                src="https://avatars.githubusercontent.com/u/67866657?v=4"
                alt="Utkarsh"
              />
            </div>
            <div className="developer-card-text">
              <p className="developer-name">Utkarsh Bhardwaj</p>
              <div className="developer-links">
                <a href="https://www.linkedin.com/in/utkkkarshhh/">
                  <CiLinkedin />
                </a>
                <a href="https://www.github.com/utkkkarshhh/">
                  <FiGithub />
                </a>
              </div>
              <p className="developer-bio">
                MCA(Master of Computer Applications) @Maharshi Dayanand
                Univerity, Rohtak
              </p>
            </div>
          </div>
        </div>
      </div>
      <LandingPageCard />
    </div>
  );
}
