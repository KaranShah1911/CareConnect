import validator from "validator"
import bcrypt from "bcrypt"
import User from "../models/user.models.js";
import jwt from 'jsonwebtoken'
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js";


// API to register user
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        if(!name || !email || !password)
        {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Validating email
        if(!validator.isEmail(email))
        {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        // Validating a strong password
        if(password.length < 8)
        {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new User(userData)
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token });

    } catch (error) {
        return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
    }
}

// API for user login

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })

        if(!user)
        {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch)
        {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }

        else
        {
            res.json({ success: false, message: "Invalid Credentials" });
        }
        
    } catch (error) {
        return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {

        const { userId } = req.body;
        const userData = await User.findById(userId).select('-password')

        res.json({ success: true, userData });
        
    } catch (error) {
        return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, error.message));
    }
}

export { registerUser, loginUser, getProfile }
