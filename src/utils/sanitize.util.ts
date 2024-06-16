export const sanitizeUser = (user: any) => {
  const removeFields = ["password", "refresh_token"];
  console.log("Before Delete", user);
  delete user?.password;
  // removeFields.forEach((field) => {
  //   delete userObj[field];
  // });
  console.log("After Delete", user);
  return user;
};
