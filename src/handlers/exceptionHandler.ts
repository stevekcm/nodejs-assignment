import { Request, Response, NextFunction } from "express";

export default function exceptionHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  //console.error("Global Error Caught", err.stack);

  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    errors: [{ msg: err.message }],
  });
}
