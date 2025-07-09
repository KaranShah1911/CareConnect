import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToMongoDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares :
app.use(cors());
app.use(express.json());
connectToMongoDB();

// routes :
app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
