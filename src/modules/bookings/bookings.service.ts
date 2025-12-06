import { pool } from "../../config/db";

const createbookings = async (payload: any) => {
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

const getbookings = async () => {
  const result = await pool.query(`SELECT * FROM vehicles ORDER BY id DESC`);
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

export const bookingsServices = {
  createbookings,
  getbookings,
  updatebookingsID,
};
