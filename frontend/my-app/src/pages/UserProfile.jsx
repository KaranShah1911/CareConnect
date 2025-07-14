import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    image: null,
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    address: "123 Main St",
    age: "28",
    gender: "Male",
    birthday: "1996-01-01",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSave = () => {
    console.log("Saving updated profile:", form);
    setEditMode(false);
    // Save to backend or Zustand here
  };

  const handleCancel = () => {
    setEditMode(false);
    // Optionally revert form values here
  };

  return (
    <div className="min-h-screen pt-30">
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">Patient Profile</h2>
        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="text-indigo-600 hover:text-indigo-800">
            <FaEdit /> Edit
          </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={handleSave} className="text-green-600 hover:text-green-800">
              <FaSave /> Save
            </button>
            <button onClick={handleCancel} className="text-red-500 hover:text-red-700">
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
              alt="User"
            />
          )}
        </div>

        {/* Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["name", "email", "phone", "address", "age", "birthday"].map((key) => (
            <div key={key}>
              <label className="block font-medium text-violet-700 capitalize">{key}</label>
              {editMode ? (
                <input
                  type={key === "birthday" ? "date" : key === "age" ? "number" : "text"}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="p-2 text-gray-800 bg-gray-50 rounded">{form[key]}</p>
              )}
            </div>
          ))}

          {/* Gender */}
          <div>
            <label className="block font-medium text-violet-700">Gender</label>
            {editMode ? (
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <div className="p-2 text-gray-800 bg-gray-50 rounded">{form.gender}</div>
            )}
          </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default UserProfile;
