import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctors,
} from "../Controllers/doctorController.js";

const router = express.Router();

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctors);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;
