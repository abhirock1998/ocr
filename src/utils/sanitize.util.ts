export const sanitizeUser = (user: any) => {
  console.log("Before Delete", user);
  const { password, ...props } = user;
  const userObj = user.toObject();
  console.log("userObj", userObj);
  // removeFields.forEach((field) => {
  //   delete userObj[field];
  // });
  console.log("After Delete", user, password, props);
  return user;
};
