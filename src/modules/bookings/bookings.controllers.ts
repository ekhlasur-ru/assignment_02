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
    const bookingId = req.params.bookingId;
    const status = req.body.status;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await bookingServices.updateBookings(
      bookingId as string,
      user.role as "admin" | "customer" | "system",
      status,
      user.id
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Booking not found or access denied",
      });
    }

    if (user.role === "customer" && status === "cancelled") {
      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result,
      });
    }

    if (user.role === "admin" && status === "returned") {
      return res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: {
          ...result,
          vehicle: {
            availability_status: "available",
          },
        },
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid update request",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Failed to update booking",
      error: error.message,
    });
  }
};
export const bookingsControllers = {
  createBooking,
  getAllBookings,
  updateBooking,
};
