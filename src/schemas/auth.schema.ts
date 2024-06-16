import zod from "zod";

// Define the schema for the signup route.
const signupSchema = zod.object({
  email: zod.string().email("Invalid email format"),
  password: zod.string().min(6),
  name: zod.string().min(3),
});

// Define the schema for the login route.
const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

export { loginSchema, signupSchema };
