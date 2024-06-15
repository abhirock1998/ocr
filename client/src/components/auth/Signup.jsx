import InputField from "../shared/InputField";
import Button from "../shared/Button";
import { useForm } from "react-hook-form";
import { useApiHook } from "../../hooks/useAuth";
import { useNotificationHook } from "../../hooks/useNotificationHook";
import { useAppStore } from "../../context/AuthProvider";

const SignUp = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const apiCall = useApiHook();
  const toast = useNotificationHook();
  const { showLoader, hideLoader } = useAppStore();

  const passwordValue = watch("password");

  const onSubmit = handleSubmit(async (data) => {
    showLoader();
    const result = await apiCall(data, "signup");
    hideLoader();
    if (result) {
      toast().success("Sign up successful");
      onLogin();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-2xl font-semibold text-center mb-2">Sign Up</h1>

      <InputField
        label="Email"
        type="email"
        error={errors.email?.message}
        placeholder="Enter your email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regular expression for email validation
            message: "Invalid email address",
          },
        })}
      />
      <InputField
        label="Username"
        type="text"
        error={errors.name?.message}
        placeholder="Enter your username"
        {...register("name", {
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
          },
        })}
      />
      <InputField
        label="Password"
        type="password"
        error={errors.password?.message}
        placeholder="Enter your password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />
      <InputField
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message}
        placeholder="Confirm your password"
        {...register("confirmPassword", {
          required: "Confirm password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
          validate: (value) => {
            return value === passwordValue || "Passwords do not match";
          },
        })}
      />
      <div className="flex justify-center items-center mt-5">
        <Button type="submit" className="w-1/2">
          Sign Up
        </Button>
      </div>
      <p className="text-center mt-3">
        Already have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={onLogin}>
          Login
        </span>
      </p>
    </form>
  );
};

export default SignUp;
