export const sanitizeUser = (user: any) => {
  let userObj = { ...user };
  const removeFields = ["password", "refresh_token"];
  console.log("userObj", user);
  removeFields.forEach((field) => {
    delete userObj[field];
  });
  console.log("userObj", userObj);
  return userObj;
};
