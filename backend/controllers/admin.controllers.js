import { validationResult } from "express-validator";
import uploadOnCloudinary from "../config/cloudinary.js";
import Doctor from "../models/doctor.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment.js";
import User from "../models/user.js";
import "dotenv/config";

const addDoctor = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, "Incomplete or wrong fields", errors.array());
    }

    let data = req.body;
    const address = JSON.parse(data.address);
    data.address = address;

    // Check for image file
    if (!req.file) {
      throw new ApiError(400, "Image is required.");
    }

    // Upload image to Cloudinary
    const cloudinaryResult = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResult || !cloudinaryResult.url) {
      throw new ApiError(500, "Error uploading image to Cloudinary.");
    }
    data.image = cloudinaryResult.url;

    // Save doctor to DB
    const doctor = new Doctor(data);
    await doctor.save();

    res
      .status(201)
      .json(new ApiResponse(201, "Doctor added successfully", doctor));
  } catch (e) {
    return res
      .status(e.statusCode || 500)
      .json(new ApiResponse(e.statusCode || 500, e.message));
  }
};

const handleAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required.");
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      const token = jwt.sign({ email, role: "ADMIN" }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        // sameSite: "none",
      });

      return res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    } else {
      throw new ApiError(401, "Invalid email or password.");
    }
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to get all doctors list for the admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");

    res.json({ success: true, doctors });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to get all appointment list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor's slot
    const { doctorId, slotDate, slotTime } = appointmentData;

    const doctorData = await Doctor.findById(doctorId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await Doctor.findByIdAndUpdate(doctorId, { slots_booked });

    res.status(200).json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to get dashboard data for the admin
const adminDashBoard = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    const users = await User.find({});
    const appointments = await appointmentModel.find({}).populate("userId", "name image").populate("doctorId", "name image");

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patiens: users.length,
      latestAppointments: appointments.reverse(),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

export {
  addDoctor,
  handleAdminLogin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashBoard,
};
