import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Google from "../assets/icons8-google.svg";
import CampanyLogo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../features/Authentication";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Authuser, isUserLogin } = useSelector((state) => state.auth);
 
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

  // Clear any login errors when inputs change
  useEffect(() => {
    if (loginError) setLoginError("");
    if (errors.email && email) setErrors(prev => ({ ...prev, email: "" }));
    if (errors.password && password) setErrors(prev => ({ ...prev, password: "" }));
  }, [email, password, loginError]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoginError("");
    
    try {
      const resultAction = await dispatch(login({ email, password }));
      
      if (login.fulfilled.match(resultAction)) {
        // Login successful
        const user = resultAction.payload.user;
        switch (user.role) {
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
      } else if (login.rejected.match(resultAction)) {
        // Login failed
        const errorMessage = resultAction.payload || "Invalid email or password. Please try again.";
        setLoginError(errorMessage);
      }
    } catch (error) {
      console.error("Error in Login:", error);
      setLoginError("Network error. Please check your connection and try again.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <div className="flex min-h-screen font-poppins bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
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
              <h2 className="text-3xl font-bold mb-4 text-green-400">Welcome Back</h2>
              <p className="text-gray-300">
                Access your school management dashboard and manage your educational ecosystem with ease.
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

        {/* Right Side - Login Form */}
        <motion.div 
          className="flex w-full lg:w-1/2 items-center justify-center px-4 py-12 lg:p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-gray-700/50">
            <div className="p-8">
              <div className="lg:hidden flex justify-center mb-6">
                <img src={CampanyLogo} alt="Company logo" className="w-16 h-auto" />
              </div>
              
              <motion.div variants={itemVariants} className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 text-white">Welcome back!</h2>
                <p className="text-xl text-gray-300 mb-4">Please enter your details</p>
              </motion.div>

              {/* Login Error Message */}
              {loginError && (
                <motion.div 
                  className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-red-300 text-sm">{loginError}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-gray-300 text-sm mb-2 font-medium">Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full p-3 bg-gray-700/50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-gray-300 text-sm mb-2 font-medium">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full p-3 bg-gray-700/50 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg outline-none text-white focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300`}
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="remember-checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-green-400 focus:ring-2"
                    />
                    <label htmlFor="remember-checkbox" className="text-sm text-gray-300 cursor-pointer select-none">
                      Remember for 30 days
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-green-400 hover:underline">
                    Forgot password?
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-2 space-y-4">
                  <motion.button 
                    type="submit"
                    disabled={isUserLogin}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: isUserLogin ? 1 : 1.03 }}
                    whileTap={{ scale: isUserLogin ? 1 : 0.98 }}
                  >
                    {isUserLogin ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging in...
                      </span>
                    ) : "Log In"}
                  </motion.button>
                  
                  <motion.button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-gray-700 hover:bg-gray-600 flex justify-center items-center gap-3 font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-gray-600"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <img src={Google} alt="Google logo" className="w-5 h-5" />
                    Log In with Google
                  </motion.button>
                </motion.div>
              </form>
              
              <motion.p variants={itemVariants} className="text-center text-gray-300 mt-8">
                Don't have an account? {" "}
                <Link to="/register" className="text-green-400 font-medium hover:underline">
                  Sign Up
                </Link>
              </motion.p>

              {/* Demo Account Information */}
              <motion.div
                variants={itemVariants}
                className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
              >
                <h3 className="text-blue-300 font-medium mb-2">Demo Accounts</h3>
                <div className="text-xs text-gray-300 space-y-1">
                  <p><span className="text-blue-300">Admin:</span> admin@school.com / Admin123!</p>
                  <p><span className="text-blue-300">Teacher:</span> teacher@school.com / Teacher123!</p>
                  <p><span className="text-blue-300">Student:</span> student@school.com / Student123!</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
