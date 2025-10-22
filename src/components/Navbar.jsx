import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, StickyNote, User, LogOut } from 'lucide-react';

const Navbar = () => {
  // You can replace this with actual authentication state
  const isAuthenticated = false; // Change to true when user is logged in

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
                to="/" 
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
                to="/pastes" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? 'text-blue-400 bg-gray-800' : 'text-white hover:text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <StickyNote className="h-4 w-4 sm:hidden" />
                <span className="hidden sm:inline">NOTES</span>
              </NavLink>
              <button
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors text-white hover:text-gray-300 hover:bg-gray-800"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">PROFILE</span>
              </button>
            </>
          ) : (
            // Show only Get Started button when not authenticated
            <NavLink 
              to="/register" 
              className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <span>GET STARTED</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;