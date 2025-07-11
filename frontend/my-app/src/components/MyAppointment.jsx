import React, { useState } from "react";

const allAppointments = [
  {
    id: 1,
    doctorName: "Dr. Christopher Lee",
    specialty: "Pediatrician",
    address: "37th Cross, Richmond Circle, Ring Road, London",
    dateTime: "11 Aug 2025 | 01:00 PM",
    image: "https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg",
    appointmentCancelled: false,
  },
  {
    id: 2,
    doctorName: "Dr. Sarah Patel",
    specialty: "Dermatologist",
    address: "37th Cross, Richmond Circle, Ring Road, London",
    dateTime: "11 Aug 2025 | 01:00 PM",
    image: "https://img.freepik.com/free-photo/young-male-doctor-white-coat-with-stethoscope-holding-clipboard_114579-9966.jpg",
    appointmentCancelled: true,
  },
  {
    id: 3,
    doctorName: "Dr. Anita Desai",
    specialty: "Neurologist",
    address: "45 Queen Street, Westminster, London",
    dateTime: "13 Aug 2025 | 10:30 AM",
    image: "https://img.freepik.com/free-photo/young-male-doctor-white-coat-with-stethoscope-holding-clipboard_114579-9966.jpg",
    appointmentCancelled: false,
  },
  {
    id: 4,
    doctorName: "Dr. Priya Singh",
    specialty: "ENT Specialist",
    address: "78 King Cross Road, London",
    dateTime: "14 Aug 2025 | 03:15 PM",
    image: "https://img.freepik.com/free-photo/young-male-doctor-white-coat-with-stethoscope-holding-clipboard_114579-9966.jpg",
    appointmentCancelled: true,
  },
];

const MyAppointments = () => {
    const [appointments, setAppointments] = useState(allAppointments.slice(3))
    const handleCancel = (id) => {
        setAppointments( (prev) =>             
                prev.map( (appointment) => 
                appointment.id === id ? {...appointment , appointmentCancelled : true} : appointment
            )
        );
    }
  return (
    <div className="mb-20 pt-30 w-[80vw] m-auto">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 ">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            My Appointments
          </h1>
        </div>
      </div>

      {/* Appointments List */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-8">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition-all p-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <img
                  src={appointment.image}
                  alt={appointment.doctorName}
                  className="w-28 h-28 object-cover rounded-full border-4 border-white shadow"
                />
              </div>

              {/* Doctor Info & Details */}
              <div className="flex-1">
                <div className="mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {appointment.doctorName}
                  </h2>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    {appointment.specialty}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-gray-400 font-medium uppercase text-xs">
                      Date & Time
                    </p>
                    <p className="text-gray-800 font-medium">
                      {appointment.dateTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 font-medium uppercase text-xs">
                      Address
                    </p>
                    <p className="text-gray-800">{appointment.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
              <button className={`py-2 px-6 rounded-md text-sm font-medium hover:bg-blue-700 hover:text-white transition border border-gray-300 cursor-pointer ${appointment.appointmentCancelled ? "hidden" : "block"}`}>
                Pay Online
              </button>
              <button 
              onClick={() => handleCancel(appointment.id)}
              disabled={appointment.appointmentCancelled}
              className={`border text-gray-700 py-2 px-6 rounded-md text-sm font-medium  transition ${appointment.appointmentCancelled ? "text-red-600 cursor-not-allowed" : "border-gray-300 hover:bg-red-600 hover:border-0 cursor-pointer" }`}>

                {appointment.appointmentCancelled ? "Appointment cancelled" : "Cancel appointment"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
