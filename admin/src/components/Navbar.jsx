    import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import {useNavigate} from "react-router-dom"
const Navbar = () => {
  const { token, setToken } = useContext(AdminContext);
const navigate=useNavigate()
  const logout = () => {
    if (token) {
      setToken("");
      localStorage.removeItem("token");
    }
    navigate('/')
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Left Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src={assets.admin_logo}
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
        <h1 className="text-xl font-bold text-gray-800">
          {token ? "Admin Panel" : "Doctor Panel"}
        </h1>
      </div>

      {/* Right Side (Profile & Logout) */}
      <div className="flex items-center gap-4">
        {/* Profile Avatar */}
        <div className="flex items-center gap-2">
          <img
            src={assets.doctor_icon}
            alt="Profile"
            className="w-9 h-9 rounded-full border border-gray-300 object-cover"
          />
          <span className="hidden sm:block text-gray-700 font-medium">
            {token ? "Admin" : "Doctor"}
          </span>
        </div>

        {/* Logout Button */}
        {token && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-all"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
