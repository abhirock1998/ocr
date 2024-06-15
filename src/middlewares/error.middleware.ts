import { Response, Request } from "express";

export const errorMiddleware = async (req: Request, res: Response) => {
  console.log("Error Middleware");
  console.log(req.url, req.body);
  res.status(404).json({ message: "Not Found" });
};
