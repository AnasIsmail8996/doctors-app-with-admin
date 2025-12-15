import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";

const Sidebar = () => {
  const { token } = useContext(AdminContext);

  return (
    <div className="min-h-screen w-64 bg-white border-r shadow-md fixed left-0 top-0 pt-20 px-4 hidden md:flex flex-col">
      {token && (
        <ul className="flex flex-col gap-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : "text-gray-700"
              }`
            }
          >
            <img src={assets.home_icon} alt="" className="w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : "text-gray-700"
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" className="w-5 h-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : "text-gray-700"
              }`
            }
          >
            <img src={assets.add_icon} alt="" className="w-5 h-5" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-blue-100 ${
                isActive ? "bg-blue-200 font-semibold" : "text-gray-700"
              }`
            }
          >
            <img src={assets.people_icon} alt="" className="w-5 h-5" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
