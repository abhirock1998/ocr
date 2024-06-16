import { Response } from "express";

/**
 * Sends a response to the client.
 *
 * @param res - The response object.
 * @param message - The message to send.
 * @param success - The status of the response.
 * @param statusCode - The status code of the response.
 * @param data - The data to send.
 */
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
