import express from "express"
import { doctorList } from "../controllers/doctor.controllers.js";

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList)

export default doctorRouter
