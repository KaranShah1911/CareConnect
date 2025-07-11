import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const AuthSwitch = () => {
    const navigate = useNavigate();
    const [page , setPage] = useState("login")

    const handleTogglePage = (page)=>{
        setPage(page);
        navigate(`/${page}`);
    }

  return (
    <div className="w-[100vw] h-[120px] shadow-md bg-white fixed flex px-5">
        <div className="flex items-center gap-2">
            <img src="/logo.png" alt="logo" className="w-[80px] h-[80px] rounded-full"/>
            <span className="text-3xl cursor-pointer">CareConnect</span>
        </div>
        <div className="rounded-full max-w-max p-1 text-2xl border-1 border-gray-500 m-auto ml-1/2 -translate-x-1/2">
            <button onClick={()=>handleTogglePage("signup")} className={`${page==="signup" ? "bg-indigo-600 text-white" : "text-[#1E1E2F]"} rounded-full py-2 px-6 cursor-pointer`}>SignUp</button>
            <button onClick={()=>handleTogglePage("login")} className={`${page==="login" ? "bg-indigo-600 text-white" : "text-[#1E1E2F]"} rounded-full py-2 px-6 cursor-pointer`}>Login</button>
        </div>
    </div>
  )
    
};

export default AuthSwitch;
