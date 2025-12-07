import express from "express";
import { bookingsControllers } from "./bookings.controllers";
import logger from "../../middleware/logger";
import auth from "../../middleware/authorize";
const router = express.Router();

router.post(
  "/bookings",
  logger,
  auth("admin", "user"),
  bookingsControllers.createBooking
);
router.get(
  "/bookings",
  logger,
  auth("admin", "user"),
  bookingsControllers.getAllBookings
);
router.put(
  "/bookings/:bookingId",
  logger,
  auth("admin", "user"),
  bookingsControllers.updateBookings
);

export const bookingsRoutes = router;
