import React from "react";
import AuthSwitch from "../components/AuthSwitch";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer"

const AuthLayout = ()=>{
    return (
        <>
            <AuthSwitch/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default AuthLayout;