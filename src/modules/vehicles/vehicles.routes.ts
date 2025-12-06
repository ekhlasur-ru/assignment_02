import express, { Request, Response } from "express";
import { vehicleControllers } from "./vehicles.controllers";
import logger from "../../middleware/logger";
// import authRole from "../../middleware/authorize";

const router = express.Router();

router.post("/vehicles", logger, vehicleControllers.createNewVehicle);
router.get("/vehicles", logger, vehicleControllers.getAllVehicles);
router.get("/vehicles/:vehicleId", logger, vehicleControllers.getVehicleByID);
router.put(
  "/vehicles/:vehicleId",
  logger,
  vehicleControllers.updateVehicleByID
);
router.delete(
  "/vehicles/:vehicleId",
  logger,
  vehicleControllers.deleteVehicleByID
);

export const vehicleRoutes = router;
