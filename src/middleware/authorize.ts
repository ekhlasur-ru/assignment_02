import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import configENV from "../config/index";
import { error } from "console";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Can't provided Bearer with token",
          errors: "token invalid",
        });
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decoded = jwt.verify(
        token,
        configENV.jwtSecret as string
      ) as JwtPayload;
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          success: false,
          message: "unauthorized Role!!!",
          errors: "token invalid",
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: "Authentication failed",
        error: err.message,
      });
    }
  };
};

export default auth;
