import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useStore } from "../store/store";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const API_URL = import.meta.env.VITE_API_URL;

// issue - some issue with image - after saving.
const DoctorProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const sidebar = useStore((state) => state.sidebar);

  const [form, setForm] = useState({
    name: "",
    email: "",
    clinic_phno: null,
    specialization: "",
    degree: "",
    address: "",
    experience: null,
    fees: null,
    about: "",
    image: null,
    available: false,
  });
  const [originalData, setOriginalData] = useState({});

  // fetch profile data
  useEffect(() => {
    const fetchData = () => {
      try {
        setLoading(true);
        axios.get(`${API_URL}/doctor/profile`, {
          withCredentials: true,
        })
          .then((response) => {
            const data = response.data.profileData;
            console.log("profile successfull", data);
            setForm({ ...data });
            setOriginalData({ ...data });
          })
          .catch((error) => {
            toast.error("Error fetching profile data");
            console.error(error);
          });
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = () => {
    console.log("Saving doctor info:", form);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("degree", form.degree);
      formData.append("specialization", form.specialization);
      formData.append("experience", form.experience);
      formData.append("about", form.about);
      formData.append("fees", form.fees);
      formData.append("available", form.available);
      formData.append("address", form.address);

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      axios
        .post(`${API_URL}/doctor/update-profile`, formData, {
          withCredentials: true,
        })
        .then((res) => {
          const data = res.data.data;
          setForm({ ...data });
          setOriginalData({ ...data });
          toast.success("Profile updated successfully");
        })
        .catch((err) => {
          toast.error(err.response || "Profile update failed");
          console.log(err);
        });
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    }
    setLoading(false);
    setEditMode(false);
  };

  const handleCancel = () => {
    setForm(originalData);
    setEditMode(false);
  };

  if (loading)
    return (
      <div className="fixed inset-0 z-1 flex items-center bg-white">
        <Loader />
      </div>
    );

  return (
    <div
      className={`flex gap-5 p-5 pt-30 min-h-screen ${sidebar ? "pl-60" : "pl-16"
        } transition-all duration-300`}
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-700">
              Doctor Profile
            </h2>
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FaEdit className="inline mr-1" /> Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaSave className="inline mr-1" /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes className="inline mr-1" /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div className="mb-6">
            <label className="block font-medium text-violet-700 mb-1">
              Profile Picture
            </label>
            {editMode ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                />
                {form.image && (
                  <img
                    src={
                      typeof form.image === "string"
                        ? form.image
                        : URL.createObjectURL(form.image)
                    }
                    className="w-16 h-16 mt-2 rounded-full object-cover border"
                    alt="preview"
                  />
                )}
              </>
            ) : (
              <img
                src={form?.image}
                className="w-16 h-16 rounded-full object-cover border"
                alt="Doctor"
              />
            )}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block font-medium text-violet-700">Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{form?.name}</p>
              )}
            </div>

            {/* Degree */}
            <div>
              <label className="block font-medium text-violet-700">
                Degree
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="degree"
                  value={form?.degree}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{form?.degree}</p>
              )}
            </div>

            {/* specialization */}
            <div>
              <label className="block font-medium text-violet-700">
                specialization
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="specialization"
                  value={form?.specialization}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{form?.specialization}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block font-medium text-violet-700">
                Experience (Years)
              </label>
              {editMode ? (
                <input
                  type="number"
                  name="experience"
                  value={form?.experience}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{form?.experience}</p>
              )}
            </div>

            {/* Fees */}
            <div>
              <label className="block font-medium text-violet-700">
                Fees (₹)
              </label>
              {editMode ? (
                <input
                  type="number"
                  name="fees"
                  value={form?.fees}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{form?.fees}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium text-violet-700">
                Address
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{form?.address}</p>
              )}
            </div>

            {/* About */}
            <div className="sm:col-span-2">
              <label className="block font-medium text-violet-700">About</label>
              {editMode ? (
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg"
                />
              ) : (
                <p className="p-2 bg-gray-50 rounded">{form?.about}</p>
              )}
            </div>

            {/* Availability */}
            <div className="sm:col-span-2 flex items-center gap-3">
              <label className="font-medium text-violet-700">
                Availability:
              </label>
              {editMode ? (
                <input
                  type="checkbox"
                  name="available"
                  checked={form?.available}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${form?.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                    }`}
                >
                  {form?.available ? "Available" : "Unavailable"}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
