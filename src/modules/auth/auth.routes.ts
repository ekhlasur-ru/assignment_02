import express, { Request, Response } from "express";
import { authControllers } from "./auth.controller";
import logger from "../../middleware/logger";

const router = express.Router();

router.post("/signup", logger, authControllers.signup);
export const authRoutes = router;
