import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRoute from "./routes/admin-routes.js";
import doctorsRoute from "./routes/doctorRoutes.js";
import userRoute from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();            
connectCloudinary();   

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


app.use("/api/admin", adminRoute);

app.use("/api", doctorsRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
