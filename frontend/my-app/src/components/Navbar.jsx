import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css"

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-[50%] -translate-x-[50%] rounded-full w-[80%] bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="CareConnect Logo" className="h-15 w-15 rounded-full" />
          <span className="text-xl font-bold text-[#5C67F2]">CareConnect</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-gray-600 text-lg font-medium">
          <Link to="/" className="relative nav-items ">Home</Link>
          <Link to="all-doctors" className="relative nav-items transition">All Doctors</Link>
          <Link to="/about" className="relative nav-items ">About</Link>
          <Link to="/contact" className="relative nav-items transition">Contact</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          <button onClick={()=>navigate("/login")} className="px-4 py-2 text-[#5C67F2] border border-[#5C67F2] rounded-lg hover:bg-[#5C67F2] cursor-pointer hover:text-white transition">
            Login
          </button>
          <button onClick={()=>navigate("/signup")} className="px-4 py-2 bg-[#5C67F2] text-white rounded-lg hover:bg-indigo-600 cursor-pointer transition">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
