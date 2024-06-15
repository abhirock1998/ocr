import { Response } from "express";
export const _response = (
  res: Response,
  message: string,
  success: boolean,
  statusCode: number,
  data: any
) => {
  if (success) {
    res.status(statusCode).json({ success, message, data });
  } else {
    let error: any = message;
    if (typeof message === "string") {
      error = [{ message }];
    }
    res.status(statusCode).json({
      success,
      message: "An error encountered",
      data: data ? data : {},
      error,
    });
  }
};
