import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import { useUserStore } from "./store/user"

import HomePage from "./pages/Home"
import Doctors from "./pages/Doctors"
import Contact from "./pages/Contact"
import About from "./pages/About"
import AppointmentPage from "./pages/AppointmentPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MyAppointments from "./pages/MyAppointment"
import UserProfile from "./pages/UserProfile"
import GoogleRedirect from "./pages/GoogleRedirect"

import AuthLayout from "./layouts/Authlayout"
import MainLayout from "./layouts/Mainlayout"

function App() {
  const {isLoggedin} = useUserStore()
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
          <Route path="my-appointment" element={isLoggedin ? <MyAppointments /> : <Navigate to="/auth/login"/>}></Route>
          <Route path="profile" element={isLoggedin ? <UserProfile /> : <Navigate to="/auth/login"/>}></Route>
        </Route>

        {/* Auth Layout */}
        <Route path="/auth" element={isLoggedin ? <Navigate to="/"/> : <AuthLayout />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
        </Route>

        <Route path="/google-redirect" element={<GoogleRedirect/>}></Route>
      </Routes>
      <ToastContainer position="top-left" autoClose={1500}/>
    </>
  )
}

export default App