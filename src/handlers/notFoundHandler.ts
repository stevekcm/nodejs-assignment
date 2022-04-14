import { Request, Response, NextFunction } from "express";

export default function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const err = new Error("Not Found");

  err.message = "Not Found";
  res.status(404).json({
    status: 404,
    msg: err.message,
  });
}
