import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setToken, backendUrl } = useContext(AdminContext);

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    if (state === "Admin") {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", data);

      if (data.status) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(data.message || "Admin Login Successful");
      } else {
        toast.error(data.message);
      }

    } else {
      toast.error("Doctor login not implemented!");
    }

  } catch (error) {
    toast.error(error.response?.data?.message || "Server error, try again later!");
  }
};

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mt-12"
      >
        <div className="text-center mb-6">
          <img
            src={assets.admin_logo}
            alt="Logo"
            className="w-16 h-16 mx-auto mb-3 object-contain"
          />
          <h2 className="text-2xl font-bold text-gray-800">
            {state} <span className="text-blue-600">Login</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Please enter your credentials below
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition-all"
        >
          Login
        </button>

        {/* Toggle Between Admin / Doctor */}
        <div className="text-center mt-4 text-sm text-gray-600">
          {state === "Admin" ? (
            <p>
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
