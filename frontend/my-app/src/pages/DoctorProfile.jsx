import React, { useState } from "react";
import DoctorPanel from "../components/DoctorPanel";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useStore } from "../utils/store";

const DoctorInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const sidebar = useStore((state)=>state.sidebar);

  const [form, setForm] = useState({
    image: null,
    name: "Dr. Sneha Patil",
    degree: "MBBS, MD",
    speciality: "Dermatologist",
    experience: "8",
    about:
      "Dedicated dermatologist with 8+ years of experience in treating skin and hair disorders.",
    fees: "500",
    address: "Vasant Vihar Clinic, Mumbai",
    available: true,
  });

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
    setEditMode(false);
    // Save to backend if needed
  };

  const handleCancel = () => {
    setEditMode(false);
    // Optionally restore original data if needed
  };

  return (
    <div className={`flex gap-5 p-5 pt-30 min-h-screen ${sidebar ? "pl-50" : "pl-15"} transition-all duration-300`}>
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
                    src={URL.createObjectURL(form.image)}
                    className="w-16 h-16 rounded-full object-cover border"
                    alt="preview"
                  />
                )}
              </>
            ) : (
              <img
                src={
                  form.image
                    ? URL.createObjectURL(form.image)
                    : "/default-user.png"
                }
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
              { label: "speciality", type: "text" },
              { label: "experience", type: "number" },
              { label: "fees", type: "number" },
              { label: "address", type: "text" },
            ].map(({ label, type }) => (
              <div key={label}>
                <label className="block font-medium text-violet-700 capitalize">
                  {label.replace("_", " ")}
                </label>
                {editMode ? (
                  <input
                    type={type}
                    name={label}
                    value={form[label]}
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
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              ) : (
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    form.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {form.available ? "Available" : "Unavailable"}
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
