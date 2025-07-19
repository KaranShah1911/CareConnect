import express from "express";
import {
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctor.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);

doctorRouter.get("/appointments", verifyJWT, appointmentsDoctor);

doctorRouter.post("/complete-appointment", verifyJWT, appointmentComplete);
doctorRouter.post("/cancel-appointment", verifyJWT, appointmentCancel);

doctorRouter.get("/dashboard", verifyJWT, doctorDashboard);

doctorRouter.get("/profile", verifyJWT, doctorProfile);
doctorRouter.post("/update-profile", verifyJWT, updateDoctorProfile);

export default doctorRouter;
