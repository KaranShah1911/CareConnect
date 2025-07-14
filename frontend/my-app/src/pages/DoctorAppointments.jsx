import { React, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useStore } from "../utils/store";

// dummy appointments data
const appointments = [
  {
    id: 0,
    name: "Avinash Kr",
    age: 31,
    payment: "CASH",
    dateTime: "5 Oct 2024, 12:00 PM",
    fee: "$50",
    status: "Pending",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 1,
    name: "Ravi Verma",
    age: 29,
    payment: "Online",
    dateTime: "6 Oct 2024, 11:30 AM",
    fee: "$45",
    status: "Pending",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 2,
    name: "Pooja Desai",
    age: 26,
    payment: "CASH",
    dateTime: "6 Oct 2024, 03:00 PM",
    fee: "$50",
    status: "Completed",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    id: 3,
    name: "Karan Mehta",
    age: 34,
    payment: "Online",
    dateTime: "7 Oct 2024, 10:00 AM",
    fee: "$60",
    status: "Cancelled",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
  },
  {
    id: 4,
    name: "Shalini Rao",
    age: 30,
    payment: "CASH",
    dateTime: "7 Oct 2024, 04:00 PM",
    fee: "$55",
    status: "Pending",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 5,
    name: "Rohan Joshi",
    age: 27,
    payment: "Online",
    dateTime: "8 Oct 2024, 02:30 PM",
    fee: "$40",
    status: "Completed",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
  },
  {
    id: 6,
    name: "Sneha Patil",
    age: 23,
    payment: "CASH",
    dateTime: "8 Oct 2024, 05:00 PM",
    fee: "$35",
    status: "Cancelled",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 7,
    name: "Deepak Sharma",
    age: 36,
    payment: "Online",
    dateTime: "9 Oct 2024, 01:00 PM",
    fee: "$50",
    status: "Pending",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    id: 8,
    name: "Alok Pandey",
    age: 38,
    payment: "CASH",
    dateTime: "9 Oct 2024, 11:00 AM",
    fee: "$50",
    status: "Completed",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    id: 9,
    name: "Mitali Kaur",
    age: 25,
    payment: "Online",
    dateTime: "10 Oct 2024, 09:30 AM",
    fee: "$45",
    status: "Completed",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 10,
    name: "Shubham Tiwari",
    age: 28,
    payment: "CASH",
    dateTime: "10 Oct 2024, 03:45 PM",
    fee: "$40",
    status: "Pending",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    id: 11,
    name: "Ritika Singh",
    age: 24,
    payment: "Online",
    dateTime: "11 Oct 2024, 12:15 PM",
    fee: "$50",
    status: "Cancelled",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    id: 12,
    name: "Sameer Shaikh",
    age: 32,
    payment: "CASH",
    dateTime: "11 Oct 2024, 06:00 PM",
    fee: "$60",
    status: "Completed",
    image: "https://randomuser.me/api/portraits/men/37.jpg",
  },
  {
    id: 13,
    name: "Disha More",
    age: 29,
    payment: "Online",
    dateTime: "12 Oct 2024, 10:30 AM",
    fee: "$55",
    status: "Pending",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
  },
];


const DoctorAppointments = () => {
  // const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [filter, setFilter] = useState({
    patient: "",
    status: "all"
  });
  const sidebar = useStore((state) => state.sidebar);

  const handleStatusChange = (id, newStatus) => {
    //backend call to update status
    try{
      appointments.forEach((app) => { if (app.id === id) app.status = newStatus });
      setFilteredAppointments((prev) => prev.map((app)=>{
        if (app.id === id) return {...app, status: newStatus};
        return app;
      }));
    }catch(err){
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
  }

  const filterByPatient = (e) => {
    const name = e.target.value
    setFilter((prev) => { return { ...prev, [e.target.name]: name } })
    setFilteredAppointments(appointments.filter((app) => app.name.toLowerCase().includes(name) && (filter.status === "all" || app.status.toLowerCase() === filter.status)));
  }
  const filterByStatus = (e) => {
    const status = e.target.value;
    setFilter((prev) => { return { ...prev, [e.target.name]: status } })
    setFilteredAppointments(appointments.filter((app) => app.name.toLowerCase().includes(filter.patient) && (status === "all" || app.status.toLowerCase() === status)));
  }

  return (
    <div className={`flex flex-col min-h-screen gap-2 p-5 pt-30 ${sidebar ? "pl-50" : "pl-15"}`}>
      <div className="flex justify-between items-center gap-5">
        <h1 className="text-2xl font-semibold mb-8 text-[#5C67F2]">All Appointments</h1>
        {/* Filtering */}
        <div className="flex gap-5">
          <div id="filter-1" className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-600">Filter by status:</label>
            <select
              name="status"
              value={filter.status}
              onChange={filterByStatus}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <input type="text" name="patient" onChange={filterByPatient} className="border-1 rounded-md max-h-max p-2 focus:ring-2 focus:ring-violet-700 focus-within:none" placeholder="Search Patient" />
        </div>
        {/* Appointment List Header */}
      </div>
      <table className="w-full text-sm text-gray-700">
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
            filteredAppointments.slice(start, end).map((appointment) => (
              <tr key={appointment.id} className="border-b">
                <td className="px-4 py-4">{appointment.id}</td>
                <td className="px-4 py-4 flex items-center">
                  <img
                    src={appointment.image}
                    alt="patient.img"
                    className="w-10 h-10 rounded-full object-cover mr-2"
                  />
                  {appointment.name}
                </td>
                <td className="px-4 py-4">{appointment.payment}</td>
                <td className="px-4 py-4">{appointment.age}</td>
                <td className="px-4 py-4">{appointment.dateTime}</td>
                <td className="px-4 py-4">{appointment.fee}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center text-center">
                    <div className="text-md font-semibold">
                      {appointment.status === "Completed" && (
                        <span className="text-green-500">Completed</span>
                      )}
                      {appointment.status === "Cancelled" && (
                        <span className="text-red-400">Cancelled</span>
                      )}
                    </div>

                    {appointment.status === "Pending" && (
                      <div className="flex gap-3 text-lg">
                        <CheckCircle
                          onClick={() => handleStatusChange(appointment.id, "Completed")}
                          className="text-green-600 hover:scale-110 transition size-7"
                        />
                        <XCircle
                          onClick={() => handleStatusChange(appointment.id, "Cancelled")}
                          className="text-red-500 hover:scale-110 transition size-7"
                        />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-4 text-center text-red-500">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

export default DoctorAppointments;
