import dotenv from "dotenv";
import path from "path";

// dotenv.config();
dotenv.config({ path: path.join(process.cwd(), ".env") });

const configENV = {
  port: process.env.PORT,
  connection_str: process.env.CONNECTION_STR,
  jwtSecret: process.env.JWT_SECRET,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || "7d",
};

export default configENV;
