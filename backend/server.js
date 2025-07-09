import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToMongoDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares :
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongoDB();
app.use(cookieParser());

// routes :
import adminRoutes from "./routes/admin.routes.js";
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
