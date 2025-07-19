import { React, useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useStore } from "../store/store";
import axios from "axios";
import { toast } from "react-toastify";

// dummy appointments data
// const appointments = [
//   {
//     id: 0,
//     name: "Avinash Kr",
//     age: 31,
//     payment: "CASH",
//     dateTime: "5 Oct 2024, 12:00 PM",
//     fee: "$50",
//     status: "Pending",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     id: 1,
//     name: "Ravi Verma",
//     age: 29,
//     payment: "Online",
//     dateTime: "6 Oct 2024, 11:30 AM",
//     fee: "$45",
//     status: "Pending",
//     image: "https://randomuser.me/api/portraits/men/45.jpg",
//   },
//   {
//     id: 2,
//     name: "Pooja Desai",
//     age: 26,
//     payment: "CASH",
//     dateTime: "6 Oct 2024, 03:00 PM",
//     fee: "$50",
//     status: "Completed",
//     image: "https://randomuser.me/api/portraits/women/47.jpg",
//   },
//   {
//     id: 3,
//     name: "Karan Mehta",
//     age: 34,
//     payment: "Online",
//     dateTime: "7 Oct 2024, 10:00 AM",
//     fee: "$60",
//     status: "Cancelled",
//     image: "https://randomuser.me/api/portraits/men/28.jpg",
//   },
//   {
//     id: 4,
//     name: "Shalini Rao",
//     age: 30,
//     payment: "CASH",
//     dateTime: "7 Oct 2024, 04:00 PM",
//     fee: "$55",
//     status: "Pending",
//     image: "https://randomuser.me/api/portraits/women/50.jpg",
//   },
//   {
//     id: 5,
//     name: "Rohan Joshi",
//     age: 27,
//     payment: "Online",
//     dateTime: "8 Oct 2024, 02:30 PM",
//     fee: "$40",
//     status: "Completed",
//     image: "https://randomuser.me/api/portraits/men/58.jpg",
//   },
//   {
//     id: 6,
//     name: "Sneha Patil",
//     age: 23,
//     payment: "CASH",
//     dateTime: "8 Oct 2024, 05:00 PM",
//     fee: "$35",
//     status: "Cancelled",
//     image: "https://randomuser.me/api/portraits/women/65.jpg",
//   },
//   {
//     id: 7,
//     name: "Deepak Sharma",
//     age: 36,
//     payment: "Online",
//     dateTime: "9 Oct 2024, 01:00 PM",
//     fee: "$50",
//     status: "Pending",
//     image: "https://randomuser.me/api/portraits/men/40.jpg",
//   },
//   {
//     id: 8,
//     name: "Alok Pandey",
//     age: 38,
//     payment: "CASH",
//     dateTime: "9 Oct 2024, 11:00 AM",
//     fee: "$50",
//     status: "Completed",
//     image: "https://randomuser.me/api/portraits/men/21.jpg",
//   },
//   {
//     id: 9,
//     name: "Mitali Kaur",
//     age: 25,
//     payment: "Online",
//     dateTime: "10 Oct 2024, 09:30 AM",
//     fee: "$45",
//     status: "Completed",
//     image: "https://randomuser.me/api/portraits/women/33.jpg",
//   },
//   {
//     id: 10,
//     name: "Shubham Tiwari",
//     age: 28,
//     payment: "CASH",
//     dateTime: "10 Oct 2024, 03:45 PM",
//     fee: "$40",
//     status: "Pending",
//     image: "https://randomuser.me/api/portraits/men/19.jpg",
//   },
//   {
//     id: 11,
//     name: "Ritika Singh",
//     age: 24,
//     payment: "Online",
//     dateTime: "11 Oct 2024, 12:15 PM",
//     fee: "$50",
//     status: "Cancelled",
//     image: "https://randomuser.me/api/portraits/women/26.jpg",
//   },
//   {
//     id: 12,
//     name: "Sameer Shaikh",
//     age: 32,
//     payment: "CASH",
//     dateTime: "11 Oct 2024, 06:00 PM",
//     fee: "$60",
//     status: "Completed",
//     image: "https://randomuser.me/api/portraits/men/37.jpg",
//   },
//   {
//     id: 13,
//     name: "Disha More",
//     age: 29,
//     payment: "Online",
//     dateTime: "12 Oct 2024, 10:30 AM",
//     fee: "$55",
//     status: "Pending",
//     image: "https://randomuser.me/api/portraits/women/21.jpg",
//   },
// ];

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] =
    useState([]);
  const [filter, setFilter] = useState({
    patient: "",
    status: "all",
  });
  const sidebar = useStore((state) => state.sidebar);

  const API_URL = import.meta.env.VITE_API_URL;
  // fetch appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctor/appointments`, {
          withCredentials: true,
        });
        // const {name, age, _id} =  
        setAppointments(response.data.appointments);
        setFilteredAppointments(response.data.appointments);
        console.log("appointments fetched successfully", response.data.appointments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // handle status changes
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      let response ;
      if(newStatus == "Completed") {
        response = await axios.post(`${API_URL}/doctor/complete-appointment` , {appointmentId}, {withCredentials: true})
        toast.success("Appointment Completed")
        setAppointments((prev) =>
        prev.map((app) => {
          if (app._id === appointmentId) return { ...app, isCompleted : true  };
          return app;
        }))
        setFilteredAppointments((prev) =>
        prev.map((app) => {
          if (app._id === appointmentId) return { ...app, isCompleted : true  };
          return app;
        })
      );
      }
      else {
        response = await axios.post(`${API_URL}/doctor/cancel-appointment` , {appointmentId}, {withCredentials: true})
        toast.success("Appointment Cancelled")
        setAppointments((prev) =>
        prev.map((app) => {
          if (app._id === appointmentId) return { ...app, cancelled : true  };
          return app;
        }))
        setFilteredAppointments((prev) =>
        prev.map((app) => {
          if (app._id === appointmentId) return { ...app, cancelled : true  };
          return app;
        }))
        
      }
      console.log("status changed successfully", response.data)
    } catch (err) {
      console.log(err);
    }
  };

  // pagination logic
  const perPage = 8;
  const totalPages = Math.ceil(filteredAppointments.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setStart(perPage * (page - 1));
    setEnd(page * perPage);
  };

  const filterByPatient = (e) => {
    const name = e.target.value.toLowerCase();
    setFilter((prev) => {
      return { ...prev, [e.target.name]: name };
    });
    setFilteredAppointments(
      appointments.filter(
        (app) =>
          app.userId.name.toLowerCase().includes(name) &&
          (filter.status === "all" || (filter.status=="completed" ? app.isCompleted : filter.status==="cancelled" ? app.cancelled : (!app.isCompleted && !app.cancelled)))
      )
    );
  };
  const filterByStatus = (e) => {
    const status = e.target.value;
    setFilter((prev) => {
      return { ...prev, [e.target.name]: status };
    });
    setFilteredAppointments(
      appointments.filter(
        (app) =>
          app.userId.name.toLowerCase().includes(filter.patient) &&
          (status === "all" || (status=="completed" ? app.isCompleted : status==="cancelled" ? app.cancelled : (!app.isCompleted && !app.cancelled)))
      )
    );
  };

  return (
    <div
      className={`flex flex-col min-h-screen gap-2 p-5 pt-30 ${
        sidebar ? "pl-50" : "pl-15"
      } transition-all duration-300`}
    >
      <div className="flex flex-col gap-5">
        {/* Header + Filters */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-semibold text-[#5C67F2]">
            All Appointments
          </h1>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                Filter by status:
              </label>
              <select
                name="status"
                value={filter.status}
                onChange={filterByStatus}
                className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Patient Search */}
            <input
              type="text"
              name="patient"
              onChange={filterByPatient}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-violet-700 w-full sm:w-auto"
              placeholder="Search Patient"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-[720px] w-full text-sm sm:text-base text-gray-700 border-collapse">
            <thead className="bg-gray-100 font-semibold">
              <tr className="text-left">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Patient</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Date & Time</th>
                <th className="px-4 py-2">Fees</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.slice(start, end).map((appointment, index) => (
                  <tr key={appointment._id} className="border-b">
                    <td className="px-4 py-4">{index+1}</td>
                    <td className="px-4 py-4 flex items-center">
                      <img
                        src={appointment.userId.image}
                        alt="patient.img"
                        className="w-10 h-10 rounded-full object-cover mr-2"
                      />
                      {appointment.userId.name}
                    </td>
                    <td className="px-4 py-4">{appointment.payment ? "cash" : "online"}</td>
                    <td className="px-4 py-4">{appointment.userId.age}</td>
                    <td className="px-4 py-4">{appointment.slotDate + ", " + appointment.slotTime}</td>
                    <td className="px-4 py-4">{appointment.amount}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center text-center">
                        <div className="text-md font-semibold">
                          {appointment.isCompleted && (
                            <span className="text-green-500">Completed</span>
                          )}
                          {appointment.cancelled && (
                            <span className="text-red-400">Cancelled</span>
                          )}
                        </div>
                        {!appointment.isCompleted && !appointment.cancelled && (
                          <div className="flex gap-3 text-lg justify-center">
                            <CheckCircle
                              onClick={() =>
                                handleStatusChange(appointment._id, "Completed")
                              }
                              className="text-green-600 hover:scale-110 transition size-6 cursor-pointer"
                            />
                            <XCircle
                              onClick={() =>
                                handleStatusChange(appointment._id, "Cancelled")
                              }
                              className="text-red-500 hover:scale-110 transition size-6 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-4 text-center text-red-500"
                  >
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 border p-2 rounded-xl bg-[#5C67F2] text-white disabled:opacity-50"
          >
            <FaArrowLeft />
            <span>Previous</span>
          </button>

          {Array.from({ length: totalPages }).map((_, ind) => (
            <button
              key={ind}
              onClick={() => handlePageChange(ind + 1)}
              className={`border p-2 rounded-md ${
                currentPage === ind + 1 ? "bg-[#5C67F2] text-white" : ""
              }`}
            >
              {ind + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 border p-2 rounded-xl bg-[#5C67F2] text-white disabled:opacity-50"
          >
            <span>Next</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
