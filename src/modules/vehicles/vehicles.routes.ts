import express, { Request, Response } from "express";
import { vehicleControllers } from "./vehicles.controllers";
import logger from "../../middleware/logger";
import auth from "../../middleware/authorize";

const router = express.Router();

router.post(
  "/vehicles",
  logger,
  auth("admin"),
  vehicleControllers.createNewVehicle
);
router.get("/vehicles", logger, vehicleControllers.getAllVehicles);
router.get("/vehicles/:vehicleId", logger, vehicleControllers.getVehicleByID);
router.put(
  "/vehicles/:vehicleId",
  logger,
  auth("admin"),
  vehicleControllers.updateVehicleByID
);
router.delete(
  "/vehicles/:vehicleId",
  logger,
  auth("admin"),
  vehicleControllers.deleteVehicleByID
);

export const vehicleRoutes = router;
