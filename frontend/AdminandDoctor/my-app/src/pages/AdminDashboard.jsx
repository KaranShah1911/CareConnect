import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import Loader from "../components/Loader";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useStore } from "../store/store";
import axios from "axios";
import { toast } from "react-toastify";

// const appointments = [
//   {
//     id: 1,
//     doctor: {
//       name: "Dr. Smith",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "John Doe",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-13",
//     status: "completed",
//   },
//   {
//     id: 2,
//     doctor: {
//       name: "Dr. Alice",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "Jane Roe",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-14",
//     status: "cancelled",
//   },
//   {
//     id: 3,
//     doctor: {
//       name: "Dr. Rahul",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "Karan Mehta",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-15",
//     status: "pending",
//   },
//   {
//     id: 4,
//     doctor: {
//       name: "Dr. Rahul",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "Karan Mehta",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-15",
//     status: "pending",
//   },
//   {
//     id: 5,
//     doctor: {
//       name: "Dr. Rahul",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "Karan Mehta",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-15",
//     status: "pending",
//   },
//   {
//     id: 6,
//     doctor: {
//       name: "Dr. Rahul",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "Karan Mehta",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-15",
//     status: "pending",
//   },
//   {
//     id: 7,
//     doctor: {
//       name: "Dr. Rahul",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "Karan Mehta",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-15",
//     status: "pending",
//   },
//   {
//     id: 8,
//     doctor: {
//       name: "Dr. Rahul",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "Karan Mehta",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-15",
//     status: "pending",
//   },
//   {
//     id: 9,
//     doctor: {
//       name: "Dr. Rahul",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "Karan Mehta",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-15",
//     status: "pending",
//   },
//   {
//     id: 10,
//     doctor: {
//       name: "Dr. Rahul",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     patient: {
//       name: "Karan Mehta",
//       img: "https://randomuser.me/api/portraits/men/66.jpg",
//     },
//     date: "2025-07-15",
//     status: "pending",
//   },
// ];

