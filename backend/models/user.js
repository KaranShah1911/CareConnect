import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    password: {
      type: String,
    },
    address: {
      type: Object,
      default: {
        line1: "NOT PROVIDED",
        line2: "NOT PROVIDED",
      },
    },
    gender: {
      type: String,
      default: "NOT SELECTED",
    },
    dob: {
      type: String,
      default: "Not Provided",
    },
    phone: {
      type: String,
      default: "NOT PROVIDED",
    },
    age : {
      type: String,
      default: "Not Provided"
    }
  },
  { minimize: false, timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
