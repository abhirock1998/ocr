import { asyncHandler } from "@middlewares/async.middleware";
import User from "@models/user.model";
import { _response } from "@utils/response.util";
import { sanitizeUser } from "@utils/sanitize.util";
import { Request, Response } from "express";

const login = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const { email, password } = payload;
  console.log("payload in login", payload);
  const hasExist = await User.findOne({ email }).select("+password");
  if (!hasExist) {
    return _response(res, "User with this email not found", false, 404, {});
  }

  const pHash = hasExist.password;

  const isPasswordMatch = await hasExist.comparePassword(pHash, password);

  if (!isPasswordMatch) {
    return _response(res, "Invalid password", false, 400, {});
  }

  const accessToken = hasExist.genAccessToken();
  const refreshToken = hasExist.genRefreshToken();
  const responsePayload = {
    accessToken,
    refreshToken,
    user: sanitizeUser(hasExist),
  };
  hasExist.refresh_token = refreshToken;
  await hasExist.save();
  // saving user in session for future use
  req.session = hasExist;
  _response(res, "User logged in successfully", true, 200, responsePayload);
});

export default login;
