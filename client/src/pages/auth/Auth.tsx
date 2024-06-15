import SignUpTab from "../../components/auth/Signup";
import LoginTab from "../../components/auth/Login";
import { useAppStore } from "../../context/AuthProvider";

const Auth = () => {
  const { isAuthenticated, toggleAuthState } = useAppStore();

  return (
    <section className="h-full flex justify-center items-center bg-gray-900">
      <div className="md:w-[35%] w-[90%] border border-gray-200 p-5 shadow-2xl rounded-md transition-all duration-200 bg-white shadow-black">
        {isAuthenticated ? (
          <LoginTab onSignUp={toggleAuthState} />
        ) : (
          <SignUpTab onLogin={toggleAuthState} />
        )}
      </div>
    </section>
  );
};

export default Auth;
