import React from 'react'
import SideBar from '../components/SideBar'
import { DoctorSideBar } from '../constants/constant'
import { Outlet } from 'react-router-dom'

const DoctorLayout = () => {
    return (
        <>
            <SideBar content={DoctorSideBar}/>
            {/* <DoctorNavbar /> */}
            {/* <DoctorSidebar /> */}
            <Outlet />
        </>
    )
}

export default DoctorLayout
