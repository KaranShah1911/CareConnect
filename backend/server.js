import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToMongoDB from "./config/db.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./config/passport.config.js"; // Google OAuth config

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors({
  origin: ['https://care-connect-black.vercel.app', 'https://care-connect-doctor.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongoDB();
app.use(cookieParser());

// session middleware (required for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mydevsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
    },
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// routes
import adminRoutes from "./routes/admin.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.routes.js"; // Google auth routes

app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter); // mount auth route

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
