import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useUserStore } from '../store/user';

export default function Navbar() {
  const navigate = useNavigate();
  const [menu, openMenu] = useState(false);
  const [dropdown, showDropdown] = useState(false);
  const { isLoggedin, logout, image } = useUserStore()

  const handeLogout = (e) => {
    openMenu(prev=>!prev);
    logout(); // Your logout logic
    navigate("/");
  }

  return (
    <header className="fixed md:left-[50%] md:-translate-x-[50%] md:rounded-full w-screen md:w-[80%] bg-white shadow-md z-2 border-b border-indigo-500 md:border-none">
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-3 flex items-center justify-between">
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
        <div className='flex gap-2'>
          <div className="flex gap-4">
            {!isLoggedin ? <button onClick={() => navigate("/auth/login")} className="px-4 py-2 text-[#5C67F2] border border-[#5C67F2] rounded-lg hover:bg-[#5C67F2] cursor-pointer hover:text-white transition">
              Login
            </button> : (
              <div className="max-md:hidden md:relative">
                {/* Profile Image */}
                <img
                  src={image}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-[#5C67F2] cursor-pointer"
                  onClick={() => showDropdown(prev => !prev)}
                />

                {/* Desktop Dropdown */}
                {dropdown && <div className="absolute bg-white min-w-max text-lg p-2 rounded-md right-0 mt-5">
                  <Link
                    to="/my-appointment"
                    onClick={() => showDropdown(prev => !prev)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md space-x-1"
                  >
                    <RiCalendarScheduleLine className='inline' />
                    <span>My Appointments</span>
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => showDropdown(prev => !prev)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md space-x-1"
                  >
                    <CgProfile className='inline' />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => handeLogout()}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md space-x-1"
                  >
                    <FiLogOut className='inline' />
                    <span>Logout</span>
                  </button>
                </div>}
              </div>
            )}
          </div>
          {/* Hamburger for smaller device */}
          <button className='md:hidden text-indigo-400 rounded-full p-2 active:bg-gray-300' onClick={() => openMenu(prev => !prev)}><GiHamburgerMenu className='size-7' /></button>
        </div>

      </div>
      {
        // NavBar for smaller devies
        menu && <nav className="md:hidden flex flex-col items-start bg-white p-5 gap-8 text-gray-600 text-lg font-medium min-h-max w-screen">
          {isLoggedin && <div className='flex flex-col w-full'>
            {/* User Profile */}
            <div className='flex justify-between w-full items-center'>
              <img
                src={image}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-[#5C67F2] cursor-pointer inline"
                onClick={() => showDropdown(prev => !prev)}
              />
              <button onClick={() => showDropdown(prev => !prev)}>{dropdown ? <RiArrowDropUpLine className='inline size-8 bg-gray-200 rounded-full' /> : < RiArrowDropDownLine className='inline size-8 bg-gray-200 rounded-full' />}</button>
            </div>

            {/* User Profile DropDown */}
            {dropdown && isLoggedin && <div className="bg-white w-full text-lg flex flex-col gap-2 mt-4 border-b-1 border-">
              <Link
                to="/my-appointment"
                onClick={() => openMenu(prev => !prev)}
                className="py-2 text-gray-700 hover:bg-gray-100 rounded-md space-x-1"
              >
                <RiCalendarScheduleLine className='inline' />
                <span>My Appointments</span>
              </Link>
              <Link
                to="/profile"
                onClick={() => openMenu(prev => !prev)}
                className=" py-2 text-gray-700 hover:bg-gray-100 rounded-md space-x-1"
              >
                <CgProfile className='inline' />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => handeLogout()}
                className="w-full text-left py-2 text-red-600 hover:bg-gray-100 rounded-md space-x-1"
              >
                <FiLogOut className='inline' />
                <span>Logout</span>
              </button>
            </div>}
          </div>}
          {/* Nav Links */}
          <Link to="/" onClick={() => openMenu(prev => !prev)} className="relative nav-items w-full rounded-md text-lg">Home</Link>
          <Link to="all-doctors" onClick={() => openMenu(prev => !prev)} className="relative nav-items w-full rounded-md text-lg">All Doctors</Link>
          <Link to="/about" onClick={() => openMenu(prev => !prev)} className="relative nav-items w-full rounded-md text-lg ">About</Link>
          <Link to="/contact" onClick={() => openMenu(prev => !prev)} className="relative nav-items w-full rounded-md text-lg">Contact</Link>
        </nav>
      }
    </header>
  );
}
