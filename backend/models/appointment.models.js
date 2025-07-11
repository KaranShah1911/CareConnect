import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
  },
  slotDate: {
    type: String,
    required: true,
  },
  slotTime: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  cancelled: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
