export const sanitizeUser = (user: any) => {
  let userObj = { ...user };
  const removeFields = ["password", "refresh_token"];

  removeFields.forEach((field) => {
    delete userObj[field];
  });

  return user;
};
