import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, setToken, userData, loadProfileData, loadingProfile: contextLoading } = useContext(AppContext);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const navigate = useNavigate();

  // Load profile data when token changes
  useEffect(() => {
    if (token) {
      setLoadingProfile(true);
      loadProfileData().finally(() => setLoadingProfile(false));
    } else {
      setLoadingProfile(false);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const isLoggedIn = token && userData;

  const renderUserMenu = () => (
    <div className="relative group cursor-pointer flex items-center gap-2">
      <img src={userData.image} alt="User" className="w-9 h-9 rounded-full border" />
      <img src={assets.dropdown_icon} alt="Dropdown" className="w-3" />
      <div className="absolute right-0 top-12 w-40 bg-white shadow-md rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <p onClick={() => navigate("/my-profile")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Profile</p>
        <p onClick={() => navigate("/my-appointments")} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Appointments</p>
        <p onClick={logout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">Logout</p>
      </div>
    </div>
  );

  return (
    <nav className="w-full shadow-sm bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
        <img src={assets.logo} alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-600"}>Home</NavLink>
        <NavLink to="/doctors" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-600"}>All Doctors</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-600"}>About</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "text-blue-600" : "hover:text-blue-600"}>Contact</NavLink>
      </ul>

      {/* Right Side (Desktop) */}
      <div className="hidden md:block">
        {loadingProfile || contextLoading ? (
          <p>Loading...</p>
        ) : isLoggedIn ? renderUserMenu() : (
          <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-gray-700 text-2xl cursor-cell" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-6 py-6 text-gray-800 font-medium shadow-md md:hidden">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/doctors" onClick={() => setMenuOpen(false)}>All Doctors</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>

          {loadingProfile || contextLoading ? (
            <p>Loading...</p>
          ) : isLoggedIn ? (
            <>
              <p onClick={() => { navigate("/my-profile"); setMenuOpen(false); }}>My Profile</p>
              <p onClick={() => { navigate("/my-appointments"); setMenuOpen(false); }}>My Appointments</p>
              <p onClick={() => { logout(); setMenuOpen(false); }} className="text-red-500">Logout</p>
            </>
          ) : (
            <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
              Create Account
            </button>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
