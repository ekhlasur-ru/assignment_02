export const AuthorizeRoles =
  (...roles: string[]) =>
  (req: any, res: Response, next: Function) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: Admin only",
      });
    }
    next();
  };
