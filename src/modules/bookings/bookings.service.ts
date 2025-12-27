import { pool } from "../../config/db";

interface CreateBookingPayload {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

const createBooking = async (payload: CreateBookingPayload) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleResult = await pool.query(
    `SELECT id, vehicle_name, daily_rent_price, availability_status,registration_number 
     FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available for booking");
  }

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  if (end <= start) {
    throw new Error("rent_end_date must be after rent_start_date");
  }
  const milliseconds = end.getTime() - start.getTime();
  const days = Math.ceil(milliseconds / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    throw new Error("Invalid booking duration");
  }

  const total_price = vehicle.daily_rent_price * days;

  const bookingResult = await pool.query(
    `INSERT INTO bookings
    (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );
  const booking = bookingResult.rows[0];

  await pool.query(
    `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
    [vehicle_id]
  );

  return {
    ...booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const getBookings = async (userId: number, role: string) => {
  if (role === "admin") {
    const result = await pool.query(`
      SELECT 
        b.*,
        u.name AS customer_name,
        u.email AS customer_email,
        v.vehicle_name,
        v.registration_number,
        v.daily_rent_price
      FROM bookings as b
      JOIN users as u ON b.customer_id = u.id
      JOIN vehicles as v ON b.vehicle_id = v.id
      ORDER BY b.id ASC
    `);

    return result.rows.map((row) => ({
      id: row.id,
      customer_id: row.customer_id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: Number(row.total_price),
      status: row.status,
      customer: {
        name: row.customer_name,
        email: row.customer_email,
      },
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
      },
    }));
  }

  if (role === "customer") {
    const result = await pool.query(
      `
      SELECT 
        b.*,
        v.vehicle_name,
        v.registration_number,
        v.type
      FROM bookings as b
      JOIN vehicles as v ON b.vehicle_id = v.id
      WHERE b.customer_id = $1
      ORDER BY b.id ASC
      `,
      [userId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      vehicle_id: row.vehicle_id,
      rent_start_date: row.rent_start_date,
      rent_end_date: row.rent_end_date,
      total_price: Number(row.total_price),
      status: row.status,
      vehicle: {
        vehicle_name: row.vehicle_name,
        registration_number: row.registration_number,
        type: row.type,
      },
    }));
  }

  throw new Error("Unauthorized role");
};

const updateBookings = async (
  bookingId: string,
  role: "admin" | "customer" | "system",
  status: "cancelled" | "returned",
  userId?: number
) => {
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [
    bookingId,
  ]);

  const booking = bookingRes.rows[0];
  if (!booking) return null;

  const today = new Date();
  const startDate = new Date(booking.rent_start_date);
  const endDate = new Date(booking.rent_end_date);

  if (role === "customer") {
    if (booking.customer_id !== userId) return null;
    if (today >= startDate) throw new Error("Cannot cancel after start date");
    if (status !== "cancelled") throw new Error("Invalid status");

    const result = await pool.query(
      `UPDATE bookings
       SET status = 'cancelled'
       WHERE id = $1
       RETURNING *`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles
       SET availability_status = 'available'
       WHERE id = $1`,
      [booking.vehicle_id]
    );

    return result.rows[0];
  }

  if (role === "admin") {
    if (status !== "returned") throw new Error("Invalid status");

    const result = await pool.query(
      `UPDATE bookings
       SET status = 'returned'
       WHERE id = $1
       RETURNING *`,
      [bookingId]
    );

    await pool.query(
      `UPDATE vehicles
       SET availability_status = 'available'
       WHERE id = $1`,
      [booking.vehicle_id]
    );

    return result.rows[0];
  }

  if (role === "system") {
    if (today > endDate && booking.status !== "returned") {
      const result = await pool.query(
        `UPDATE bookings
         SET status = 'returned'
         WHERE id = $1
         RETURNING *`,
        [bookingId]
      );

      await pool.query(
        `UPDATE vehicles
         SET availability_status = 'available'
         WHERE id = $1`,
        [booking.vehicle_id]
      );

      return result.rows[0];
    }

    return booking;
  }

  return null;
};

export const bookingServices = {
  createBooking,
  getBookings,
  updateBookings,
};
