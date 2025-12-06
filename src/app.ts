import express, { Request, Response } from "express";
import configENV from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";

import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
app.use(express.json());
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers!");
});

//users CRUD
// app.use("/users", userRoutes);

//TODO CRUD
// app.use("/todos", todoRoutes);

//auth routes
app.use("/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
