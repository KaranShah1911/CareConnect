import React from 'react'
import SideBar from '../components/SideBar'
import {AdminSideBar} from "../constants/constant"
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <>
            <SideBar content={AdminSideBar} role={"admin"} />
            <Outlet />
        </>
    )
}

export default AdminLayout
