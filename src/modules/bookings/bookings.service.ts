import { pool } from "../../config/db";

interface CreateBookingPayload {
  customer_id: number;
  vehicle_id: number;
  rent_start_date: string;
  rent_end_date: string;
}

const createBooking = async (payload: CreateBookingPayload) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  if (end <= start) {
    throw new Error("rent_end_date must be after rent_start_date");
  }

  const vehicleResult = await pool.query(
    `SELECT id, daily_rent_price, availability_status 
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

  const milliseconds = end.getTime() - start.getTime();
  const days = Math.ceil(milliseconds / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    throw new Error("Invalid booking duration");
  }

  const total_price = Number(vehicle.daily_rent_price) * days;

  const bookingResult = await pool.query(
    `INSERT INTO bookings
    (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, 'active') RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  await pool.query(
    `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
    [vehicle_id]
  );

  return bookingResult.rows[0];
};

const getbookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings ORDER BY id DESC`);
  return result.rows;
};

const updatebookingsID = async (id: string, payload: any) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `UPDATE vehicles 
     SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5
     WHERE id=$6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );

  return result.rows[0];
};

export const bookingServices = {
  createBooking,
  getbookings,
  updatebookingsID,
};
