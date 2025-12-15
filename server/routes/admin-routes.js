import express from "express";

import { addDoctor, adminLogin, getAllDoctors} from "../controller/adminController.js";
import upload from "../middlewares/multer.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controller/doctorsController.js";


const adminRoute= express.Router();

adminRoute.post('/add-doctors', authAdmin, upload.single('image'), addDoctor)
adminRoute.post('/login', adminLogin)
adminRoute.get('/all-doctors',authAdmin , getAllDoctors)
adminRoute.post('/change-availability',authAdmin , changeAvailability)


export default adminRoute;