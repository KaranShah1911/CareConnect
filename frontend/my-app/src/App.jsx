import React, { useState, useEffect } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import HomePage from "./pages/Home"
import Doctors from "./pages/Doctors"
import Contact from "./pages/Contact"
import About from "./pages/About"
import AppointmentPage from "./pages/AppointmentPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MyAppointments from "./pages/MyAppointment"
import UserProfile from "./pages/UserProfile"

import DoctorDashboard from "./pages/DoctorDashboard"
import DoctorAppointments from "./pages/DoctorAppointments"
import DoctorProfile from "./pages/DoctorProfile"

import AdminDashboard from "./pages/AdminDashboard"
import AddDoctor from "./pages/AddDoctor"
import AllDoctors from "./pages/AllDoctors"

import AuthLayout from "./layouts/Authlayout"
import MainLayout from "./layouts/Mainlayout"
import AdminLayout from "./layouts/AdminLayout"
import DoctorLayout from "./layouts/DoctorLayout"
import { useDoctorStore , useAdminStore } from './utils/store'

import AdminDoctorLogin from "./pages/AdminDoctorLogin"



function App() {
  const doctor = useDoctorStore((state)=>state.doctor);
  const admin = useAdminStore((state)=>state.admin);
  return (
    <>
      <Routes>
        {/* User Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="all-doctors" element={<Doctors />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="appointment" element={<AppointmentPage />}></Route>
          <Route path="my-appointment" element={<MyAppointments />}></Route>
          <Route path="profile" element={<UserProfile />}></Route>
        </Route>

        {/* Auth Layout */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
        </Route>

        {/* Doctor Layout */}
        <Route path="/doctor" element={doctor ? <DoctorLayout /> : <Navigate to="/login" />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />}> </Route>
          <Route path="profile" element={<DoctorProfile />}> </Route>
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={admin ? <AdminLayout /> : <Navigate to="/login"/>}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-doctor" element={<AddDoctor />}></Route>
          <Route path="doctors" element={<AllDoctors />}></Route>
        </Route>

        <Route path="/login" element={<AdminDoctorLogin />}></Route>
      </Routes>
      {/* for doctor and admin panel - footer is not there */}

    </>
  )
}

export default App