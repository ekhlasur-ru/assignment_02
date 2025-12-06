import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configENV from "../../config";

const createUser = async (
  payload: SignupPayload
): Promise<{
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}> => {
  const { name, email, password, phone, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, phone, role`,
    [name, email, hashedPassword, phone, role]
  );

  return result.rows[0];
};

const loginUser = async (email: string, password: string) => {
  console.log({ email });
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  console.log({ result });
  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Password does not match");
  }

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    configENV.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );

  return { token, user };
};

export const authServices = { createUser, loginUser };
