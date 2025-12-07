import express, { Request, Response } from "express";
import { bookingsControllers } from "./bookings.controllers";
import logger from "../../middleware/logger";
// import authRole from "../../middleware/authorize";

const router = express.Router();

router.post("/bookings", logger, bookingsControllers.createBooking);
router.get("/bookings", logger, bookingsControllers.getAllBookings);
// router.put("/bookings/:bookingId", logger, bookingsControllers.updateBookings);

export const bookingsRoutes = router;
