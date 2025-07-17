import React, { useState } from "react";
import { useStore } from "../utils/store";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        clinic: null,
        specialization: "",
        degree: "",
        password: "",
        address: "",
        experience: null,
        fees: null,
        about: "",
        image: null
    });
    const sidebar = useStore((state) => state.sidebar)

    const handleChange = (e) => {
        setForm((prev) => { return { ...prev, [e.target.name]: e.target.value } });
    };
    const handlFileChange = (e)=>{
        const file = e.target.files[0];
        setForm((prev) => { return { ...prev, [e.target.name]: file } });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(form.clinic?.length < 8 || form.clinic?.length > 10 || form.clinic?.length==9){
            toast.error("Enter valid clinic number....");
            return;
        }
        // make the api call to pass data
        const formData = new formData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("clinic", form.clinic);
        formData.append("specialization", form.specialization);
        formData.append("degree", form.degree);
        formData.append("password", form.password);
        formData.append("address", form.address);
        formData.append("experience", form.experience);
        formData.append("fees", form.fees);
        formData.append("about", form.about);
        
        if(form.image instanceof file){
            formData.append("image", form.image);
        }

        console.log("Adding doctor" , formData);
        try {
            axios.post("http://localhost:3000/api/admin/add-doctor" , formData , {
                withCredentials : true
            })
            .then(res => {
                console.log(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
            .finally(()=>clearForm())

        } catch (err) {
            console.log(err);
        }
    }

    const clearForm = () => {
        setForm({
            name: "",
            email: "",
            password: "",
            specialization: "",
            experience: "",
            fees: "",
            about: "",
            address: "",
            clinic: "",
            degree: "",
            image: null
        });
    }
    return (
        <div className={`pt-25 pb-10 max-w-4xl mx-auto transition-all duration-300 ${sidebar ? "pl-10" : ""}`}>
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">Add Doctor</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handlFileChange}
                        required
                        />
                    {form.image && (
                        <img
                            src={typeof form.image === "string" ? form.image : URL.createObjectURL(form.image)}
                            className="w-16 h-16 rounded-full object-cover border"
                            alt="preview"
                        />
                    )}
                </div>
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
                    <label className="block font-medium text-violet-700 mb-1">Specialization</label>
                    <input
                        name="specialization"
                        value={form.specialization}
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
                    <label className="block font-medium text-violet-700 mb-1">Clinic/Phone Number</label>
                    <input
                        name="clinic"
                        value={form.clinic}
                        onChange={handleChange}
                        type="tel"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="8-digit clinic number"
                        required
                    />
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
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="Brief introduction or profile"
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
