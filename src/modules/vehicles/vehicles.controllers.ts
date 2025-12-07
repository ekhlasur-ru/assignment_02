import { Request, Response } from "express";
import { vehicleServices } from "./vehicles.service";

const createNewVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.createVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getVehicleByID = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicleId(
      req.params.vehicleId as string
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateVehicleByID = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.updateVehicle(
      req.params.vehicleId as string,
      req.body
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteVehicleByID = async (req: Request, res: Response) => {
  try {
    const deleted = await vehicleServices.deleteVehicle(
      req.params.vehicleId as string
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const vehicleControllers = {
  createNewVehicle,
  getAllVehicles,
  getVehicleByID,
  updateVehicleByID,
  deleteVehicleByID,
};
