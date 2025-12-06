import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

interface SignupPayload {
  id?: number; // id should be optional (DB usually auto-generates)
  name: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export const createUser = async (payload: SignupPayload) => {
  const { name, email, password, phone, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, email, hashedPassword, phone, role]
  );

  return result.rows[0];
};

export const authServices = { createUser };
