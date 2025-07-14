import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useStore } from "../utils/store";

const initialappointments = [
  {
    id: 1,
    name: "Avinash Kr",
    date: "5 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Pending",
  },
  {
    id: 2,
    name: "Ravi Verma",
    date: "6 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "Completed",
  },
  {
    id: 3,
    name: "Pooja Desai",
    date: "7 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    status: "Pending",
  },
  {
    id: 4,
    name: "Karan Mehta",
    date: "8 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    status: "Cancelled",
  },
  {
    id: 5,
    name: "Shalini Rao",
    date: "9 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    status: "Completed",
  },
  {
    id: 6,
    name: "Rohan Joshi",
    date: "10 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    status: "Pending",
  },
  {
    id: 7,
    name: "Sneha Patil",
    date: "11 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "Cancelled",
  },
  {
    id: 8,
    name: "Deepak Sharma",
    date: "12 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    status: "Completed",
  },
  {
    id: 9,
    name: "Alok Pandey",
    date: "13 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    status: "Pending",
  },
  {
    id: 10,
    name: "Mitali Kaur",
    date: "14 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    status: "Completed",
  },
  {
    id: 11,
    name: "Shubham Tiwari",
    date: "15 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    status: "Pending",
  },
  {
    id: 12,
    name: "Ritika Singh",
    date: "16 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    status: "Cancelled",
  },
  {
    id: 13,
    name: "Sameer Shaikh",
    date: "17 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/37.jpg",
    status: "Completed",
  },
  {
    id: 14,
    name: "Disha More",
    date: "18 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    status: "Pending",
  },
  {
    id: 15,
    name: "Akash Jain",
    date: "19 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    status: "Cancelled",
  },
  {
    id: 16,
    name: "Ritu Agarwal",
    date: "20 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    status: "Completed",
  },
  {
    id: 17,
    name: "Nikhil Raj",
    date: "21 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    status: "Completed",
  },
  {
    id: 18,
    name: "Avni Chawla",
    date: "22 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    status: "Pending",
  },
  {
    id: 19,
    name: "Tanmay Shah",
    date: "23 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
    status: "Cancelled",
  },
  {
    id: 20,
    name: "Neha Jadhav",
    date: "24 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
    status: "Completed",
  },
  {
    id: 21,
    name: "Yash Patil",
    date: "25 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    status: "Pending",
  },
  {
    id: 22,
    name: "Aarti Bhosale",
    date: "26 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    status: "Completed",
  },
  {
    id: 23,
    name: "Saurabh Dube",
    date: "27 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    status: "Cancelled",
  },
];

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState(initialappointments);
  const sidebar = useStore((state) => state.sidebar);
  const perPage = 8;
  const totalPages = Math.ceil(appointments.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setStart(perPage * (page - 1));
    setEnd(page * perPage);
  }

  const handleStatusChange = (id, newStatus) => {
    //backend call to update status
    try {
      console.log(id)
      setAppointments((prev) => prev.map((app) => {
        if (app.id === id) return { ...app, status: newStatus };
        return app;
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen gap-5 p-5 ${sidebar ? "pl-[200px]" : "pl-[60px]"} transition-all duration-300 pt-30`}>
      <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
        {/* Earnings */}
        <div className="flex items-center gap-4 bg-[#5C67F2] p-4 rounded-xl shadow-sm">
          <img
            src="https://cdn-icons-png.flaticon.com/128/9162/9162786.png"
            alt="earning"
            className="h-12 w-12 rounded-md p-1 filter invert"
          />
          <div>
            <p className="text-xl">Earnings</p>
            <p className="text-2xl font-bol">$2,450</p>
          </div>
        </div>
        {/* Appointments Count */}
        <div className="flex items-center gap-4 bg-[#5C67F2] p-4 rounded-xl shadow-sm">
          <img
            src="https://cdn-icons-png.flaticon.com/128/7322/7322265.png"
            alt="appointments"
            className="h-12 w-12 rounded-md p-1 filter invert"
          />
          <div>
            <p className="text-xl">Appointments</p>
            <p className="text-2xl font-bold">35</p>
          </div>
        </div>
        {/* Patient Count */}
        <div className="flex items-center gap-4 bg-[#5C67F2] p-4 rounded-xl shadow-sm">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3358/3358902.png"
            alt="patients"
            className="h-12 w-12 rounded-md p-1 filter invert"
          />
          <div>
            <p className="">Patients</p>
            <p className="text-2xl font-bold">22</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className=" mt-5">
        <h2 className="text-2xl font-semibold text-[#5C67F2] mb-4">
          Latest Bookings
        </h2>
        <table className="w-full text-sm text-gray-700 border-collapse">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="text-left px-4 py-2">Patient</th>
              <th className="text-left px-4 py-2">Booking Date</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-center px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice(start, end).map((apt) => (
              <tr key={apt.id} className="border-b">
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={apt.image}
                    alt={apt.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-semibold text-gray-800">{apt.name}</span>
                </td>
                <td className="px-4 py-3">{apt.date}</td>
                <td className="px-4 py-3 font-semibold">
                  {apt.status === "Completed" && (
                    <span className="text-green-500">Completed</span>
                  )}
                  {apt.status === "Cancelled" && (
                    <span className="text-red-400">Cancelled</span>
                  )}
                  {apt.status === "Pending" && (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {apt.status === "Pending" && (
                    <div className="flex justify-center gap-3 text-lg">
                      <CheckCircle
                        title="Mark as Completed"
                        onClick={() => handleStatusChange(apt.id, "Completed")}
                        className="text-green-600 hover:scale-110 transition size-7 cursor-pointer"
                      />
                      <XCircle
                        title="Cancel Appointment"
                        onClick={() => handleStatusChange(apt.id, "Cancelled")}
                        className="text-red-500 hover:scale-110 transition size-7 cursor-pointer"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Component */}
      <div className="flex items-center gap-2 mt-5">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-2 border-1 p-2 rounded-xl cursor-pointer bg-[#5C67F2] text-white"><FaArrowLeft /><span>Previous</span></button>
        {
          Array(totalPages).keys().map((ind) => <button onClick={() => handlePageChange(ind + 1)} key={ind} className={`border-1 rounded-md p-2 cursor-pointer ${currentPage === ind + 1 ? "bg-[#5C67F2] text-white" : ""}`}>{ind + 1}</button>)
        }
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center border-1 p-2 rounded-xl cursor-pointer bg-[#5C67F2] text-white"><span>Next</span><FaArrowRight /></button>
      </div>
      
    </div>
  );
};

export default DoctorDashboard;
