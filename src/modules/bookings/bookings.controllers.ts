import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getbookings();

    res.json({
      success: true,
      message: "Bookings fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "cancelled", "returned"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const result = await bookingServices.updatebookingsID(Number(id), status);

    let message = "Booking status updated";
    if (status === "returned")
      message = "Booking marked as returned. Vehicle is now available";
    if (status === "cancelled")
      message = "Booking cancelled. Vehicle is now available";

    res.status(200).json({ success: true, message, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const bookingsControllers = {
  createBooking,
  getAllBookings,
  // updateBookings,
};
