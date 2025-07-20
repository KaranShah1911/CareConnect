import doctorModel from "../models/doctor.models.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import appointmentModel from "../models/appointment.models.js";
import uploadOnCloudinary from "../config/cloudinary.js";

const changeAvailibility = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({ success: true, message: "Availibility Changed" });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, doctors });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API for Doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      throw new ApiError(404, "Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: doctor._id, role: "DOCTOR" },
        process.env.JWT_SECRET
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
      });

      res.json({ success: true, token, doctorId: doctor._id });
    } else {
      throw new ApiError(404, "Invalid Credentials");
    }
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
  try {
    const doctorId = req.body.userId;
    const appointments = await appointmentModel.find({ doctorId }).populate({
      path: "userId",
      select: "name image age",
    });

    res.json({ success: true, appointments });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const doctorId = req.body.userId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.doctorId == doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.status(400).json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to cancel apppointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const doctorId = req.body.userId;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.doctorId == doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
  try {
    const doctorId = req.body.userId;
    const appointments = await appointmentModel.find({ doctorId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    let count = 0;

    appointments.forEach(a => {
      if(!a.cancelled && !a.isCompleted)
      {
        count++;
      }
    });
    
    const dashData = {
      earnings,
      appointments: count,
      patients: patients.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const doctorId = req.body.userId;
    const profileData = await doctorModel
      .findById(doctorId)
      .select("-password");

    res.json({ success: true, profileData });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

// API to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const {
      name,
      degree,
      specialization,
      experience,
      about,
      fees,
      address,
      available,
    } = req.body;

    const imageFile = req.file;
    const docId = req.body.userId;

    if (imageFile) {
      // console.log("Uploading with image");
      const image = await uploadOnCloudinary(imageFile.path);
      const imageUrl = image.url;
      await doctorModel.findByIdAndUpdate(docId, { image: imageUrl });
    }

    const changedDoc = await doctorModel.findByIdAndUpdate(
      docId,
      {
        name,
        degree,
        specialization,
        experience,
        about,
        fees,
        address,
        available,
      },
      {
        new: true,
      }
    );

    res.json({ success: true, message: "Profile Updated", data: changedDoc });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
  }
};

export {
  changeAvailibility,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
