import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/doctorsModel.js";
import jwt from 'jsonwebtoken';

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // 🧩 1. Required fields check
    if (!name || !email || !password || !speciality || !degree || !experience || !fees || !address) {
      return res.json({
        status: false,
        message: "Required fields are missing",
      });
    }

    // 🧩 2. Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        status: false,
        message: "Invalid email format",
      });
    }

    // 🧩 3. Password length validation
    if (password.length < 8) {
      return res.json({
        status: false,
        message: "Password must be at least 8 characters",
      });
    }

    // 🧩 4. Check duplicate doctor (email)
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.json({
        status: false,
        message: "Doctor with this email already exists",
      });
    }

    // 🧩 5. Hash password
    const hashPass = await bcrypt.hash(password, 10);

    // 🧩 6. Upload image to Cloudinary
    let imageUrl = "";
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    // 🧩 7. Create doctor data
const doctorData = {
  name,
  email,
  password: hashPass,
  image: imageUrl,
  speciality,
  degree,
  experience: Number(experience), 
  about,
  available: available ?? true,
  fees: Number(fees),
  address: address,
  date: Date.now(),
};

    // 🧩 8. Save to DB
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    // 🧩 9. Send response
    return res.json({
      status: true,
      message: "Doctor added successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
      const token = jwt.sign(
        { email },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );

      return res.json({
        status: true,
        message: "Admin verified ✅",
        token,
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Not an admin ❌",
      });
    }

  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.status(200).json({
      status: true,
      message: "Doctors fetched successfully",
      doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};


export { addDoctor, adminLogin, getAllDoctors };
