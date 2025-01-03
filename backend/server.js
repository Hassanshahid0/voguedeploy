

import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import barberRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

const corsOptions = {
  origin: port,
  methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/user", userRouter);           // User routes
app.use("/api/admin", adminRouter);         // Admin routes
app.use("/api/doctor", barberRouter);       // barber routes


// Default route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => console.log(`Server started on PORT:${port}`));
