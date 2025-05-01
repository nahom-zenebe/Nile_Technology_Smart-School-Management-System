import React, { useState } from 'react';
import CampanyLogo from '../assets/logo.png';
import signup from '../features/Authentication'
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../assets/back.png';
import { useDispatch,useSelector } from 'react-redux';
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    email: '',
    password: '',
    confirmpassword: '',
    role:'',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { Authuser,isUserSignup } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigator = useNavigate();


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
      newErrors.firstName = 'fisrtName is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'lastName is required';
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

    if (formData.password !== formData.p) {
      newErrors.p = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };



const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    dispatch(signup(formData))
      .then(() => {
      
       
        switch (role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "teacher":
            navigate("teacher");
            break;
          case "student":
            navigate("/student/home");
            break;
          case "administrative":
            navigate("/admin/manage");
            break;
          default:
            navigate("/"); 
        }
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
  }
};


  return (
    <div className="min-h-screen px-12 py-8"> {/* <-- Added page side margin and some vertical padding */}
      <div className="flex h-full">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center relative">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${BackgroundImage})` }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
          <div className="relative z-10 text-center p-8">
            <img src={CampanyLogo} alt="Company Logo" className="w-32 h-auto mb-6 mx-auto" />
            <h1 className="text-3xl font-bold text-white mb-4">School Management System</h1>
            <p className="text-white opacity-80 text-lg">Empowering education through technology</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Account</h2>
            <p className="text-gray-600 mb-6">Join our community today</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-gray-700 mb-1 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="first Name"
                  name="first Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first Name"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="fullName" className="block text-gray-700 mb-1 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last Name"
                  name="last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first Name"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="p" className="block text-gray-700 mb-1 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="p"
                  name="p"
                  value={formData.p}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.p ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.p && <p className="text-red-500 text-sm">{errors.p}</p>}
              </div>

              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={`w-4 h-4 border rounded focus:ring-blue-500 ${
                    errors.agreeTerms ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <label htmlFor="agreeTerms" className="ml-2 text-gray-700 text-sm">
                  I agree to the{' '}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-4 text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline font-medium">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
