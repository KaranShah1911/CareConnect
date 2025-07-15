import {React, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../utils/store';
import { FaGoogle } from "react-icons/fa";



const AdminDoctorLogin = ({loginIdentity = "Admin"}) => {
  const [data, setData] = useState({ email: "", password: "" });
// for doctor and admin differnt state will be made
//   const login = useStore((state)=>state.login);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with:", data);
    // login();
    navigate("/")
    // Add login logic here
    // depending on the loginIdentity different api call will be made
  };

  const handleSwitchLogin = () => {
    if(loginIdentity == "Doctor") navigate('/admin/login')
    else if(loginIdentity == "Admin") navigate('/doctor/login')
  }

  return (
    <div className="fixed w-screen min-h-screen flex flex-col justify-center items-center px-4 bg-white gap-10">
      <h1 className="text-3xl text-[#1E1E2F] text-center">
        {`Log in to ${loginIdentity} Profile`}
      </h1>


      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-sm flex flex-col gap-4"
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
            //   required
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
            //   required
              className="h-12 w-full px-3 outline-none"
            />
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-violet-500" /> Remember me
            </label>
            <button type='button' onClick={() => handleSwitchLogin()} className="text-violet-600 underline">{`${loginIdentity=="Doctor" ? "Admin" : "Doctor"} Signup?`}</button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default AdminDoctorLogin