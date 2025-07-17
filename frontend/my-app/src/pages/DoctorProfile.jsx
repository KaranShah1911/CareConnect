import React, { useEffect, useState } from "react";
import DoctorPanel from "../components/DoctorPanel";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useStore } from "../utils/store";
import axios from "axios";
import { toast } from "react-toastify";

// issue - some issue with image - after saving.
const DoctorInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const sidebar = useStore((state) => state.sidebar);
  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    image: null,
    name: "NA",
    degree: "MBBS, MD",
    specialization: "NA",
    experience: "NA",
    about: "NA",
    fees: "NA",
    address: {
      line1: "NA",
      line2: "NA",
    },
    availability: true,
  });

  // fetch profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctor/profile`, {
          withCredentials: true,
        });
        console.log("profile successfull", response.data);
        const data = await response.data.profileData;
        const parsedAddress =
          typeof data.address === "string"
            ? JSON.parse(data.address)
            : data.address;

        setForm({
          ...form,
          ...data,
          address: {
            line1: parsedAddress?.line1 || "",
            line2: parsedAddress?.line2 || "",
          },
        });
        console.log("form data", form);
      } catch (err) {
        console.error(err);
      }
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

  const handleSave = async () => {
    console.log("Saving doctor info:", form);
    setEditMode(false);
    // Save to backend if needed
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("degree", "MBBS, MD");
    formData.append("specialization", form.specialization);
    formData.append("experience", form.experience);
    formData.append("about", form.about);
    formData.append("fees", form.fees);
    formData.append("availability", form.availability);


    // Address is an object, so either flatten it or stringify it
    formData.append("address", JSON.stringify(form.address));

    // Only append the file if a new one is selected
    if (form.image instanceof File) {
      formData.append("image", form.image);
    }
    // else formData.append("image", "/default-user.png")
    try {
      // setLoading(true);
      axios
        .post("http://localhost:3000/api/doctor/update-profile", formData, {
          withCredentials: true,
        })
        .then((res) => {
          // setForm(res.data.updatedUser);
          // setOriginalData(res.data.updatedUser); 
          // setImage for doctor
          toast.success("User profile updated..");
        })
        .catch((err) => {
          toast.error("Error updating profile...");
          // setForm(originalData);
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    // Optionally restore original data if needed
  };

  return (
    <div
      className={`flex gap-5 p-5 pt-30 min-h-screen ${
        sidebar ? "pl-50" : "pl-15"
      } transition-all duration-300`}
    >
      <div className="w-[60vw] p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-700">Doctor Profile</h2>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="text-indigo-600 hover:text-indigo-800"
            >
              <FaEdit /> Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-800"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={handleCancel}
                className="text-red-500 hover:text-red-700"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>

        <form className="space-y-5">
          {/* Image Upload */}
          <div className="flex items-center gap-4">
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
                    className="w-16 h-16 rounded-full object-cover border"
                    alt="preview"
                  />
                )}
              </>
            ) : (
              <img
                src={form.image ? form.image : "/default-user.png"}
                className="w-16 h-16 rounded-full object-cover border"
                alt="Doctor"
              />
            )}
          </div>

          {/* Info Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "name", type: "text" },
              { label: "degree", type: "text" },
              { label: "specialization", type: "text" },
              { label: "experience", type: "number" },
              { label: "fees", type: "number" },
            ].map(({ label, type }) => (
              <div key={label}>
                <label className="block font-medium text-violet-700 capitalize">
                  {label}
                </label>
                {editMode ? (
                  <input
                    type={type}
                    name={label}
                    value={form[label] || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
                  />
                ) : (
                  <p className="p-2 text-gray-800 bg-gray-50 rounded">
                    {form[label]}
                  </p>
                )}
              </div>
            ))}

            {/* Address Line 1 */}
            <div>
              <label className="block font-medium text-violet-700">
                Address Line 1
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="line1"
                  value={form.address?.line1 || "NA"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: { ...form.address, line1: e.target.value },
                    })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="p-2 text-gray-800 bg-gray-50 rounded">
                  {form.address?.line1}
                </p>
              )}
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block font-medium text-violet-700">
                Address Line 2
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="line2"
                  value={form.address?.line2 || "NA"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: { ...form.address, line2: e.target.value },
                    })
                  }
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="p-2 text-gray-800 bg-gray-50 rounded">
                  {form.address?.line2}
                </p>
              )}
            </div>

            {/* About Field - Full Width */}
            <div className="sm:col-span-2">
              <label className="block font-medium text-violet-700">About</label>
              {editMode ? (
                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="p-2 text-gray-800 bg-gray-50 rounded">
                  {form.about}
                </p>
              )}
            </div>

            {/* Availability Toggle */}
            <div className="sm:col-span-2 flex items-center gap-3">
              <label className="font-medium text-violet-700">
                Availability Status:
              </label>
              {editMode ? (
                <input
                  type="checkbox"
                  name="availability"
                  checked={form.availability}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    form.availability
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {form.availability ? "Available" : "Unavailable"}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorInfo;
