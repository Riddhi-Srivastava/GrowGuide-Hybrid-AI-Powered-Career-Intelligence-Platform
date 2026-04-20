import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found." });
};

export const errorHandler = (
  error: Error & { statusCode?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  res.status(statusCode).json({
    message: error.message || "Something went wrong."
  });
};
