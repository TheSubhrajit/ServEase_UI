import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo and Social Media Icons */}
        <div className="item">
          <div className="footer-logo-section">
            <h3 className="footer-logo"><b>ServEase</b></h3>
          </div>
          <div className="social-media">
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={30} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={30} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} />
            </a>
           
            
          </div>
          
          {/* Tooltip */}
          <div className="footer-tooltip">
           ©2024 ServEase Innovation Pvt. Ltd.
          </div>
        </div>

       {/* Links */}
      <div className="item">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#team">Team</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="item">
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="#cookie-policy">Cookie Policy</a>
            </li>
            <li>
            <a href="#terms-conditions">Terms & Conditions</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="item">
        <div className="footer-section">
          <h4>We Deliver to:</h4>
          <ul>
            <li>
              <a href="#mumbai">Mumbai</a>
            </li>
            <li>
              <a href="#bangalore">Bangalore</a>
            </li>
            <li>
              <a href="#hyderabad">Hyderabad</a>
            </li>
          </ul>
        </div>
      </div>
      {/* Country and Language Dropdown */}
      <div className="item">
          <div className="footer-section dropdown-section">
            {/* Country Dropdown */}
            <select className="dropdown-select">
              <option value="IN">🇮🇳 India</option>
              <option value="US">🇺🇸 USA</option>
              <option value="UK">🇬🇧 UK</option>
            </select>

            {/* Language Dropdown */}
            <select className="dropdown-select">
              <option value="EN">🌐 English</option>
            </select>
          </div>
        </div>
      
      </div>
    </footer>
  );
};

export default Footer;