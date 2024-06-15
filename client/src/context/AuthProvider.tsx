import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

export const APP_KEY = {
  accessToken: "ocr_access_token",
  refreshToken: "ocr_refresh_token",
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (user: any, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  user: any;
  toggleAuthState: () => void;
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

const authContext = createContext<AuthContextType>({
  isAuthenticated: false,
  logout: () => {},
  user: null,
  login: () => {},
  toggleAuthState: () => {},
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

type ProviderProps = PropsWithChildren<{}>;

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const login = (user: any, aT: string, rT: string) => {
    setIsLogin(true);
    setUser(user);
    localStorage.setItem(APP_KEY.accessToken, aT);
    localStorage.setItem(APP_KEY.refreshToken, rT);
  };

  const logout = () => {
    setIsLogin(false);
    setUser(null);
    localStorage.removeItem(APP_KEY.accessToken);
    localStorage.removeItem(APP_KEY.refreshToken);
    window.location.href = "/";
  };

  const toggleAuthState = () => {
    setIsLogin((pre) => !pre);
  };

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  const initialState = {
    isAuthenticated: isLogin,
    login,
    logout,
    user,
    toggleAuthState,
    isLoading,
    showLoader,
    hideLoader,
  };
  return (
    <authContext.Provider value={initialState}>{children}</authContext.Provider>
  );
};

export default AuthProvider;

export const useAppStore = () => {
  return useContext(authContext);
};
