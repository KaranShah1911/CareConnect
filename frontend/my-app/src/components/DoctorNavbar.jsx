import React from "react";

const DoctorNavbar = () => {
  return (
    // {/* Navbar */}
    <nav className="fixed w-full h-[80px] border-b border-indigo-600 shadow-sm bg-white">
      <div className="w-[90%] h-full flex justify-between items-center p-2  mx-auto">
        {/* Logo */}
        <div className="flex w-[30%] h-full items-center gap-2">
          <img
            src="/logo.png"
            alt=""
            className="w-[65px] h-full rounded-full"
          />
          <span className="text-xl">CareConnect</span>
        </div>
        {/* Logout */}
        <button className="text-xl bg-indigo-500 p-3 text-white rounded-xl">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
