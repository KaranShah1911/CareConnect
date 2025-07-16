import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToMongoDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares :
app.use(cors({
  origin: 'http://localhost:5173',  // The frontend URL that is allowed to make requests
  methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],  // Allowed HTTP methods
  credentials: true  // Allow credentials (cookies, etc.)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongoDB();
app.use(cookieParser());
app.use(express.json());

// routes :
import adminRoutes from "./routes/admin.routes.js";
import doctorRouter from "./routes/doctor.routes.js";
import userRouter from "./routes/user.route.js";
app.use("/api/admin", adminRoutes);

app.use("/api/doctor", doctorRouter);

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
