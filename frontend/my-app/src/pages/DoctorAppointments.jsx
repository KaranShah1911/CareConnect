import { React, useState } from "react";
import DoctorPanel from "./DoctorPanel";

// dummy appointments data
const detailedAppointments = [
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
  const [appointments, setAppointments] = useState(detailedAppointments);
  const handleStatusChange = (index, newStatus) => {
    const globalIndex = firstIndex + index;
    const updated = [...appointments];
    updated[globalIndex].status = newStatus;
    setAppointments(updated);
  };

  // pagination logic
  const perPage = 5;
  const totalPages = Math.ceil(appointments.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentAppointments = appointments.slice(firstIndex, lastIndex);

  return (
    <div className="flex gap-5 p-5 pt-0">
      <DoctorPanel />

      <div>
        <div className="text-2xl font-semibold mb-8">All Appointments</div>

        <div className="">
          {/* Appointment List Header */}

          <div className="flex flex-col justify-between border p-5 rounded-md shadow-md gap-x-2">
            <div className="h-[57vh]">
              <ul
                className="grid grid-cols-[40px_1.5fr_1fr_60px_1.5fr_60px_1fr] 
              px-4 py-2 border-b font-semibold text-gray-700 text-sm w-[66vw]"
              >
                <li>#</li>
                <li>Patient</li>
                <li>Payment</li>
                <li>Age</li>
                <li>Date & Time</li>
                <li>Fees</li>
                <li>Action</li>
              </ul>
              {/* appointment list */}
              <div className="">
                {currentAppointments.length > 0
                  ? currentAppointments.map((appointment, index) => (
                      <ul
                        key={appointment.id}
                        className="py-4 grid grid-cols-[40px_1.5fr_1fr_60px_1.5fr_60px_1fr] 
                  px-4 border-b font-medium text-gray-700 text-sm w-[66vw] items-center"
                      >
                        <li>{appointment.id}</li>
                        <li className="flex items-center">
                          <img src={appointment.image} alt="patient.img" className="w-10 h-10 rounded-full object-cover mr-2"/>
                          {appointment.name}
                        </li>
                        <li>{appointment.payment}</li>
                        <li>{appointment.age}</li>
                        <li>{appointment.dateTime}</li>
                        <li>{appointment.fee}</li>
                        <li>
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <div className="text-md font-semibold">
                              {appointment.status === "Completed" && (
                                <span className="text-green-500">
                                  Completed
                                </span>
                              )}
                              {appointment.status === "Cancelled" && (
                                <span className="text-red-400">Cancelled</span>
                              )}
                            </div>

                            {appointment.status === "Pending" && (
                              <div className="flex gap-3 text-left">
                                <button
                                  title="Mark as Completed"
                                  onClick={() =>
                                    handleStatusChange(index, "Completed")
                                  }
                                  className="text-green-600 hover:scale-110 transition"
                                >
                                  <img
                                    src="https://cdn-icons-png.flaticon.com/128/66/66936.png"
                                    alt="markcompleted.img"
                                    className="h-6"
                                  />
                                </button>
                                <button
                                  title="Cancel Appointment"
                                  onClick={() =>
                                    handleStatusChange(index, "Cancelled")
                                  }
                                  className="text-red-500 hover:scale-110 transition"
                                >
                                  <img
                                    src="https://cdn-icons-png.flaticon.com/128/4347/4347434.png"
                                    alt="cancel.img"
                                    className="h-7"
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        </li>
                      </ul>
                    ))
                  : "red"}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center gap-4 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
              >
                ⬅
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
              >
                ➡
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
