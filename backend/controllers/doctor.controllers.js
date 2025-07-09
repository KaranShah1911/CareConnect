import doctorModel from "../models/doctor.models.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";

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

export { changeAvailibility, doctorList } 