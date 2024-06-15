import jwt from "jsonwebtoken";

export const createToken = (
  data: Record<string, string>,
  expiresIn: string | number
) => {
  const jwt_token = process.env["JWT_SECRET"];
  if (!jwt_token) {
    throw new Error(
      "JWT_SECRET is not defined and access token cannot be generated"
    );
  }

  return jwt.sign(data, jwt_token, { expiresIn: expiresIn });
};

export const verifyToken = (token: string) => {
  const jwt_token = process.env["JWT_SECRET"];
  if (!jwt_token) {
    throw new Error(
      "JWT_SECRET is not defined and access token cannot be verified"
    );
  }
  return jwt.verify(token, jwt_token);
};
