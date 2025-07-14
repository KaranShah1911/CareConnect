import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { FaWpforms } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useStore } from '../utils/store';

const SideBar = ({content}) => {
    const sidebar = useStore((state) => state.sidebar);
    const toggleSidebar = useStore((state) => state.toggleSidebar);
    return (<>
        {/* Navbar */}
        <nav className='fixed w-full h-[80px] border-b border-indigo-600 shadow-sm bg-white'>
            <div className='w-[90%] h-full flex justify-between items-center p-2  mx-auto'>
                {/* Logo */}
                <div className='flex w-[30%] h-full items-center gap-2'>
                    <img src="/logo.png" alt="" className='w-[65px] h-full rounded-full' />
                    <span className='text-xl'>CareConnect</span>
                </div>
                {/* Logout */}
                <button className='text-xl bg-indigo-500 p-3 text-white rounded-xl'>Log Out</button>
            </div>
        </nav>

        {/* Sidebar Content */}
        <div className='fixed flex min-w-max top-[80px]'>
            <button onClick={toggleSidebar} className={`transition-all duration-300 absolute top-4 ${sidebar ? "left-[180px]" : "left-[40px]"} -translate-x-1/2 w-[40px] h-[40px] bg-gray-100 border-1 border-indigo-600 text-indigo-600 rounded-full cursor-pointer`}>
                {sidebar ? <FaAngleLeft className='w-full h-full p-2' /> : <FaAngleRight className='w-full h-full p-2' />}
            </button>

            <aside id="navigation-bar" className={`h-screen transition-all duration-300 bg-white border-r  border-indigo-600 overflow-hidden ${sidebar ? "w-[180px]" : "w-[40px]"}`}>
                {
                    sidebar && <div className='p-2 text-xl text-indigo-700'>
                        <Link to={content[0].link} className='p-2 rounded-md flex items-center justify-start gap-1 hover:bg-indigo-100'><RxDashboard className='inline' /><span>{content[0].name}</span></Link>
                        <Link to={content[1].link} className='p-2 rounded-md flex items-center justify-start gap-1 hover:bg-indigo-100'><FaWpforms className='inline' /> <span>{content[1].name}</span></Link>
                        <Link to={content[2].link} className='p-2 rounded-md flex items-center justify-start gap-1 hover:bg-indigo-100'><IoPeople className='inline' /><span>{content[2].name}</span></Link>
                    </div>
                }

            </aside>
        </div>
    </>
    )
}

export default SideBar
