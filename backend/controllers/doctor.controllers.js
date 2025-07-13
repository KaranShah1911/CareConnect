import doctorModel from "../models/doctor.models.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config";

const changeAvailibility = async (req, res) => {
    try {

        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        
        res.json({ success: true, message: "Availibility Changed" })
        
    } catch (error) {
        return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
    }
}

const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email']);

        res.json({ success: true, doctors });
        
    } catch (error) {
        return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
    }
}

// API for Doctor login
const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email });

        if(!doctor)
        {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if(isMatch)
        {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

            res.json({ success: true, token });
        }

        else
        {
            res.json({ success: false, message: "Invalid Credentials" })
        }
        
    } catch (error) {
        return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
    }
}

export { changeAvailibility, doctorList, loginDoctor } 