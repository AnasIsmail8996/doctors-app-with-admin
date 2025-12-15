import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign UP'); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {  backendUrl, token, setToken}= useContext(AppContext)

const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      if (state === 'Sign UP') {
     const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if(data.status){
          localStorage.setItem("token", data.token)
          setToken(data.token)
           toast.success(data.message || "Signup successful");
            navigate("/");
        }else{
          toast.error(data.message)
        }
     
      } else {
  const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

    if (data.status) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success(data.message); 
      navigate("/"); 
    } else {
      toast.error(data.message);
    }
      }
    } catch (error) {
      toast.error(error.message)
    }
  };


  useEffect(()=>{
if(token){
  navigate('/')
}
  },[token])

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {state === 'Sign UP' ? 'Create an Account' : 'Login'}
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Please {state === 'Sign UP' ? 'Sign Up' : 'Login'} to book appointments
          </p>
        </div>

        {/* Full Name Input (Sign UP only) */}
        {state === 'Sign UP' && (
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {/* Email Input */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <label className="text-gray-700 mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-medium py-2.5 rounded-md transition"
        >
          {state === 'Sign UP' ? 'Create Account' : 'Login'}
        </button>

        {/* Toggle Sign UP / Login */}
        <p className="text-center text-gray-600 text-sm md:text-base">
          {state === 'Sign UP' ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState('Login')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{' '}
              <span
                onClick={() => setState('Sign UP')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </section>
  );
};

export default Login;
