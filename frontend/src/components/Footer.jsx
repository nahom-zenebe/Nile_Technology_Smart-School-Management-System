import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">SchoolSmart</h3>
            <p className="text-gray-400">
              The future of school management systems.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-400 hover:text-white"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        
          <div>
        
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">info@schoolsmart.com</p>
            <p className="text-gray-400">+1 (123) 456-7890</p>
          </div>
          <div className="flex flex-col">
          <p className="mt-">Follow Us</p>
          <MdOutlineMailOutline className="mt-2 ml-4"/>
          <FaPhoneAlt className="mt-2 ml-4"/>
          <FaLinkedin className="mt-2 ml-4"/>
            
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2023 SchoolSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;