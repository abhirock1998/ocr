import { asyncHandler } from "@middlewares/async.middleware";
import User from "@models/user.model";
import { verifyToken } from "@services/jwt.service";
import { _response } from "@utils/response.util";

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return _response(res, "Refresh token not found", false, 400, {});
  }

  try {
    verifyToken(refreshToken);
  } catch (error: any) {
    const message = error?.message || "Invalid token";
    if (message.includes("jwt expired")) {
      return _response(res, "Refresh token expired", false, 403, {});
    }
  }

  const user = await User.findOne({ refresh_token: refreshToken });

  if (!user) {
    return _response(res, "User not found", false, 404, {});
  }

  const accessToken = user.genAccessToken();

  const payload = {
    accessToken,
  };
  _response(res, "Access token refreshed", true, 200, payload);
});
