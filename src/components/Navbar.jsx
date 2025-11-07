import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, StickyNote, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  
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
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <StickyNote className="h-6 w-6 mr-2 text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold">NOTES</h1>
        </div>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            // Show app navigation when authenticated
            <>
              <NavLink 
                to="/home" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'text-blue-400 bg-gray-800' : 'text-white hover:text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <Home className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">HOME</span>
              </NavLink>
              <NavLink 
                to="/notes" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'text-blue-400 bg-gray-800' : 'text-white hover:text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <StickyNote className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">NOTES</span>
              </NavLink>
              
              {/* Profile with user initials */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white font-semibold">
                  {getUserInitials()}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-white hover:text-gray-300 hover:bg-gray-800"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">LOGOUT</span>
                </button>
              </div>
            </>
          ) : (
            // Show Login button when not authenticated
            <NavLink 
              to="/login" 
              className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <span>LOGIN</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;