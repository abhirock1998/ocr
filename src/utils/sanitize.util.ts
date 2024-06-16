// Sanitize user object by removing password field
export const sanitizeUser = (user: any) => {
  const userObj = user?.toObject();
  delete userObj?.password;
  return userObj || user;
};
