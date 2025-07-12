import React, { useState } from 'react';
import DoctorPanel from './DoctorPanel';

const initialAppointments = [
  { name: "Avinash Kr", date: "5 Oct 2024", image: "https://randomuser.me/api/portraits/men/32.jpg", status: "Pending" },
  { name: "Ravi Verma", date: "6 Oct 2024", image: "https://randomuser.me/api/portraits/men/45.jpg", status: "Completed" },
  { name: "Pooja Desai", date: "7 Oct 2024", image: "https://randomuser.me/api/portraits/women/47.jpg", status: "Pending" },
  { name: "Karan Mehta", date: "8 Oct 2024", image: "https://randomuser.me/api/portraits/men/28.jpg", status: "Cancelled" },
  { name: "Shalini Rao", date: "9 Oct 2024", image: "https://randomuser.me/api/portraits/women/50.jpg", status: "Completed" },
  { name: "Rohan Joshi", date: "10 Oct 2024", image: "https://randomuser.me/api/portraits/men/58.jpg", status: "Pending" },
  { name: "Sneha Patil", date: "11 Oct 2024", image: "https://randomuser.me/api/portraits/women/65.jpg", status: "Cancelled" },
  { name: "Deepak Sharma", date: "12 Oct 2024", image: "https://randomuser.me/api/portraits/men/40.jpg", status: "Completed" },
  { name: "Alok Pandey", date: "13 Oct 2024", image: "https://randomuser.me/api/portraits/men/21.jpg", status: "Pending" },
  { name: "Mitali Kaur", date: "14 Oct 2024", image: "https://randomuser.me/api/portraits/women/33.jpg", status: "Completed" },
  { name: "Shubham Tiwari", date: "15 Oct 2024", image: "https://randomuser.me/api/portraits/men/19.jpg", status: "Pending" },
  { name: "Ritika Singh", date: "16 Oct 2024", image: "https://randomuser.me/api/portraits/women/26.jpg", status: "Cancelled" },
  { name: "Sameer Shaikh", date: "17 Oct 2024", image: "https://randomuser.me/api/portraits/men/37.jpg", status: "Completed" },
  { name: "Disha More", date: "18 Oct 2024", image: "https://randomuser.me/api/portraits/women/21.jpg", status: "Pending" },
  { name: "Akash Jain", date: "19 Oct 2024", image: "https://randomuser.me/api/portraits/men/18.jpg", status: "Cancelled" },
  { name: "Ritu Agarwal", date: "20 Oct 2024", image: "https://randomuser.me/api/portraits/women/60.jpg", status: "Completed" },
  { name: "Nikhil Raj", date: "21 Oct 2024", image: "https://randomuser.me/api/portraits/men/16.jpg", status: "Completed" },
  { name: "Avni Chawla", date: "22 Oct 2024", image: "https://randomuser.me/api/portraits/women/13.jpg", status: "Pending" },
  { name: "Tanmay Shah", date: "23 Oct 2024", image: "https://randomuser.me/api/portraits/men/39.jpg", status: "Cancelled" },
  { name: "Neha Jadhav", date: "24 Oct 2024", image: "https://randomuser.me/api/portraits/women/34.jpg", status: "Completed" },
  { name: "Yash Patil", date: "25 Oct 2024", image: "https://randomuser.me/api/portraits/men/35.jpg", status: "Pending" },
  { name: "Aarti Bhosale", date: "26 Oct 2024", image: "https://randomuser.me/api/portraits/women/39.jpg", status: "Completed" },
  { name: "Saurabh Dube", date: "27 Oct 2024", image: "https://randomuser.me/api/portraits/men/50.jpg", status: "Cancelled" },
];


const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const totalPages = Math.ceil(appointments.length / perPage);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentAppointments = appointments.slice(indexOfFirst, indexOfLast);

  const handleStatusChange = (index, newStatus) => {
    const globalIndex = indexOfFirst + index;
    const updated = [...appointments];
    updated[globalIndex].status = newStatus;
    setAppointments(updated);
  };

  return (
    <div className="flex gap-5 p-5 pt-0 h-[calc(100vh-120px)]">
      <DoctorPanel />

      <div className="flex-1 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Earnings */}
          <div className="flex items-center gap-4 bg-[#F2F5FF] p-4 rounded-xl shadow-sm">
            <img src="https://cdn-icons-png.flaticon.com/128/10369/10369910.png" alt="earning" className="h-12 w-12 border border-gray-400 rounded-md p-1" />
            <div>
              <p className="text-xl font-bold text-gray-800">$2,450</p>
              <p className="text-gray-600">Earnings</p>
            </div>
          </div>
          {/* Appointments Count */}
          <div className="flex items-center gap-4 bg-[#F2F5FF] p-4 rounded-xl shadow-sm">
            <img src="https://cdn-icons-png.flaticon.com/128/7322/7322265.png" alt="appointments" className="h-12 w-12 border border-gray-400 rounded-md p-1" />
            <div>
              <p className="text-xl font-bold text-gray-800">35</p>
              <p className="text-gray-600">Appointments</p>
            </div>
          </div>
          {/* Patient Count */}
          <div className="flex items-center gap-4 bg-[#F2F5FF] p-4 rounded-xl shadow-sm">
            <img src="https://cdn-icons-png.flaticon.com/128/3358/3358902.png" alt="patients" className="h-12 w-12 border border-gray-400 rounded-md p-1" />
            <div>
              <p className="text-xl font-bold text-gray-800">22</p>
              <p className="text-gray-600">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">Latest Bookings</h2>

          <div className="space-y-4 h-[45vh] overflow-hidden mt-5">
            {currentAppointments.map((apt, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
                <div className="flex items-center gap-4">
                  <img src={apt.image} alt={apt.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-800">{apt.name}</p>
                    <p className="text-sm text-gray-500">Booking on {apt.date}</p>
                  </div>
                </div>

                {/* status */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="text-md font-semibold">
                    {apt.status === "Completed" && <span className="text-green-500">Completed</span>}
                    {apt.status === "Cancelled" && <span className="text-red-400">Cancelled</span>}
                  </div>

                  {apt.status === "Pending" && (
                    <div className="flex gap-3 text-lg">
                      <button
                        title="Mark as Completed"
                        onClick={() => handleStatusChange(index, "Completed")}
                        className="text-green-600 hover:scale-110 transition"
                      >
                        <img src="https://cdn-icons-png.flaticon.com/128/66/66936.png" alt="markcompleted.img" className='h-10' />
                      </button>
                      <button
                        title="Cancel Appointment"
                        onClick={() => handleStatusChange(index, "Cancelled")}
                        className="text-red-500 hover:scale-110 transition"
                      >
                        <img src="https://cdn-icons-png.flaticon.com/128/4347/4347434.png" alt="cancel.img" className='h-12' />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50"
            >
              ➡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
