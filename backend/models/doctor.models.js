import mongoose from "mongoose";
import bcrypt from "bcrypt";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    about: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    slots_booked: {
      type: Object,
      default: {},
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { minimize: false, timestamps: true }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

doctorSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Doctor = mongoose.model("doctor", doctorSchema);

export default Doctor;
