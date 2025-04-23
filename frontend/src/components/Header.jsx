import React from "react";

const Header = () => {
  return (
    <nav className="bg-black shadow-lg h-24 pt-5 px-5">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <span className="font-semibold text-white  text-lg">
                  School Smart Managment System
                </span>
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <a
              href="#features"
              className="py-4 px-2 text-white  font-semibold hover:text-green-500 transition duration-300"
            >
              Home
            </a>
            <a
              href="#testimonials"
              className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
            >
            Features
            </a>
            <a
              href="#faq"
              className="py-4 px-2 text-white  font-semibold hover:text-green-500 transition duration-300"
            >
              Pricing
            </a>
          
          </div>
      
            <button className="bg-white w-40 h-12 hover:bg-green-700 hover:text-white rounded-lg">
            Register Now
            </button>
     
        </div>
      </div>
    </nav>
  );
};

export default Header ;