import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
// import authRole from "../../middleware/authorize";

const router = express.Router();

router.get("/users", logger, userControllers.getUser);
router.put("/users/:id", logger, userControllers.updateUserId);
router.delete("/users/:id", logger, userControllers.deleteUserId);
export const userRoutes = router;
