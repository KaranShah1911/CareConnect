import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const API_URL = import.meta.env.VITE_API_URL;

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleCancel = (appointmentId) => {
    try {
      setLoading(true);
      axios
        .post(
          `${API_URL}/user/cancel-appointment`,
          { appointmentId },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setAppointments(
            appointments.map((app) => {
              if (app._id === appointmentId) app.cancelled = true;
              return app;
            })
          );
          toast.success("Appointment cancelled");
        })
        .catch((err) => console.error(err));
        
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/user/list-appointments`, {
        withCredentials: true,
      })
      .then((res) => {
        setAppointments(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.error(err));
    setLoading(false);
  }, []);

  if (loading) return (
    <div className="fixed inset-0 z-1 flex items-center bg-white">
      <Loader />
    </div>
  )

  return (
    <div className="mb-20 pt-30 p-5 m-auto">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 p-2">
        <h1 className="text-3xl font-semibold text-indigo-700">
          My Appointments
        </h1>
      </div>

      {/* Appointments List */}
      <div className="mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {appointments &&
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition-all p-6 col-span-1"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Doctor Image */}
                <div className="flex-shrink-0">
                  <img
                    src={appointment.docData.image}
                    alt={appointment.docData.name}
                    className="w-28 h-28 object-cover rounded-full border-4 border-white shadow"
                  />
                </div>

                {/* Doctor Info & Details */}
                <div className="flex-1">
                  <div className="mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {appointment.docData.name}
                    </h2>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                      {appointment.docData.specialization}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-gray-400 font-medium uppercase text-xs">
                        Date & Time
                      </p>
                      <p className="text-gray-800 font-medium">
                        {appointment.slotDate + " " + appointment.slotTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium uppercase text-xs">
                        Address
                      </p>
                      <p className="text-gray-800">
                        {appointment.docData.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => handleCancel(appointment._id)}
                  disabled={appointment.cancelled}
                  className={`border text-gray-700 py-2 px-6 rounded-md text-sm font-medium  transition ${appointment.cancelled
                    ? "text-red-600 cursor-not-allowed"
                    : "border-gray-300 cursor-pointer"
                    }`}
                >
                  {appointment.cancelled ? (
                    <div className="text-red-600">Appointment cancelled</div>
                  ) : appointment.isCompleted ? (
                    <div className="text-green-600">Appointment Completed</div>
                  ) : (
                    <div className="hover:bg-red-600 hover:text-white">
                      Cancel appointment
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyAppointments;
