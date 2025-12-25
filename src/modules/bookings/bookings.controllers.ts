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

const updateBookings = async (req: Request, res: Response) => {
  const bookingId = req.params.id;

  try {
    const result = await bookingServices.updatebookingsID(
      bookingId as string,
      req.body
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Booking ID not found",
      });
    }
    const message =
      req.body.status === "returned"
        ? "Booking marked as returned. Vehicle is now available"
        : "Booking updated successfully";

    return res.status(200).json({
      success: true,
      message,
      data: updateBookings,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const bookingsControllers = {
  createBooking,
  getAllBookings,
  updateBookings,
};