const DoctorsperPage = 5;

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { title: "Doctors", count: 0 },
    { title: "Patients", count: 0 },
    { title: "Completed Appointments", count: 0 },
    { title: "Cancelled Appointments", count: 0 },
  ]);

  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setfilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    status: "all",
    doctor: "",
  });
  const [currentPage, setcurrentPage] = useState(1);
  const [start, setStart] = useState((currentPage - 1) * DoctorsperPage);
  const [end, setEnd] = useState(DoctorsperPage);
  const sidebar = useStore((state) => state.sidebar);

  const NoofDoctors = filteredAppointments.length;
  const NoofPages = Math.ceil(NoofDoctors / DoctorsperPage);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleCancelAppointment = async (appointmentId) => {
    // set the status of the appointment to cancel..
    //backend call to update status
    try {
      const response = await axios.post(
        `${API_URL}/admin/cancel-appointment`,
        { appointmentId },
        { withCredentials: true }
      );
      setAppointments((prev) =>
        prev.map((app) => {
          if (app._id === appointmentId) return { ...app, cancelled: true };
          return app;
        })
      );
      setfilteredAppointments((prev) =>
        prev.map((app) => {
          if (app._id === appointmentId) return { ...app, cancelled: true };
          return app;
        })
      );

      console.log(response.data);

      setAppointments((prev) =>
        prev.map((app) =>
          app.id === appointmentId ? { ...app, cancelled: true } : app
        )
      );
      setfilteredAppointments((prev) =>
        prev.map((app) => {
          if (app.id === appointmentId) return { ...app, cancelled: true };
          return app;
        })
      );

      toast.success("Appointment Cancelled");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel appointment");
    }
  };

  // To fetch the appointment data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/dashboard`, {
          withCredentials: true,
        });
        console.log("dashboard data fetch successfull", response.data);
        setLoading(false);

        const { appointments, doctors, patiens, latestAppointments } =
          response.data.dashData;
        const completed = latestAppointments.filter((a) => !a.cancelled).length;
        const cancelled = latestAppointments.filter((a) => a.cancelled).length;
        setStats([
          { title: "Doctors", count: doctors },
          { title: "Patients", count: patiens },
          { title: "Completed Appointments", count: completed },
          { title: "Cancelled Appointments", count: cancelled },
        ]);

        setAppointments(latestAppointments);
        setfilteredAppointments(latestAppointments);
      } catch (err) {
        toast.error(err.response.data.message);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSearchByDoctor = (e) => {
    const name = e.target.value;
    setFilter((prev) => {
      return { ...prev, [e.target.name]: name };
    });
    setfilteredAppointments(
      appointments.filter(
        (app) =>
          app.doctorId.name.toLowerCase().includes(name) &&
          (filter.status === "all" ||
            (filter.status === "completed"
              ? app.isCompleted
              : filter.status === "cancelled"
              ? app.cancelled
              : !app.isCompleted && !app.cancelled))
      )
    );
  };

  const handleFiltering = (e) => {
    const status = e.target.value;
    setFilter((prev) => {
      return { ...prev, [e.target.name]: status };
    });
    setfilteredAppointments(
      appointments.filter(
        (app) =>
          app.doctorId?.name.toLowerCase().includes(filter.doctor) &&
          (status === "all" ||
            (status === "completed"
              ? app.isCompleted
              : status === "cancelled"
              ? app.cancelled
              : !app.isCompleted && !app.cancelled))
      )
    );
  };

  const getStatusIcon = (isCompleted, cancelled) => {
    if (isCompleted) return <CheckCircle className="text-green-500" />;
    if (cancelled) return <XCircle className="text-red-500" />;
    return <Clock className="text-yellow-500" />;
  };

  const handlePageChange = (page) => {
    setcurrentPage(page);
    setStart(DoctorsperPage * (page - 1));
    setEnd(page * DoctorsperPage);
  };

  return (
    <div
      className={`min-h-screen pt-25 pb-5 pr-5 space-y-6 ${
        sidebar ? "pl-[200px]" : "pl-[60px]"
      } transition-all duration-300`}
    >
      <h1 className="text-3xl font-bold text-indigo-700">Admin Dashboard</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-tr from-violet-500 to-indigo-500 p-6 rounded-2xl text-white shadow-md"
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-3xl mt-2">{item.count}</p>
              </div>
            ))}
          </div>

          <div className="">
            <div className="flex justify-between items-center p-2">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
                Appointments
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  name="doctor"
                  onChange={handleSearchByDoctor}
                  className="border-1 rounded-md max-h-max p-2 focus:ring-2 focus:ring-violet-700 focus-within:none"
                  placeholder="Search Doctor"
                />

                <div className="flex items-center gap-3 my-4">
                  <label className="text-sm font-semibold text-gray-600">
                    Filter by status:
                  </label>
                  <select
                    name="status"
                    value={filter.status}
                    onChange={handleFiltering}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <table className="w-full table-fixed text-left border border-gray-200">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length == 0 ? <tr className="text-xl text-center w-full"><td>No Appointments</td></tr> :  filteredAppointments.slice(start, end).map((app, idx) => (
                  <tr key={app._id} className="border-t">
                    <td className="p-3 items-center space-x-4">
                      <img
                        src={app.doctorId?.image || "/default-user.png"}
                        className="w-10 h-10 rounded-full inline"
                      />
                      <span>{app.doctorId?.name || "NA"}</span>
                    </td>
                    <td className="p-3 items-center space-x-4">
                      <img
                        src={app.userId?.image || "/default-user.png"}
                        className="w-10 h-10 rounded-full inline"
                      />
                      <span>{app.userId?.name || "NA"}</span>
                    </td>
                    <td className="p-3">{app.date}</td>
                    <td className="p-3">
                      {getStatusIcon(app.isCompleted, app.cancelled)}
                    </td>
                    <td className="p-3">
                      {!app.isCompleted && !app.cancelled && (
                        <button
                          onClick={() => handleCancelAppointment(app._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination component */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 border-1 p-2 rounded-xl cursor-pointer bg-[#5C67F2] text-white"
            >
              <FaArrowLeft />
              <span>Previous</span>
            </button>
            {[...Array(NoofPages).keys()].map((ind) => (
              <button
                onClick={() => handlePageChange(ind + 1)}
                key={ind}
                className={`border-1 rounded-md p-2 cursor-pointer ${
                  currentPage === ind + 1 ? "bg-[#5C67F2] text-white" : ""
                }`}
              >
                {ind + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === NoofPages}
              className="flex items-center border-1 p-2 rounded-xl cursor-pointer bg-[#5C67F2] text-white"
            >
              <span>Next</span>
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
