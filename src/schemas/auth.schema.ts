import zod from "zod";

const signupSchema = zod.object({
  email: zod.string().email("Invalid email format"),
  password: zod.string().min(6),
  name: zod.string().min(3),
});
const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

export { loginSchema, signupSchema };
