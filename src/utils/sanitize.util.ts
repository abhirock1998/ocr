export const sanitizeUser = (user: any) => {
  console.log("Before Delete", user);
  const { password, ...props } = user;
  const userObj = user?.toObject();
  delete userObj?.password;
  console.log("userObj", userObj);
  // removeFields.forEach((field) => {
  //   delete userObj[field];
  // });
  console.log("After Delete", user, userObj);
  return userObj || user;
};
