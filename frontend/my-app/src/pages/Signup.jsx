import axios from "axios";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "../utils/user";
import Loader from "../components/Loader";
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "", name: "" });
  const [termsAcepted, settermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useUserStore();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAcepted) {
      toast.error("Accept terms");
      return;
    }
    if (data.password.length < 8) {
      toast.warn("password length must be atleast 8 characters");
      return;
    }
    console.log("Sign up with:", data);
    try {
      setLoading(true);
      axios
        .post(`${API_URL}/user/register`, data, {
          withCredentials: true,
        })
        .then((res) => {
          const image = res.data.image;
          login(image);
          toast.success("User account created");
          navigate("/profile");
        })
        .catch((error) => {
          console.log(error.response);
          toast.error(error.response.data.message);
        })
        .finally(() => {
          setData({
            name: "",
            password: "",
            email: "",
          });
        });
        setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  if (loading) return (
    <div className="fixed inset-0 z-1 flex items-center bg-white">
      <Loader />
    </div>
  )

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center px-4 bg-white gap-10 pt-20 md:pt-20">
      <h1 className="text-2xl md:text-3xl text-[#1E1E2F] text-center">
        Join <span className="text-indigo-400">CareConnect</span> and connect
        with trusted Doctors
      </h1>
      {/* Google Button */}
      <button
        type="button"
        onClick={() => handleGoogleLogin()}
        className="flex items-center justify-center gap-3 text-[#1E1E2F] text-lg bg-violet-50 border border-violet-300 px-6 py-3 rounded-lg hover:bg-violet-50 transition w-full max-w-sm cursor-pointer"
      >
        <FaGoogle className="text-red-500" />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 text-gray-400 text-sm w-full max-w-sm">
        <div className="h-px bg-gray-300 flex-1" />
        OR
        <div className="h-px bg-gray-300 flex-1" />
      </div>

      {/* Sign up Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-sm flex flex-col gap-2"
      >
        <div className="flex flex-col ">
          <label className="text-sm mb-1 text-indigo-700">Email</label>
          <div className="flex items-center border rounded-lg px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 32 32"
            >
              <path
                fill="#432dd7"
                d="M30.853 13.87a15 15 0 0 0-29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0-1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1-4.158-.759v-10.856a1 1 0 0 0-2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zM16 22a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6z"
              />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={data.email}
              onChange={handleChange}
              required
              className="h-12 w-full px-3 outline-none "
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1 text-indigo-700">Password</label>
          <div className="flex items-center border rounded-lg px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 512 512"
            >
              <path
                fill="#432dd7"
                d="M336 512H48c-26.453 0-48-21.523-48-48V240c0-26.477 21.547-48 48-48h288c26.453 0 48 21.523 48 48v224c0 26.477-21.547 48-48 48zM48 224c-8.813 0-16 7.168-16 16v224c0 8.832 7.187 16 16 16h288c8.813 0 16-7.168 16-16V240c0-8.832-7.187-16-16-16z"
              />
              <path
                fill="currentColor"
                d="M304 224c-8.832 0-16-7.168-16-16v-80c0-52.93-43.07-96-96-96S96 75.07 96 128v80c0 8.832-7.168 16-16 16s-16-7.168-16-16v-80c0-70.594 57.406-128 128-128s128 57.406 128 128v80c0 8.832-7.168 16-16 16z"
              />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={data.password}
              onChange={handleChange}
              required
              className="h-12 w-full px-3 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1 text-indigo-700">Name</label>
          <div className="flex items-center border rounded-lg px-3">
            <svg fill="#432dd7" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" stroke="#432dd7">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"></path>
              </g>
            </svg>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={data.name}
              onChange={handleChange}
              required
              className="h-12 w-full px-3 outline-none"
            />
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={(e) => settermsAccepted(e.target.checked)}
                className="accent-violet-500 cursor-pointer"
              />
              Accept the
              <a href="/term-and-conditions" className="text-indigo-500">
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
