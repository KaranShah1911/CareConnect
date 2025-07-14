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
    <div className="w-[100vw] h-[120px] shadow-sm bg-white fixed flex px-5">
        <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] rounded-full"/>
            <Link to="/" className="text-3xl cursor-pointer text-indigo-400">CareConnect</Link>
        </div>
        <div className="rounded-full max-w-max p-1 text-xl border-1 border-gray-500 m-auto ml-1/2 -translate-x-1/2">
            <button onClick={()=>handleTogglePage("signup")} className={`transition-all duration-100 ${page==="signup" ? "shadow-lg bg-indigo-600 text-white" : "text-[#1E1E2F]"} rounded-full py-2 px-6 cursor-pointer`}>SignUp</button>
            <button onClick={()=>handleTogglePage("login")} className={`transition-all duration-100 ${page==="login" ? "shadow-lg bg-indigo-600 text-white" : "text-[#1E1E2F]"} rounded-full py-2 px-6 cursor-pointer`}>Login</button>
        </div>
    </div>
  )
    
};

export default AuthSwitch;