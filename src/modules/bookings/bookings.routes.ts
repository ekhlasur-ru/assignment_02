import express from "express";
import { bookingsControllers } from "./bookings.controllers";
import logger from "../../middleware/logger";
import auth from "../../middleware/authorize";
const router = express.Router();

router.post(
  "/bookings",
  logger,
  auth("admin", "customer"),
  bookingsControllers.createBooking
);
router.get(
  "/bookings",
  logger,
  auth("admin", "customer"),
  bookingsControllers.getAllBookings
);
router.put(
  "/bookings/:bookingId",
  logger,
  auth("admin", "customer"),
  bookingsControllers.updateBooking
);

export const bookingsRoutes = router;
