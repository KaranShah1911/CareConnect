import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  // paymentRazorpay,
} from "../controllers/user.controller.js";
import {
  verifyJWT,
  checkForAuthorization,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", verifyJWT, getProfile);

userRouter.post(
  "/update-profile",
  upload.single("image"),
  verifyJWT,
  updateProfile
);

userRouter.post(
  "/book-appointment",
  checkForAuthorization(["USER"]),
  verifyJWT,
  bookAppointment
);

userRouter.get("/list-appointments", verifyJWT, listAppointments);

userRouter.post('/cancel-appointment', verifyJWT, cancelAppointment);

// userRouter.post('/payment-razorpay', verifyJWT, paymentRazorpay);
// userRouter.post('verify-razorpay', verifyJWT, verifyRazorpay);

export default userRouter;
