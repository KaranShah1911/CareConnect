import express from "express"
import { registerUser, loginUser, getProfile } from "../controllers/user.controller.js"
import { checkForAuthorization } from "../middlewares/auth.middleware.js";

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile', checkForAuthorization(["USER"]), getProfile)




export default userRouter
