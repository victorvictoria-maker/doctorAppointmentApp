import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctors,
  getDoctorProfile,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRoute from "./review.js";

const router = express.Router();

// nested route - ensures all route related to doctor reviews are nested to doctors id, to specific doctors
router.use("/:doctorId/reviews", reviewRoute);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);
router.get("/doctor/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
