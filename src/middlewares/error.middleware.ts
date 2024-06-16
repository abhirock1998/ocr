import { Response, Request } from "express";

/**
 * Handles the error middleware.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to void.
 */
export const errorMiddleware = async (req: Request, res: Response) => {
  console.log("Error Middleware");
  console.log(req.url, req.body);
  res.status(404).json({ message: "Not Found" });
};
