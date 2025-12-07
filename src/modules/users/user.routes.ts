import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/authorize";

const router = express.Router();

router.get("/users", logger, auth("admin"), userControllers.getUser);
router.put(
  "/users/:id",
  logger,
  auth("admin", "Customer"),
  userControllers.updateUserId
);
router.delete(
  "/users/:id",
  logger,
  auth("admin"),
  userControllers.deleteUserId
);

export const userRoutes = router;
