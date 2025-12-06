import { Request, Response } from "express";
import { userServices } from "./user.services";

const getUser = async (req: Request, res: Response) => {
  try {
    const data = await userServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await userServices.updateUser(id, req.body);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteUserId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await userServices.deleteUser(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const userControllers = {
  getUser,
  updateUserId,
  deleteUserId,
};
