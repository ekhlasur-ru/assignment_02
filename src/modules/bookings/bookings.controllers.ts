import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";

interface BookingParams {
  bookingId: string;
}

const createNewBooking = async (req: Request, res: Response) => {
  try {
    const user_id = req.user.id;
    const payload = { ...req.body, customer_id: user_id };
    const data = await bookingsServices.createbookings(payload);
    res.status(201).json({ success: true, message: "Booking created", data });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const user_id = req.user.id;
    const role = req.user.role;
    const data = await bookingsServices.getbookings(user_id, role);
    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateBooking = async (req: Request<BookingParams>, res: Response) => {
  try {
    const bookingId = req.params.bookingId;
    const role = req.user.role;
    const action = req.body.action as "cancel" | "return";

    const result = await bookingsServices.updatebookingsID(
      bookingId,
      role,
      action
    );
    res.status(200).json({ success: true, message: result.message });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const bookingsControllers = {
  createNewBooking,
  getBookings,
  updateBooking,
};
