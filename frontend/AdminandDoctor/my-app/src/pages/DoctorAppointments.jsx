import { React, useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useStore } from "../store/store";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const API_URL = import.meta.env.VITE_API_URL;


const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] =
    useState([]);
  const [filter, setFilter] = useState({
    patient: "",
    status: "all",
  });
  const [loading, setLoading] = useState(true);
  const sidebar = useStore((state) => state.sidebar);

  // fetch appointments
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`${API_URL}/doctor/appointments`, {
          withCredentials: true,
        })
          .then((response) => {
            setAppointments(response.data.appointments);
            setFilteredAppointments(response.data.appointments);
            console.log("appointments fetched successfully", response.data.appointments);
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

  // handle status changes
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      setLoading(true);
      if (newStatus == "Completed") {
        axios.post(`${API_URL}/doctor/complete-appointment`, { appointmentId }, { withCredentials: true })
          .then((response) => {
            toast.success("Appointment Completed")
            setAppointments((prev) =>
              prev.map((app) => {
                if (app._id === appointmentId) return { ...app, isCompleted: true };
                return app;
              }))
            setFilteredAppointments((prev) =>
              prev.map((app) => {
                if (app._id === appointmentId) return { ...app, isCompleted: true };
                return app;
              })
            );
          })
          .catch((err) => {
            toast.error("Error completing appointment. Please try again.");
            console.error(err)
          });
      }
      else {
        axios.post(`${API_URL}/doctor/cancel-appointment`, { appointmentId }, { withCredentials: true })
          .then((response) => {
            toast.success("Appointment Cancelled")
            setAppointments((prev) =>
              prev.map((app) => {
                if (app._id === appointmentId) return { ...app, cancelled: true };
                return app;
              }))
            setFilteredAppointments((prev) =>
              prev.map((app) => {
                if (app._id === appointmentId) return { ...app, cancelled: true };
                return app;
              }))
          })
          .catch((err) => {
            toast.error("Error cancelling appointment. Please try again.");
            console.error(err)
          });
      }
      console.log("status changed successfully", response.data)
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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
          (filter.status === "all" || (filter.status == "completed" ? app.isCompleted : filter.status === "cancelled" ? app.cancelled : (!app.isCompleted && !app.cancelled)))
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
          (status === "all" || (status == "completed" ? app.isCompleted : status === "cancelled" ? app.cancelled : (!app.isCompleted && !app.cancelled)))
      )
    );
  };

  if (loading) return (
    <div className="fixed inset-0 z-1 flex items-center bg-white">
      <Loader />
    </div>
  )

  return (
    <div
      className={`flex flex-col min-h-screen gap-2 p-5 pt-30 ${sidebar ? "pl-50" : "pl-15"
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
                    <td className="px-4 py-4">{index + 1}</td>
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
      </div>
    </div>
  );
};

export default DoctorAppointments;
