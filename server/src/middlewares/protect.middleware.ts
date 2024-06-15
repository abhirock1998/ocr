import { verifyToken } from "@services/jwt.service";
import { asyncHandler } from "./async.middleware";
import { _response } from "@utils/response.util";

export const protectRouter = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const message = "Authorization not found in headers";
    _response(res, message, false, 404, {});
  }

  try {
    verifyToken(token);
    next();
  } catch (error: any) {
    console.log("Error in protectRouter", error?.message);
    const message = error?.message || "Invalid token";
    if (message.includes("jwt expired")) {
      return _response(res, "Access token expired", false, 401, {});
    } else {
      return _response(res, message, false, 403, {});
    }
  }
});
