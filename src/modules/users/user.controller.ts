import { Request, Response } from "express";
import { userServices } from "./user.services";

const getUser = async (req: Request, res: Response) => {
  try {
    const data = await userServices.getAllUsers();

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      errors: err.message,
    });
  }
};

const updateUserId = async (req: Request, res: Response) => {
  try {
    const user = req.user as { id: number; role: string };
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
        errors: "User authentication required",
      });
    }
    const result = await userServices.updateUser(
      req.params.userId as string,
      user.role,
      req.body
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found or update not allowed",
        errors: "Invalid user ID or insufficient permissions",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Failed to update user",
      errors: error.message,
    });
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
        errors: "No user exists with this ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: "Failed to delete user",
      errors: err.message,
    });
  }
};

export const userControllers = {
  getUser,
  updateUserId,
  deleteUserId,
};
