import { Request, Response } from "express";
import { bookingServices } from "./bookings.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Booking creation failed",
      errors: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.user as { id: number; role: string };

    const result = await bookingServices.getBookings(id, role);

    const customMessage =
      role === "admin"
        ? "Bookings retrieved successfully"
        : "Your bookings retrieved successfully";
    return res.status(200).json({
      success: true,
      message: customMessage,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieved  bookings",
      errors: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: number; role: string };

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        errors: "User authentication required",
      });
    }

    const bookingId = req.params.bookingId;
    const payload = req.body;
    const result = await bookingServices.updateBookings(
      bookingId as string,
      user.role,
      payload,
      user.id
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or access denied",
        errors: "Invalid booking ID or insufficient permission",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Bookings updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to update booking",
      errors: error.message,
    });
  }
};

export const bookingsControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
};
