import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useStore } from "../utils/store";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import axios, { all } from "axios";
import { toast } from "react-toastify";
const initialappointments = [
  {
    id: 1,
    name: "Avinash Kr",
    date: "5 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Pending",
    payment: "Cash",
  },
  {
    id: 2,
    name: "Ravi Verma",
    date: "6 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "Completed",
    payment: "Online",
  },
  {
    id: 3,
    name: "Pooja Desai",
    date: "7 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    status: "Pending",
    payment: "Cash",
  },
  {
    id: 4,
    name: "Karan Mehta",
    date: "8 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    status: "Cancelled",
    payment: "Online",
  },
  {
    id: 5,
    name: "Shalini Rao",
    date: "9 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    status: "Completed",
    payment: "Cash",
  },
  {
    id: 6,
    name: "Rohan Joshi",
    date: "10 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    status: "Pending",
    payment: "Online",
  },
  {
    id: 7,
    name: "Sneha Patil",
    date: "11 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "Cancelled",
    payment: "Cash",
  },
  {
    id: 8,
    name: "Deepak Sharma",
    date: "12 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    status: "Completed",
    payment: "Cash",
  },
  {
    id: 9,
    name: "Alok Pandey",
    date: "13 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    status: "Pending",
    payment: "Cash",
  },
  {
    id: 10,
    name: "Mitali Kaur",
    date: "14 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    status: "Completed",
    payment: "Online",
  },
  {
    id: 11,
    name: "Shubham Tiwari",
    date: "15 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    status: "Pending",
    payment: "Cash",
  },
  {
    id: 12,
    name: "Ritika Singh",
    date: "16 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    status: "Cancelled",
    payment: "Online",
  },
  {
    id: 13,
    name: "Sameer Shaikh",
    date: "17 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/37.jpg",
    status: "Completed",
    payment: "Cash",
  },
  {
    id: 14,
    name: "Disha More",
    date: "18 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    status: "Pending",
    payment: "Online",
  },
  {
    id: 15,
    name: "Akash Jain",
    date: "19 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    status: "Cancelled",
    payment: "Online",
  },
  {
    id: 16,
    name: "Ritu Agarwal",
    date: "20 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    status: "Completed",
    payment: "Cash",
  },
  {
    id: 17,
    name: "Nikhil Raj",
    date: "21 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    status: "Completed",
    payment: "Online",
  },
  {
    id: 18,
    name: "Avni Chawla",
    date: "22 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    status: "Pending",
    payment: "Cash",
  },
  {
    id: 19,
    name: "Tanmay Shah",
    date: "23 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
    status: "Cancelled",
    payment: "Online",
  },
  {
    id: 20,
    name: "Neha Jadhav",
    date: "24 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
    status: "Completed",
    payment: "Cash",
  },
  {
    id: 21,
    name: "Yash Patil",
    date: "25 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    status: "Pending",
    payment: "Online",
  },
  {
    id: 22,
    name: "Aarti Bhosale",
    date: "26 Oct 2024",
    image: "https://randomuser.me/api/portraits/women/39.jpg",
    status: "Completed",
    payment: "Cash",
  },
  {
    id: 23,
    name: "Saurabh Dube",
    date: "27 Oct 2024",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    status: "Cancelled",
    payment: "Online",
  },
];

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [latestAppointments, setlatestAppointments] = useState([]);
  const sidebar = useStore((state) => state.sidebar);
  const perPage = 8;
  const totalPages = Math.ceil(latestAppointments.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perPage);
  const API_URL = import.meta.env.VITE_API_URL;
  const [stats, setStats] = useState({
    appointments: 0,
    earnings: 0,
    patients: 0,
  });

  // initial fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctor/dashboard`, {
          withCredentials: true,
        });
        const docId = response.data.doctorId;

        console.log("successfull dashboard", response.data);
        setStats(response.data.dashData);
        setAppointments(allAppointments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // fetch Appointments (latest - pending apts)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctor/appointments`, {
          withCredentials: true,
        });
        // const {name, age, _id} =
        setAppointments(response.data.appointments);
        setlatestAppointments(
          response.data.appointments.filter((app) => !app.isCompleted && !app.cancelled)
        );
        console.log(
          "appointments fetched successfully",
          response.data.appointments
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setStart(perPage * (page - 1));
    setEnd(page * perPage);
  };

  // handle status changes - needs to verify
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      let response;
      if (newStatus == "Completed") {
        response = await axios.post(
          `${API_URL}/doctor/complete-appointment`,
          { appointmentId },
          { withCredentials: true }
        );
        toast.success("Appointment Completed");
        setAppointments((prev) =>
          prev.map((app) => {
            if (app._id === appointmentId) return { ...app, isCompleted: true };
            return app;
          })
        );
        setlatestAppointments((prev) =>
          prev.map((app) => {
            if (app._id === appointmentId) return { ...app, isCompleted: true };
            return app;
          })
        );
      } else {
        response = await axios.post(
          `${API_URL}/doctor/cancel-appointment`,
          { appointmentId },
          { withCredentials: true }
        );
        toast.success("Appointment Cancelled");
        setAppointments((prev) =>
          prev.map((app) => {
            if (app._id === appointmentId) return { ...app, cancelled: true };
            return app;
          })
        );
        setlatestAppointments((prev) =>
          prev.map((app) => {
            if (app._id === appointmentId) return { ...app, cancelled: true };
            return app;
          })
        );
      }
      console.log("status changed successfully", response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-[100vh] gap-5 px-4 sm:px-6 pb-6 pt-[100px] transition-all duration-300 ${
        sidebar ? "pl-[200px] md:pl-[200px]" : "pl-[60px] md:pl-[60px]"
      }`}
    >
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-white">
        {/* Earnings */}
        <div className="flex items-center gap-4 bg-[#5C67F2] p-4 rounded-xl shadow-sm">
          <FcMoneyTransfer className="size-10" />
          <div>
            <p className="text-lg sm:text-xl">Earnings</p>
            <p className="text-xl sm:text-2xl font-bold">₹{stats.earnings}</p>
          </div>
        </div>

        {/* Appointments Count */}
        <div className="flex items-center gap-4 bg-[#5C67F2] p-4 rounded-xl shadow-sm">
          <RiCalendarScheduleLine className="size-10" />
          <div>
            <p className="text-lg sm:text-xl">Appointments</p>
            <p className="text-xl sm:text-2xl font-bold">
              {stats.appointments}
            </p>
          </div>
        </div>

        {/* Patient Count */}
        <div className="flex items-center gap-4 bg-[#5C67F2] p-4 rounded-xl shadow-sm">
          <IoPeopleOutline className="size-10" />
          <div>
            <p className="text-lg sm:text-xl">Patients</p>
            <p className="text-xl sm:text-2xl font-bold">{stats.patients}</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings Table */}
      <div className="mt-5 w-full overflow-x-auto">
        <h2 className="text-2xl font-semibold text-[#5C67F2] mb-4 max-sm:text-xl px-2">
          Latest Bookings
        </h2>
        {latestAppointments.length > 0 ? (
          <>
            <table className="min-w-[600px] w-full text-sm sm:text-base text-gray-700 border-collapse">
              <thead className="bg-gray-100 font-semibold text-sm sm:text-base">
                <tr>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
                    Patient
                  </th>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
                    Payment
                  </th>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
                    Booking Date
                  </th>
                  <th className="text-left px-4 py-2 whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-center px-4 py-2 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {latestAppointments.slice(start, end).map((appointment) => (
                  <tr
                    key={appointment._id}
                    className="border-b text-sm sm:text-[15px]"
                  >
                    <td className="px-4 py-3 flex items-center gap-3 whitespace-nowrap">
                      <img
                        src={appointment.userId.image}
                        alt={appointment.userId.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {appointment.userId.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap ">
                      {appointment.payment ? "cash" : "online"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {appointment.slotDate + ", " + appointment.slotTime}
                    </td>

                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {appointment.isCompleted && (
                        <span className="text-green-500">Completed</span>
                      )}
                      {appointment.cancelled && (
                        <span className="text-red-400">Cancelled</span>
                      )}
                      {!appointment.isCompleted && !appointment.cancelled &&  (
                        <span className="text-yellow-500">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          </>
        ) : (
          <div className="text-center text-gray-500 py-4">No Appointments Pending</div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
