import { pool } from "../../config/db";

const createVehicle = async (payload: any) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );

  return result.rows[0];
};

const getVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles `);
  return result.rows;
};

const getVehicleId = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result.rows[0];
};

const updateVehicle = async (id: string, payload: any) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `UPDATE vehicles 
     SET 
       vehicle_name = COALESCE($1, vehicle_name),
       type = COALESCE($2, type),
       registration_number = COALESCE($3, registration_number),
       daily_rent_price = COALESCE($4, daily_rent_price),
       availability_status = COALESCE($5, availability_status)
     WHERE id = $6
     RETURNING *`,
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

const deleteVehicle = async (id: string) => {
  const bookingCheck = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id=$1 AND status='active'`,
    [id]
  );

  if (bookingCheck.rows.length > 0) {
    throw new Error("Cannot delete: Vehicle has active bookings");
  }

  // Step 2: Delete vehicle
  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
  return result.rowCount;
};

export const vehicleServices = {
  createVehicle,
  getVehicles,
  getVehicleId,
  updateVehicle,
  deleteVehicle,
};
