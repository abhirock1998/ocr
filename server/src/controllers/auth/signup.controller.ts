import { asyncHandler } from "@middlewares/async.middleware";
import User from "@models/user.model";
import { _response } from "@utils/response.util";
import { Request, Response } from "express";

const signup = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const { email, name, password } = payload;
  const hasExist = await User.findOne({ email });
  if (hasExist) {
    return _response(res, "user with email already exist", false, 400, {});
  }

  const data = {
    email,
    password,
    name,
  };
  await User.create(data);
  _response(res, "User created successfully", true, 201, {});
});

export default signup;
