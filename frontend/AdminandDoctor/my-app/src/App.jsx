import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";

import DoctorDashboard from "./pages/DoctorDashboard"
import DoctorAppointments from "./pages/DoctorAppointments"
import DoctorProfile from "./pages/DoctorProfile"

import AdminDashboard from "./pages/AdminDashboard"
import AddDoctor from "./pages/AddDoctor"
import AllDoctors from "./pages/AllDoctors"

import AdminLayout from "./layouts/AdminLayout"
import DoctorLayout from "./layouts/DoctorLayout"
import { useDoctorStore , useAdminStore } from './store/store'

import AdminDoctorLogin from "./pages/AdminDoctorLogin"


function App() {
  const doctor = useDoctorStore((state)=>state.doctor);
  const admin = useAdminStore((state)=>state.admin);
  return (
    <>
      <Routes>

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
      <ToastContainer position="top-left" autoClose={1500}/>
    </>
  )
}

export default App