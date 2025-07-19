import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthSwitch = () => {
    const navigate = useNavigate();
    const [page , setPage] = useState("login")

    const handleTogglePage = (page)=>{
        setPage(page);
        navigate(`/auth/${page}`);
    }

  return (
    <div className="w-screen h-[120px] shadow-sm bg-white fixed flex px-5">
        <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-12 h-12 md:w-[80px] md:h-[80px] rounded-full"/>
            <Link to="/" className="text-xl md:text-3xl cursor-pointer text-indigo-400">CareConnect</Link>
        </div>
        <div className="absolute rounded-full max-w-max p-1 border-1 border-gray-500 md:left-[50vw] top-1/2 -translate-y-1/2 md:-translate-x-1/2 max-md:right-1 flex ">
            <button onClick={()=>handleTogglePage("signup")} className={`transition-all duration-100 md:text-xl ${page==="signup" ? "shadow-lg bg-indigo-600 text-white" : "text-[#1E1E2F]"} rounded-full py-2 px-4 md:px-6 cursor-pointer`}>SignUp</button>
            <button onClick={()=>handleTogglePage("login")} className={`transition-all duration-100 md:text-xl ${page==="login" ? "shadow-lg bg-indigo-600 text-white" : "text-[#1E1E2F]"} rounded-full px-4 py-2 md:px-6 cursor-pointer`}>Login</button>
        </div>
    </div>
  )
    
};

export default AuthSwitch;