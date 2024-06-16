import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import HomePage from "./pages/home/Home";
import AuthPage from "./pages/auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppStore } from "./context/AuthProvider";
import ScreenLoader from "./components/shared/ScreenLoader";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAppStore();

  if (!isAuthenticated || !user) {
    console.log("User not authenticated");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

function App() {
  const { isLoading } = useAppStore();

  return (
    <main className="h-screen">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {isLoading && <ScreenLoader />}
      <ToastContainer />
    </main>
  );
}

export default App;
