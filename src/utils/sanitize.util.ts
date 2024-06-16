export const sanitizeUser = (user: any) => {
  console.log("Before Delete", user);
  const { password, ...props } = user;
  // removeFields.forEach((field) => {
  //   delete userObj[field];
  // });
  console.log("After Delete", user, password, props);
  return props;
};
