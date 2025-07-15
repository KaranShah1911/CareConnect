import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useStore } from "../utils/user";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedin = useStore((state) => state.isLoggedin);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);
  // login();


  return (
    <header className="fixed left-[50%] -translate-x-[50%] rounded-full w-[80%] bg-white shadow-md z-2">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div onClick={() => navigate("/")} className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="CareConnect Logo"
            className="h-15 w-15 rounded-full"
          />
          <span className="text-xl font-bold text-[#5C67F2]">CareConnect</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-8 text-gray-600 text-lg font-medium">
          <Link to="/" className="relative nav-items ">
            Home
          </Link>
          <Link to="all-doctors" className="relative nav-items transition">
            All Doctors
          </Link>
          <Link to="/about" className="relative nav-items ">
            About
          </Link>
          <Link to="/contact" className="relative nav-items transition">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-4 items-center relative">
          {!isLoggedin ? (
            <button
              onClick={() => navigate("/auth/login")}
              className="px-4 py-2 text-[#5C67F2] border border-[#5C67F2] rounded-lg hover:bg-[#5C67F2] cursor-pointer hover:text-white transition"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
  {/* Profile Image */}
  <img
    src="https://randomuser.me/api/portraits/men/32.jpg"
    alt="Profile"
    className="w-12 h-12 rounded-full border-2 border-[#5C67F2] cursor-pointer"
  />

  {/* Dropdown */}
  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 z-10">
    <Link
      to="/my-appointment"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      My Appointments
    </Link>
    <Link
      to="/profile"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    >
      Profile
    </Link>
    <button
      onClick={() => {
        useStore.getState().logout(); // Your logout logic
        navigate('/');
      }}
      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
    >
      Logout
    </button>
  </div>
</div>

          )}
        </div>
      </div>
    </header>
  );
}
