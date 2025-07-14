import React from "react";
import { NavLink } from "react-router-dom";

const DoctorPanel = () => {
  const primary = "#5C67F2";
  return (
    <div className="flex gap-5">
      <div
        className="sticky top-6 ml-3 border shadow-2xl rounded-2xl border-gray-300 bg-white
                 h-[calc(100vh-140px)] text-xl w-fit overflow-hidden"
      >
        <nav className="flex flex-col divide-y divide-gray-200">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `pl-8 pr-20 py-4 hover:bg-[#f2f5ff] transition duration-200 ${
                isActive
                  ? "bg-[#e7ecfc] text-[#5C67F2] font-semibold"
                  : "text-[#616bef]"
              }`
            }
          >
            ☰ Dashboard
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `pl-8 pr-20 py-4 hover:bg-[#f2f5ff] transition duration-200 ${
                isActive
                  ? "bg-[#e7ecfc] text-[#5C67F2] font-semibold"
                  : "text-[#616bef]"
              }`
            }
          >
            🗓 Appointments
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `pl-8 pr-20 py-4 hover:bg-[#f2f5ff] transition duration-200 ${
                isActive
                  ? "bg-[#e7ecfc] text-[#5C67F2] font-semibold"
                  : "text-[#616bef]"
              }`
            }
          >
            👤 Profile
          </NavLink>
        </nav>
      </div>

      {/* separator */}
      <div className="border"></div>
    </div>
  );
};

export default DoctorPanel;
