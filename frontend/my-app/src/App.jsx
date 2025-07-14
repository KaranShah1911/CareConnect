import React from "react"
import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import HomePage from "./pages/Home"
import Doctors from "./pages/Doctors"
import Contact from "./pages/Contact"
import About from "./pages/About"
import AppointmentPage from "./pages/AppointmentPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AuthSwitch from "./pages/AuthSwitch"
import MyAppointments from "./components/MyAppointment"
import DoctorDashboard from "./pages/DoctorDashboard"
import DoctorPanel from "./pages/DoctorPanel"
import DoctorAppointments from "./pages/DoctorAppointments"
import DoctorProfile from "./pages/DoctorProfile"


function App() {
  return (
    <>
      
      <Navbar />
      {/* <AuthSwitch/> */}
      <div className="pt-30">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/all-doctors" element={<Doctors />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/appointment" element={<AppointmentPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/my-appointment" element={<MyAppointments/>}></Route>
        {/* doctor dashboard is the entry to doctor panel */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard/>}> </Route> 
        <Route path="/doctor-appointments" element={<DoctorAppointments/>}> </Route>
        <Route path="/doctor-profile" element={<DoctorProfile/>}> </Route>
      </Routes>
      </div>
      
      {/* for doctor and admin panel - footer is not there */}
      <Footer /> 

    </>
  )
}

export default App