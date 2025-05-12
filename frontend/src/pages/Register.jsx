import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CampanyLogo from '../assets/logo.png';
import { signup } from "../features/Authentication";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: '',
    role: '',
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
      isValid = false;
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { confirmpassword, agreeTerms, ...payload } = formData;
        await dispatch(signup(payload)).unwrap();
        
        switch (formData.role) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'teacher':
            navigate('/teacher');
            break;
          case 'student':
            navigate('/student/home');
            break;
          case 'administrative':
            navigate('/admin/manage');
            break;
          default:
            navigate('/');
        }
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  };

  return (
    <div className="flex min-h-screen font-poppins bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white pt-6 md:pt-10">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large animated gradient orbs */}
        <motion.div 
          className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-green-500/10 to-blue-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0], 
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 -right-1/4 w-2/3 h-2/3 bg-gradient-to-tl from-blue-500/10 to-purple-500/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 0], 
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5"/>
              </pattern>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="url(#smallGrid)"/>
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row w-full relative z-10">
        {/* Left Side - Logo/Image */}
        <motion.div 
          className="hidden lg:flex w-full lg:w-1/2 justify-center items-center p-12 relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="relative z-10 max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
          >
            <img 
              src={CampanyLogo} 
              alt="School Management System Logo" 
              className="w-[300px] h-auto" 
            />
            <motion.div 
              className="mt-8 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-green-400">Join Our Community</h2>
              <p className="text-gray-300">
                Create your account to access our comprehensive school management system.
              </p>
            </motion.div>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border-2 border-green-400/20"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 15,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-12 h-12 rounded-full border-2 border-blue-400/20"
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 18,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Right Side - Register Form */}
        <motion.div 
          className="flex w-full lg:w-1/2 items-center justify-center px-4 py-12 lg:p-12 overflow-y-auto max-h-screen mt-4 md:mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-700/50">
            <div className="p-8">
              <div className="lg:hidden flex justify-center mb-6">
                <img src={CampanyLogo} alt="Company logo" className="w-16 h-auto" />
              </div>
              
              <motion.div variants={itemVariants} className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2 text-white">Create Account</h2>
                <p className="text-gray-300 mb-2">Please fill in your details</p>
              </motion.div>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {/* First Name */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-300 text-sm mb-1 font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                </motion.div>

                {/* Last Name */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-300 text-sm mb-1 font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                </motion.div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-300 text-sm mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-300 text-sm mb-1 font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </motion.div>

                {/* Confirm Password */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-300 text-sm mb-1 font-medium">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmpassword && <p className="text-red-400 text-xs mt-1">{errors.confirmpassword}</p>}
                </motion.div>

                {/* Role */}
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-300 text-sm mb-1 font-medium">Select Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">-- Select Role --</option>
                    <option value="Admin">Admin</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                    <option value="Manager">Administrative</option>
                  </select>
                  {errors.role && <p className="text-red-400 text-xs mt-1">{errors.role}</p>}
                </motion.div>

                {/* Terms */}
                <motion.div variants={itemVariants} className="flex items-center gap-2">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-green-400 focus:ring-2"
                  />
                  <label htmlFor="agreeTerms" className="text-gray-300 text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-green-400 hover:underline">
                      Terms and Conditions
                    </Link>
                  </label>
                </motion.div>
                {errors.agreeTerms && <p className="text-red-400 text-xs">{errors.agreeTerms}</p>}

                <motion.div variants={itemVariants} className="pt-2">
                  <motion.button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Account
                  </motion.button>
                </motion.div>
              </form>
              
              <motion.p variants={itemVariants} className="text-center text-gray-300 mt-6">
                Already have an account? {" "}
                <Link to="/login" className="text-green-400 font-medium hover:underline">
                  Log In
                </Link>
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
