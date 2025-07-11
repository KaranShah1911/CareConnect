import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });

    const handleChange = (e) =>
        setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login with:", data);
        // Add login logic here
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center px-4 bg-white gap-10">
            <h1 className="text-3xl text-[#1E1E2F] text-center">
                Log in to your existing profile
            </h1>

            {/* Google Button */}
            <button
                type="button"
                onClick={() => console.log("Google login")}
                className="flex items-center justify-center gap-3 text-[#1E1E2F] text-lg bg-violet-50 border border-violet-300 px-6 py-3 rounded-lg hover:bg-violet-50 transition w-full max-w-sm"
            >
                <FaGoogle className="text-red-500" />
                Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-400 text-sm w-full max-w-sm">
                <div className="h-px bg-gray-300 flex-1" />
                OR
                <div className="h-px bg-gray-300 flex-1" />
            </div>

            {/* Login Form */}
            <form
                onSubmit={handleSubmit}
                className="space-y-4 w-full max-w-sm flex flex-col gap-4"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                    required
                    className="h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                <div className="flex flex-col">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleChange}
                        required
                        className="h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                    <small><button className="underline text-violet-700 cursor-pointer">Forget Password?</button></small>
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Login;
