import { pool } from "../../config/db";

const getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result.rows;
};

const updateUser = async (id: number, payload: any) => {
  const { name, email, phone, role } = payload;
  const result = await pool.query(
    `UPDATE users 
     SET name=$1, email=$2, phone=$3, role=$4 
     WHERE id=$5 RETURNING *`,
    [name, email, phone, role, id]
  );
  return result.rows[0];
};

const deleteUser = async (id: number) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    id,
  ]);
  return result.rows[0]; // return deleted user data
};

export const userServices = {
  getAllUsers,
  updateUser,
  deleteUser,
};
