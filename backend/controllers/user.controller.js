import validator from "validator";
import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import appointmentModel from "../models/appointment.models.js";
import Doctor from "../models/doctor.models.js";
import mongoose from "mongoose";
import razorpay from "razorpay";

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: true
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true
    });

    res.json({ success: true, token, image: user.image });
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
      throw new ApiError(404, "User not exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: user._id, role: "USER" },
        process.env.JWT_SECRET
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true
      });

      const userImage = user.image;

      res.json({
        success: true,
        token,
        userImage, // includes image URL
      });
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

    const userData = await User.findById(userId).select(["address", "image", "name", "email", "phone", "age", "gender", "dob"]);

    res.json({ success: true, userData });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

const updateProfile = async (req, res) => {
  try {
    const data = req.body;
    let { userId, ...newData } = data;
    const imageFile = req.file?.path;

    if (!userId)
      throw new ApiError(400, "User Id is required. Token not decoding Id");

    const address = JSON.parse(newData.address);
    newData.address = address;

    if (imageFile) {
      const image = await uploadOnCloudinary(imageFile);
      newData.image = image.url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, newData, {
      new: true,
    }).select(["address", "image", "name", "email", "phone", "age", "gender", "dob"]);

    return res.status(200).json({ success: true, updatedUser : updatedUser , message: "Profile updated" });
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
    const { userId, doctorId, slotDate, slotTime } = req.body;

    const docData = await Doctor.findById(doctorId).select("-password");

    if (!docData) throw new ApiError(404, "Doctor not found");

    if (!docData.available) return res.json({ success: false, message: "Doctor not available" });

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
    // console.log(doctorId);

    const appointment = new appointmentModel({
      userId,
      doctorId: doctorId,
      slotDate,
      slotTime,
      amount: docData.fees,
    });

    await appointment.save();

    await Doctor.findByIdAndUpdate(doctorId, { slots_booked });
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
      {
        $unwind: "$docData" // this makes docData a plain object instead of an array
      }

    ]);
    return res.status(200).json(new ApiResponse(200, "Success", appointments));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify the user
    if (appointmentData.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorised Action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentData, {
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

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// const razorpayInstance = new razorpay({
//   key_id: "",
//   key_secret: "",
// });

// // API to make the payments
// const paymentRazorpay = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId);

//     if (!appointmentData || appointmentData.cancelled) {
//       return res.json({
//         success: false,
//         message: "Appointment cancelled or not found",
//       });
//     }

//     // Creating options of Payment
//     const options = {
//       amount: appointmentData.amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: appointmentId,
//     };

//     // Creation of order
//     const order = await razorpayInstance.order.create(options);

//     res.json({ success: true, order });
//   } catch (error) {
//     return res
//       .status(error.statusCode || 500)
//       .json(new ApiResponse(error.statusCode || 500, error.message));
//   }

//   // API to verify payment
//   const verifyRazorpay = async (req, res) => {

//     try {

//       const { razorpay_order_id } = req.body;
//       const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

//       if(orderInfo.status === 'paid')
//       {
//         await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
//         res.json({ success: true, message: "Payment Successfull" });
//       }

//       else
//       {
//         res.json({ success: false, message: "Payment Failed" });
//       }

//     } catch (error) {
//       return res
//       .status(error.statusCode || 500)
//       .json(new ApiResponse(error.statusCode || 500, error.message));
//     }
//   }
// };

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  // paymentRazorpay,
};
