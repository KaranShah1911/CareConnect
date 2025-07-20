import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useDoctorStore , useAdminStore } from "../store/store";
const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("doctor");
  const {  login : Doctorlogin  } = useDoctorStore()
  const {  login : Adminlogin  } = useAdminStore()
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: replace with real auth
    try {
      if (role === "doctor") {
        const response = await axios.post(`${API_URL}/doctor/login`, formData, {
          withCredentials : true,
        });
        console.log("login successfull" , response.data) ; 
        Doctorlogin(formData);
        localStorage.setItem("docId", JSON.stringify(response.data));
        navigate('/doctor')    

      } else if (role === "admin") {
        const response = await axios.post(`${API_URL}/admin/login`, formData, {
          withCredentials : true,
        });
        Adminlogin(formData);
        console.log("login successfull" , response.data) ;
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <main className="min-h-screen flex items-center justify-center bg-indigo-50 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Lottie animation */}
        <section className="hidden md:flex w-1/2 bg-indigo-100 justify-center items-center ">
          <DotLottieReact
            src="https://lottie.host/bfcb3da2-4a40-47fa-bfc1-0a4a13fcd283/MNgczY9FUW.json"
            loop
            autoplay
          />
        </section>

        {/* Right: Login form */}
        <section className="w-full md:w-1/2 p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-[#5C67F2] text-center mb-8">
            {role === "admin" ? "Admin Login" : "Doctor Login"}
          </h1>

          {/* Role toggle */}
          <div className="flex justify-center gap-4 mb-6">
            {["doctor", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition ${role === r
                  ? "bg-[#5C67F2] text-white"
                  : "text-[#5C67F2] border-[#5C67F2]"
                  }`}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-[#5C67F2] hover:bg-[#4954d9] text-white font-medium py-2 rounded-lg transition"
            >
              Login
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
