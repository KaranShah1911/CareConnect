import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaPhoneAlt, FaClock } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import { useUserStore } from "../store/user";
import Loader from "../components/Loader";
const API_URL = import.meta.env.VITE_API_URL;

const getNextDays = (count = 12) => {
  const days = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(now.getDate() + i);
    days.push(d.toDateString());
  }
  return days;
};
const appointmentDates = getNextDays(12);
const timeSlots = ["10:00 AM", "11:00 AM", "12:30 PM", "3:00 PM", "4:30 PM"];

const reviews = [
  {
    name: "Riya Mehta",
    comment:
      "Very professional and helpful. My skin has improved a lot. Clinic is clean and friendly.",
  },
  {
    name: "Neha Jain",
    comment:
      "Dr. Priya explains things in detail. Never rushes you. Highly recommended.",
  },
  {
    name: "Ankit Verma",
    comment: "Great experience! The staff was helpful and attentive.",
  },
];

const AppointmentPage = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const location = useLocation();
  let doctor = location.state?.doctor;
  const similarDoctors = location.state?.similarDoctors;
  const { isLoggedin } = useUserStore();

  const [appointment, setappointmentdate] = useState({
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAppointment = (date, time) => {
    setappointmentdate({
      date: date,
      time: time,
    });
  };

  const handleBooking = () => {
    if (!isLoggedin) {
      toast.error("Please login first to book appointment..");
      return;
    }
    if (!appointment.date || !appointment.time) {
      toast.error("Please Select valid date and time....");
      return;
    }
    try {
      setLoading(true);
      axios
        .post(
          `${API_URL}/user/book-appointment`,
          {
            doctorId: doctor._id,
            slotTime: appointment.time,
            slotDate: appointment.date,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          doctor.slots_booked[appointment.date] = [appointment.time];
          toast.success("Appointment booked successfully");
          navigate("/my-appointment");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to book appointment. Please try again.");
        })
        .finally(() => {
          setappointmentdate({
            date: "",
            time: "",
          });
        });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 z-1 flex items-center bg-white">
      <Loader />
    </div>
  )

  return (
    <section key={doctorId} className="max-w-6xl mx-auto px-4 py-10 pt-24">
      {/* Profile */}
      <div className="flex flex-col md:flex-row gap-8 items-start border-b pb-10">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-48 h-48 rounded-full object-cover border shadow-md"
        />

        <div className="bg-white rounded-xl shadow-lg p-6 flex-1 border hover:bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800">
            {"Dr. " + doctor.name}
          </h2>
          <p className="text-indigo-600 font-medium mt-1">{doctor.specialty}</p>
          <p className="text-sm text-gray-600 mt-2">{doctor.about}</p>

          <div className="flex items-center gap-2 mt-3 text-yellow-500">
            <FaStar />
            <span>4.5 / 5</span>
          </div>

          <div className="mt-4 space-y-2 text-gray-700 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> {doctor.address || "Not Available"}
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt /> {doctor.clinic_phno}
            </p>
            <p className="flex items-center gap-2">
              <FaClock /> {doctor.timings || "9am to 5pm"}
            </p>
            <p className="flex items-center gap-2">
              <MdCurrencyRupee className="size-5" />{" "}
              {doctor.fees || "Not Available"}
            </p>
            <p className="flex items-center gap-2">
              <FaUserDoctor className="size-5" />{" "}
              {doctor.specialization || "Not Available"}
            </p>
          </div>
        </div>
      </div>

      {/* Appointment Slots */}
      <div className="mt-10 border-b pb-10">
        <h3 className="text-xl font-semibold mb-4">Book an Appointment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appointmentDates.map((date, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <p className="font-medium text-gray-800 mb-2">{date}</p>
              <div className="flex flex-wrap gap-3">
                {timeSlots.map((time, i) => (
                  <button
                    key={i}
                    disabled={doctor.slots_booked[date]?.includes(time)}
                    className={`px-3 py-1 rounded-lg text-sm disabled:bg-red-200 disabled:text-red-800  ${appointment.date === date && appointment.time === time
                      ? "bg-indigo-700 text-indigo-100"
                      : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                      }`}
                    onClick={() => handleAppointment(date, time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            className="px-6 py-3 bg-[#5C67F2] text-white rounded-xl hover:bg-indigo-600 transition cursor-pointer"
            onClick={() => handleBooking()}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 border-b pb-10">
        <h3 className="text-xl font-semibold mb-4">Patient Reviews</h3>
        <div className="space-y-4">
          {reviews.map((rev, index) => (
            <div key={index} className="bg-white shadow rounded-xl p-4">
              <p className="font-semibold text-gray-800">{rev.name}</p>
              <p className="text-gray-600 text-sm mt-1">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Doctors */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Similar Specialists</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {similarDoctors
            .filter((doc) => doc._id !== doctor._id)
            .map((doc, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center"
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />
                <h4 className="font-semibold text-gray-800">{doc.name}</h4>
                <p className="text-sm text-gray-500">{doc.specialization}</p>
                <button
                  onClick={() => {
                    if (doc.available === false) {
                      toast.error("Doctor is not available currently..");
                      return;
                    }
                    navigate(`/appointment?doctorId=${doc._id}`, {
                      state: { doctor: doc, similarDoctors },
                    });
                  }}
                  className="mt-2 px-4 py-1 text-sm text-indigo-600 hover:underline cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AppointmentPage;
