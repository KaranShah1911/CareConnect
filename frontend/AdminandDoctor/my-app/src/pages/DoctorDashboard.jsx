import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useStore } from "../store/store";
import { FcMoneyTransfer } from "react-icons/fc";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const API_URL = import.meta.env.VITE_API_URL;

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [latestAppointments, setlatestAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const sidebar = useStore((state) => state.sidebar);
  const perPage = 8;
  const totalPages = Math.ceil(latestAppointments.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(perPage);
  const [stats, setStats] = useState({
    appointments: 0,
    earnings: 0,
    patients: 0,
  });

  // initial fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`${API_URL}/doctor/dashboard`, {
          withCredentials: true,
        })
          .then((response) => {
            console.log("successfull dashboard", response.data);
            setStats(response.data.dashData);
          })
          .catch((error) => {
            toast.error("Error fetching dashboard data. Please try again.");
            console.error(error);
          });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // fetch Appointments (latest - pending apts)
  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        axios.get(`${API_URL}/doctor/appointments`, {
          withCredentials: true,
        })
          .then((response) => {
            setAppointments(response.data.appointments);
            setlatestAppointments(
              response.data.appointments.filter((app) => !app.isCompleted && !app.cancelled)
            );
            console.log(
              "appointments fetched successfully",
              response.data.appointments
            );
          })
          .catch((error) => {
            toast.error("Error fetching appointments. Please try again.");
            console.error(error);
          });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setStart(perPage * (page - 1));
    setEnd(page * perPage);
  };

  // handle status changes - needs to verify
  const handleStatusChange = (appointmentId, newStatus) => {
    try {
      setLoading(true);
      if (newStatus == "Completed") {
        axios.post(
          `${API_URL}/doctor/complete-appointment`,
          { appointmentId },
          { withCredentials: true }
        )
          .then((response) => {
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
          })
          .catch((err) => {
            toast.error("Error completing appointment. Please try again.");
            console.error(err);
          });

      } else {
        axios.post(
          `${API_URL}/doctor/cancel-appointment`,
          { appointmentId },
          { withCredentials: true }
        )
          .then((response) => {
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
          })
          .catch((err) => {
            toast.error("Error cancelling appointment. Please try again.");
            console.error(err);
          });
      }
      console.log("status changed successfully", response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="fixed inset-0 z-1 flex items-center bg-white">
      <Loader />
    </div>
  )

  return (
    <div
      className={`flex flex-col min-h-[100vh] gap-5 px-4 sm:px-6 pb-6 pt-[100px] transition-all duration-300 ${sidebar ? "pl-[200px] md:pl-[200px]" : "pl-[60px] md:pl-[60px]"
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
                      {!appointment.isCompleted && !appointment.cancelled && (
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
                  className={`border p-2 rounded-md ${currentPage === ind + 1 ? "bg-[#5C67F2] text-white" : ""
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
