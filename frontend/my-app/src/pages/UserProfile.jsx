import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useUserStore } from "../utils/user";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const { setImage } = useUserStore();
  const [form, setForm] = useState({
    image: null,
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: ""
    },
    age: "",
    gender: "",
    dob: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/user/get-profile", {
      withCredentials: true
    })
      .then(res => {
        setLoading(false);
        const data = res.data.userData;
        console.log(data);
        setOriginalData(data);
        setForm(data);
      })
      .catch(err => {
        console.error(err)
      });
  }, []);

  const handleSave = () => {
    console.log("Saving updated profile:", form);
    setEditMode(false);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("age", form.age);
    formData.append("dob", form.dob);
    formData.append("gender", form.gender);

    // Address is an object, so either flatten it or stringify it
    formData.append("address", JSON.stringify(form.address));

    // Only append the file if a new one is selected
    if (form.image instanceof File) {
      formData.append("image", form.image);
    }
    try {
      setLoading(true);
      axios.patch("http://localhost:3000/api/user/update-profile", formData, {
        withCredentials: true
      })
        .then(res => {
          setLoading(false);
          setForm(res.data.updatedUser);
          setOriginalData(res.data.updatedUser);
          setImage(res.data.updatedUser.image);
          toast.success('User profile updated..');
        })
        .catch(err => {
          toast.error('Error updating profile...');
          setForm(originalData);
          console.error(err);
        })
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm(originalData);
  };
  if (loading) return (
    <div className="fixed inset-0 z-1 flex items-center bg-white">
      <Loader />
    </div>
  )

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
          <div className="flex items-center justify-start gap-4">
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
                    src={typeof form.image === "string" ? form.image : URL.createObjectURL(form.image)}
                    className="w-16 h-16 rounded-full object-cover border"
                    alt="preview"
                  />
                )}
              </>
            ) : (
              <img
                src={form.image}
                className="w-16 h-16 rounded-full object-cover border"
                alt="User"
              />
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium text-violet-700">Name</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            ) : (
              <p className="p-2 text-gray-800 bg-gray-50 rounded">{form.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-violet-700">Email</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            ) : (
              <p className="p-2 text-gray-800 bg-gray-50 rounded">{form.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium text-violet-700">Phone</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            ) : (
              <p className="p-2 text-gray-800 bg-gray-50 rounded">{form.phone}</p>
            )}
          </div>

          {/* Address Line 1 */}
          <div>
            <label className="block font-medium text-violet-700">Address Line 1</label>
            {editMode ? (
              <input
                type="text"
                name="line1"
                value={form.address?.line1 || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, line1: e.target.value },
                  })
                }
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            ) : (
              <p className="p-2 text-gray-800 bg-gray-50 rounded">{form.address?.line1}</p>
            )}
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block font-medium text-violet-700">Address Line 2</label>
            {editMode ? (
              <input
                type="text"
                name="line2"
                value={form.address?.line2 || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: { ...form.address, line2: e.target.value },
                  })
                }
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            ) : (
              <p className="p-2 text-gray-800 bg-gray-50 rounded">{form.address?.line2}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium text-violet-700">Age</label>
            {editMode ? (
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            ) : (
              <p className="p-2 text-gray-800 bg-gray-50 rounded">{form.age}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="block font-medium text-violet-700">Date of Birth</label>
            {editMode ? (
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-300"
              />
            ) : (
              <p className="p-2 text-gray-800 bg-gray-50 rounded">{form.dob}</p>
            )}
          </div>

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
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
