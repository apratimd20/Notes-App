import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, StickyNote, LogIn, ArrowRight, Eye, EyeOff } from "lucide-react";
import apiConfig from "../config/apiConfig";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(apiConfig.login, {
        email,
        password
      });
      
      if (response.status === 200) { 
        response.data.token && localStorage.setItem("token", response.data.token);
        response.data.user && localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Login Successful! Welcome back");
        navigate('/home');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-lg blur opacity-20"></div>
              <StickyNote className="h-12 w-12 text-blue-600 relative z-10" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Create one here
            </Link>
          </p>
        </div>

        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <form className="space-y-4" onSubmit={handleLogin}>
           
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

           
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  maxLength={20}
                  required
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <>
                  {/* <LogIn className="h-4 w-4 mr-2" /> */}
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          
          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-500 text-xs">
                  Quick Access
                </span>
              </div>
            </div>

           
            <div className="mt-4">
              <Link
                to="/home"
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white/50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Home className="h-4 w-4 mr-2" />
                Continue without login
              </Link>
            </div>
          </div> */}
        </div>

       
        {/* <div className="mt-6 text-center">
          <div className="bg-yellow-50/80 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs text-yellow-800">
              <strong>Demo Account:</strong> test@example.com / password123
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Login;