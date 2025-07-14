import React from "react"
import { Route, Routes } from "react-router-dom"

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
import DoctorPanel from "./components/DoctorPanel"
import DoctorAppointments from "./pages/DoctorAppointments"
import DoctorProfile from "./pages/DoctorProfile"

import AdminDashboard from "./pages/AdminDashboard"
import AddDoctor from "./pages/AddDoctor"
import AllDoctors from "./pages/AllDoctors"

import AuthLayout from "./layouts/Authlayout"
import MainLayout from "./layouts/Mainlayout"
import AdminLayout from "./layouts/AdminLayout"
import DoctorLayout from "./layouts/DoctorLayout"



function App() {
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
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorDashboard />}/>
          <Route path="/doctor/appointments" element={<DoctorAppointments />}> </Route>
          <Route path="/doctor/profile" element={<DoctorProfile />}> </Route>
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />}/>
          <Route path="/admin/add-doctor" element={<AddDoctor />}></Route>
          <Route path="/admin/doctors" element={<AllDoctors />}></Route>
        </Route>
      </Routes>
      {/* for doctor and admin panel - footer is not there */}

    </>
  )
}

export default App