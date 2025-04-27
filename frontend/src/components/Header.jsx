import React from "react";
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/logo.png"; // <--- Import your logo image correctly
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-black shadow-lg h-24 pt-5 px-5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="Logo" className="h-20 w-18 object-contain" /> {/* <- Logo added */}
            <span className="font-semibold text-white text-lg">
              School Smart Management System
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#features"
              className="py-2 px-4 text-white font-semibold hover:text-green-500 transition duration-300"
            >
              Home
            </a>
            <a
              href="#testimonials"
              className="py-2 px-4 text-white font-semibold hover:text-green-500 transition duration-300"
            >
              Features
            </a>
            <a
              href="#faq"
              className="py-2 px-4 text-white font-semibold hover:text-green-500 transition duration-300"
            >
              Pricing
            </a>
          </div>

          {/* Register Button */}
          <button
            className="bg-white w-40 h-12 hover:bg-green-700 hover:text-white rounded-lg transition-colors duration-300"
            onClick={() => navigate('/Register')}
          >
            Register Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
