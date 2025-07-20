import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useStore } from "../store/store";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const DoctorsperPage = 9;

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const sidebar = useStore((state) => state.sidebar);
  const [currentPage, setcurrentPage] = useState(1);
  const [start, setStart] = useState((currentPage - 1) * DoctorsperPage);
  const [end, setEnd] = useState(DoctorsperPage);
  const NoofDoctors = doctors.length;
  const NoofPages = Math.ceil(NoofDoctors / DoctorsperPage);

  // Fetch all doctors.
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`${API_URL}/admin/all-doctors`, {
          withCredentials: true,
        })
          .then((response) => {
            setDoctors(response.data.doctors);
            console.log("doctors fetched", response.data);
            setLoading(false);
          })
          .catch((error) => {
            toast.error("Error fetching doctors. Please try again.");
            console.error(error);
          });
      } catch (err) {
        toast.error("Error fetching doctors. Please try again.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // handle availability change
  const handleAvailChange = (docId) => {
    try {
      setLoading(true);
      axios.post(
        `${API_URL}/admin/change-availibility`,
        { docId },
        { withCredentials: true }
      )
        .then((response) => {
          console.log("avail changed", response.data)
          toast.success("Availability Changed");
          setDoctors((prev) =>
            prev.map((doctor) =>
              doctor._id === docId
                ? { ...doctor, available: !doctor.available }
                : doctor
            )
          );
        })
        .catch((error) => {
          toast.error("Failed to change availability. Please try again.");
          console.error(error);
        });

    } catch (error) {
      console.error(err);
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setcurrentPage(page);
    setStart(DoctorsperPage * (page - 1));
    setEnd(page * DoctorsperPage);
  };

  if (loading) return (
    <div className="fixed inset-0 z-1 flex items-center bg-white">
      <Loader />
    </div>
  )

  return (
    <div
      className={`${sidebar ? "pl-[200px]" : "pl-[60px]"
        } transition-all duration-300 pt-25 p-5 min-h-screen`}
    >
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">All Doctors</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
            {doctors.slice(start, end).map((doc, idx) => (
              <div
                key={idx}
                className="bg-white border shadow-md p-4 rounded-2xl text-center"
              >
                <img
                  src={doc.image}
                  className="w-24 h-24 rounded-full mx-auto"
                  alt="doctor"
                />
                <h2 className="text-xl font-semibold mt-3">{doc.name}</h2>
                <p className="text-gray-500">{doc.specialization}</p>
                <label className="flex items-center justify-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    className="accent-violet-500"
                    checked={doc.available}
                    onChange={() => handleAvailChange(doc._id)}
                  />{" "}
                  Available
                </label>
              </div>
            ))}
          </div>
          {/* Pagination Component */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 border-1 p-2 rounded-xl cursor-pointer bg-[#5C67F2] text-white"
            >
              <FaArrowLeft />
              <span>Previous</span>
            </button>
            {Array(NoofPages)
              .keys()
              .map((ind) => (
                <button
                  onClick={() => handlePageChange(ind + 1)}
                  key={ind}
                  className={`border-1 rounded-md p-2 cursor-pointer ${currentPage === ind + 1 ? "bg-[#5C67F2] text-white" : ""
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

export default AllDoctors;
