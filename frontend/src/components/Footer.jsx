import React from "react";
import { motion } from "framer-motion";
import { 
  MdOutlineMailOutline, 
  MdLocationOn, 
  MdPhone 
} from "react-icons/md";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaYoutube,
  FaArrowRight 
} from "react-icons/fa";

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Function to handle newsletter submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // This would connect to MongoDB for storing newsletter subscribers
    // You'll need to implement this server-side functionality
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <motion.footer 
      className="bg-transparent border-t border-gray-800 text-white relative pt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Top wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg 
          className="relative block w-full h-12 md:h-16" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-gray-100"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-4 text-green-400">SchoolSmart</h3>
            <p className="text-gray-300 mb-6">
              The future of school management systems. Empowering educational institutions with innovative technology solutions.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-gray-800 hover:bg-green-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaFacebookF className="text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-green-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaTwitter className="text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-green-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaLinkedinIn className="text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-green-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <FaInstagram className="text-white" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold mb-5 text-green-400">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-300 hover:text-white flex items-center group">
                  <FaArrowRight className="mr-2 h-3 w-3 text-green-400 group-hover:translate-x-1 transition-transform" />
                  Features
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-white flex items-center group">
                  <FaArrowRight className="mr-2 h-3 w-3 text-green-400 group-hover:translate-x-1 transition-transform" />
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-white flex items-center group">
                  <FaArrowRight className="mr-2 h-3 w-3 text-green-400 group-hover:translate-x-1 transition-transform" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-300 hover:text-white flex items-center group">
                  <FaArrowRight className="mr-2 h-3 w-3 text-green-400 group-hover:translate-x-1 transition-transform" />
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-gray-300 hover:text-white flex items-center group">
                  <FaArrowRight className="mr-2 h-3 w-3 text-green-400 group-hover:translate-x-1 transition-transform" />
                  Register
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold mb-5 text-green-400">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MdLocationOn className="text-green-400 text-xl mr-3 mt-1" />
                <span className="text-gray-300">
                  123 Education Street, Learning City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <MdPhone className="text-green-400 text-xl mr-3" />
                <span className="text-gray-300">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <MdOutlineMailOutline className="text-green-400 text-xl mr-3" />
                <span className="text-gray-300">info@schoolsmart.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold mb-5 text-green-400">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to get updates on our latest features and news.
            </p>
            {/* This form would connect to MongoDB - requires backend implementation */}
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 border border-gray-700"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded hover:from-green-600 hover:to-blue-600 transition-colors duration-300 flex items-center justify-center"
              >
                Subscribe <FaArrowRight className="ml-2" />
              </button>
            </form>
            {/* MongoDB connection note */}
            {/* Note: This newsletter form requires backend API integration with MongoDB.
                 You'll need to:
                 1. Set up a MongoDB collection for subscribers
                 2. Create an API endpoint to handle form submissions
                 3. Implement email validation and duplicate checking */}
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            © {new Date().getFullYear()} SchoolSmart. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;