import React, { useState } from "react";
import { Link } from "react-router-dom";
import Google from "../assets/icons8-google.svg";
import CampanyLogo from '../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { login} from "../features/Authentication";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const {Authuser}=useSelector((state) => state.auth);
 

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await dispatch(login({ email, password }));
    switch (Authuser.user.role) {
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
    console.error("Error in Login:", error);
  }
};


  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };


  return (
    <div className="flex min-h-screen font-poppins">
      {/* Left Side */}
      <div className="hidden md:flex flex-1 bg-gray-200 justify-center items-center">
        <img src={CampanyLogo} alt="Decorative background" className="w-[400px]" />
      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-4/5 flex flex-col justify-center">
          <div className="self-center pt-12">
            <img src={CampanyLogo} alt="Company logo" className="w-12" />
          </div>

          <div className="text-center my-8">
            <h2 className="text-4xl font-bold mb-2">Welcome back!</h2>
            <p className="text-2xl font-normal mb-8">Please enter your details</p>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 mb-4 border-b border-black outline-none text-lg"
              />

              <div className="flex items-center border-b border-black mb-4">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex-1 p-4 outline-none text-lg font-poppins"
                />
                <button 
                  type="button"
                  className="bg-transparent border-none text-2xl cursor-pointer px-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <span>👁️</span> : <span>👁️‍🗨️</span>}
                </button>
              </div>

              {/* Options */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="remember-checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor="remember-checkbox" className="text-sm font-medium cursor-pointer mt-1">
                    Remember for 30 days
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-8">
                <button 
                  type="submit"
                  className="bg-black text-white font-semibold text-lg py-4 rounded-full border-4 border-black hover:bg-white hover:text-black transition"
                >
                  Log In
                </button>
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  className="bg-gray-200 flex justify-center items-center gap-3 font-semibold text-lg py-4 rounded-full hover:bg-gray-300 transition"
                >
                  <img src={Google} alt="Google logo" className="w-7" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          {/* Bottom Signup */}
          <p className="text-center text-base pb-10">
            Don't have an account? <Link to="/register" className="font-semibold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
