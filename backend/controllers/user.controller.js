import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import appointmentModel from "../models/appointment.models.js";
import Doctor from "../models/doctor.models.js";
import mongoose from "mongoose";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validating email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    // Validating a strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new User(userData);
    const user = await newUser.save();

    const token = jwt.sign(
      { id: user._id, role: "USER" },
      process.env.JWT_SECRET
    );

    res.json({ success: true, token });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: user._id, role: "USER" },
        process.env.JWT_SECRET
      );
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId)
      throw new ApiError(400, "User Id is required. Token not decoding Id");

    const userData = await User.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!userId)
      throw new ApiError(400, "User Id is required. Token not decoding Id");

    if (!name || !phone || !address || !dob || !gender)
      throw new ApiError(400, "All fields are required");

    if (imageFile) {
      // console.log("Uploading with image");
      const image = await uploadOnCloudinary(imageFile.path);
      const imageUrl = image.url;
      await User.findByIdAndUpdate(userId, { image: imageUrl });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        address: JSON.parse(address),
        dob,
        gender,
      },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Profile updated" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// Api to book appointmment
// Done Some Changes in Book Appointment : ( Like didnt added userData and DocData coz it was irrelevant)
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await Doctor.findById(docId).select("-password");

    if (!docData) throw new ApiError(404, "Doctor not found");

    if (!docData.available) throw new ApiError(400, "Doctor not available");

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime))
        return res.json({ success: false, message: "Slot already booked" });
      else slots_booked[slotDate].push(slotTime);
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate] = [slotTime];
    }

    delete docData.slots_booked;

    console.log(docId);

    const appointment = new appointmentModel({
      userId,
      doctorId: docId,
      slotDate,
      slotTime,
      amount: docData.fees,
    });

    await appointment.save();

    await Doctor.findByIdAndUpdate(docId, { slots_booked });
    return res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to get user appointments for frontend my appointment page
const listAppointments = async (req, res) => {
  try {
    const userId = req.body.userId || req.userId;
    // console.log(userId);

    if (!userId)
      throw new ApiError(400, "User Id is required. Token not decoding Id");

    const appointments = await appointmentModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "_id",
          as: "docData",
        },
      },
    ]);
    return res.status(200).json(new ApiResponse(200, "Success", appointments));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
};
