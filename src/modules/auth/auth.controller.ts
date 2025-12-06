import { Request, Response } from "express";
import { authServices } from "./auth.services";
import jwt from "jsonwebtoken";
import configENV from "../../config";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "User not registered",
    });
  }
};

const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await authServices.loginUser(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const { name, role } = user;

    const token = jwt.sign(
      { name, email, role },
      configENV.jwtSecret as string,
      { expiresIn: "7d" }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("token"); // optional if you store JWT in cookie

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const authControllers = {
  signup,
  signin,
  logout,
};
