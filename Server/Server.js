import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/Mongodb.js";
import UserRouter from "./Routes/UserRoutes.js";
import ImageRouter from "./Routes/ImageRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// DB
connectDB();

// Middleware
app.use(express.json());

// ✅ FIXED CORS (this alone is enough)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://image-gen-kohl-iota.vercel.app"
  ],
  credentials: true
}));

// Routes
app.use("/api/user", UserRouter);
app.use("/api/image", ImageRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});