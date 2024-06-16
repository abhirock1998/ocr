import jwt from "jsonwebtoken";

/**
 * Creates a token.
 *
 * @param data - The data to be included in the token.
 * @param expiresIn - The time in which the token will expire.
 * @returns A token.
 */
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

/**
 * Verifies a token.
 *
 * @param token - The token to be verified.
 * @returns The decoded token.
 */
export const verifyToken = (token: string) => {
  const jwt_token = process.env["JWT_SECRET"];
  if (!jwt_token) {
    throw new Error(
      "JWT_SECRET is not defined and access token cannot be verified"
    );
  }
  return jwt.verify(token, jwt_token);
};
