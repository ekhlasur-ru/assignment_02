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
  try {
    const data = await bookingServices.updatebookingsID(
      req.params.bookingId as string,
      req.body
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const bookingsControllers = {
  createBooking,
  getAllBookings,
  updateBookings,
};
