import express from "express";

import { authenticate } from "../auth/verifyToken.js";
import { makeBooking } from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/:doctorId", authenticate, makeBooking);

export default router;
