import React, { createContext, useContext, useState } from "react";

export const APP_KEY = {
  accessToken: "ocr_access_token",
  refreshToken: "ocr_refresh_token",
};

const authContext = createContext({
  isAuthenticated: false,
  logout: () => {},
  user: null,
  login: () => {},
  toggleAuthState: () => {},
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const login = (user, aT, rT) => {
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
