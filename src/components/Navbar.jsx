import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, NoteAlt } from '@mui/icons-material';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold">NOTES</h1>
        <div className="flex space-x-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `${isActive ? 'text-blue-400' : 'text-white'} hover:text-gray-300 transition-colors flex items-center`
            }
          >
            <Home className="sm:hidden" />
            <span className="hidden sm:inline">HOME</span>
          </NavLink>
          <NavLink 
            to="/pastes" 
            className={({ isActive }) => 
              `${isActive ? 'text-blue-400' : 'text-white'} hover:text-gray-300 transition-colors flex items-center`
            }
          >
            <NoteAlt className="sm:hidden" />
            <span className="hidden sm:inline">NOTES</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

