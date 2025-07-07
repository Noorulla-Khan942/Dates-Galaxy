import React from 'react';
import { FaRegPlusSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <Link 
        to="/" 
        className="text-2xl font-bold tracking-wide hover:text-gray-300 transition"
      >
        Dates Galaxy
      </Link>

      <Link to="/create">
        <button 
          className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
        >
          <FaRegPlusSquare className="text-lg" />
          <span className="hidden sm:inline">Add New</span>
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
