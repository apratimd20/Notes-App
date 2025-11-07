import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, StickyNote, User, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Check if user is authenticated and get user data
  const isAuthenticated = !!localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Get user initials for profile
  const getUserInitials = () => {
    if (userData.name) {
      const names = userData.name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return names[0][0].toUpperCase();
    }
    return 'U';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 py-3 px-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-lg blur opacity-20"></div>
            <StickyNote className="h-8 w-8 text-blue-600 relative z-10" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            NOTES
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              {/* Navigation Links */}
              <NavLink 
                to="/home" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </NavLink>
              <NavLink 
                to="/notes" 
                className={({ isActive }) => 
                  `flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <StickyNote className="h-4 w-4 mr-2" />
                Notes
              </NavLink>
              
              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold shadow-md">
                    {getUserInitials()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200/50">
                      <p className="text-sm font-semibold text-gray-900">{userData.name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate mt-1">{userData.email || ''}</p>
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Login Button when not authenticated
            <NavLink 
              to="/login" 
              className="flex items-center px-6 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Sign In
            </NavLink>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg sm:hidden">
            <div className="px-4 py-3 space-y-2">
              {isAuthenticated ? (
                <>
                  <NavLink 
                    to="/home" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    <Home className="h-4 w-4 mr-3" />
                    Home
                  </NavLink>
                  <NavLink 
                    to="/notes" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`
                    }
                  >
                    <StickyNote className="h-4 w-4 mr-3" />
                    Notes
                  </NavLink>
                  
                  {/* User Info in Mobile */}
                  <div className="px-4 py-3 border-t border-gray-200/50">
                    <p className="text-sm font-semibold text-gray-900">{userData.name || 'User'}</p>
                    <p className="text-xs text-gray-500 truncate mt-1">{userData.email || ''}</p>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </button>
                </>
              ) : (
                <NavLink 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transition-all duration-300"
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;