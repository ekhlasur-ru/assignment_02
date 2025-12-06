import express, { Request, Response } from "express";
import { bookingsControllers } from "./bookings.controllers";
import logger from "../../middleware/logger";
// import authRole from "../../middleware/authorize";

const router = express.Router();

router.post("/bookings", logger, bookingsControllers.createNewBooking);
router.get("/bookings", logger, bookingsControllers.getBookings);
router.put("/bookings/:bookingId", logger, bookingsControllers.updateBooking);

export const bookingsRoutes = router;
