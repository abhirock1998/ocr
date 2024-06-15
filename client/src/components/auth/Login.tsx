import InputField from "../shared/InputField";
import Button from "../shared/Button";
import { useForm } from "react-hook-form";
import { useNotificationHook } from "../../hooks/useNotificationHook";
import { useApiHook } from "../../hooks/useAuth";
import { useAppStore } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

type FormValue = {
  password: string;
  email: string;
};

type Props = {
  onSignUp: () => void;
};

const Login = ({ onSignUp }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const apiCall = useApiHook();
  const toast = useNotificationHook();
  const { login, showLoader, hideLoader } = useAppStore();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    showLoader();
    const result = await apiCall(data, "login");
    hideLoader();
    if (result) {
      const user = result?.user;
      const accessToken = result?.accessToken;
      const refreshToken = result?.refreshToken;
      if (user && accessToken && refreshToken) {
        login(user, accessToken, refreshToken);
        navigate("/dashboard");
      } else {
        console.log("Invalid response from server");
        toast().error("Invalid response from server");
      }
    }
  });
  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-2xl font-semibold text-center mb-2">Log In</h1>

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
      <div className="flex justify-center items-center mt-5">
        <Button type="submit" className="w-1/2">
          Login
        </Button>
      </div>
      <p className="text-center mt-3">
        Don't have an account?{" "}
        <span className="text-blue-500 cursor-pointer" onClick={onSignUp}>
          Register
        </span>
      </p>
    </form>
  );
};

export default Login;
