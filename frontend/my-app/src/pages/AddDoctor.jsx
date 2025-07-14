import React, { useState } from "react";
import { useStore } from "../utils/store";

const AddDoctor = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: null,
        clinic: null,
        specialty: "",
        degree: "",
        password: "",
        address: "",
        experience: null,
        fees: null,
        bio: "",
    });
    const sidebar = useStore((state)=>state.sidebar)

    const handleChange = (e) => {
        setForm((prev) => { return { ...prev, [e.target.name]: e.target.value } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.clinic && !form.phone) {
            alert("Please enter valid phone number or clinic number");
            return;
        }
        if (form.clinic && form.clinic.length != 8) {
            alert("Please enter 8 digit clinic number");
            return;
        }
        if (form.phone && form.phone.length != 10) {
            alert("Please enter 10 digit phone number");
            return;
        }

        // make the api call to pass data
        try {

        } catch (err) {
            console.log(err);
        }

        clearForm();
    }

    const clearForm = () => {
        setForm({
            name: "",
            email: "",
            phone: null,
            clinic: null,
            specialty: "",
            degree: "",
            password: "",
            address: "",
            experience: null,
            fees: null,
            bio: "",
        });
    }
    return (
        <div className={`pt-25 pb-10 max-w-4xl mx-auto transition-all duration-300 ${sidebar ? "pl-10":""}`}>
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">Add Doctor</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-medium text-violet-700 mb-1">Doctor Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="Enter full name"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Speciality</label>
                    <input
                        name="specialty"
                        value={form.specialty}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="e.g. Cardiologist"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Email</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="example@domain.com"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Clinic Number</label>
                    <input
                        name="clinic"
                        value={form.clinic}
                        onChange={handleChange}
                        type="tel"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="8-digit clinic number"

                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Phone Number</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        type="tel"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="10-digit phone number"
                    />
                    {/* <PhoneInput
                        placeholder="Enter phone number"
                        name="phone"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        defaultCountry="IN"
                        style={{border : "1px solid" , padding:"5px" }}
                        /> */}
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Degree</label>
                    <input
                        name="degree"
                        value={form.degree}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="e.g. MBBS, MD"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Experience (Years)</label>
                    <input
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        type="number"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="e.g. 5"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Fees</label>
                    <input
                        name="fees"
                        value={form.fees}
                        onChange={handleChange}
                        type="number"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="e.g. 500"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Password</label>
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="Create a secure password"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium text-violet-700 mb-1">Address</label>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="Full clinic or hospital address"
                        required
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium text-violet-700 mb-1">Bio</label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="Brief introduction or profile"
                        required
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
