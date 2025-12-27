import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users ORDER BY id ASC`
  );
  return result.rows;
};
const updateUser = async (id: string, role: string, payload: any) => {
  let result;

  if (role === "admin") {
    const { name, email, phone, role: newRole } = payload;

    result = await pool.query(
      `
      UPDATE users
      SET name  = COALESCE($1, name),
          email = COALESCE($2, email),
          phone = COALESCE($3, phone),
          role  = COALESCE($4, role)
      WHERE id = $5
      RETURNING id, name, email, phone, role;
      `,
      [name, email, phone, newRole, id]
    );
  } else if (role === "customer") {
    const { name, email, phone } = payload;

    result = await pool.query(
      `
      UPDATE users
      SET name  = COALESCE($1, name),
          email = COALESCE($2, email),
          phone = COALESCE($3, phone)
      WHERE id = $4
      RETURNING id, name, email, phone ,role;
      `,
      [name, email, phone, id]
    );
  } else {
    throw new Error("Unauthorized role");
  }

  return result.rows[0];
};

const deleteUser = async (id: number) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    id,
  ]);
  return result.rows[0];
};

export const userServices = {
  getAllUsers,
  updateUser,
  deleteUser,
};
