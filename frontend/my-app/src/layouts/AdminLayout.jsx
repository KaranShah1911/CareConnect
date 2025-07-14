import React from 'react'
import SideBar from '../components/SideBar'
import {AdminSideBar} from "../constants/constant"
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <SideBar content={AdminSideBar} />
            <Outlet />
        </>
    )
}

export default AdminLayout
