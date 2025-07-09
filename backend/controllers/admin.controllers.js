import { validationResult } from "express-validator";
import uploadOnCloudinary from "../config/cloudinary.js";
import Doctor from "../models/doctor.models.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, "Incomplete or wrong fields", errors.array());
    }

    const {
      name,
      email,
      password,
      specialization,
      experience,
      fees,
      about,
      address,
    } = req.body;

    // Basic validation
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !experience ||
      !fees ||
      !about ||
      !address
    ) {
      throw new ApiError(400, "All fields are required.");
    }

    // Check for image file
    if (!req.file) {
      throw new ApiError(400, "Image is required.");
    }

    // Upload image to Cloudinary
    const cloudinaryResult = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResult || !cloudinaryResult.url) {
      throw new ApiError(500, "Error uploading image to Cloudinary.");
    }

    // Save doctor to DB
    const doctor = new Doctor({
      name,
      email,
      password,
      specialization,
      experience,
      fees,
      about,
      address: JSON.parse(address),
      image: cloudinaryResult.url,
      date: Date.now(),
    });

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
        sameSite: "none",
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

    const doctors = await Doctor.find({}).select('-password')

    res.json({ success: true, doctors })
    
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
}

export { addDoctor, handleAdminLogin, allDoctors };
