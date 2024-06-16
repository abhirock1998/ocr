import axios from "axios";
import { useNotificationHook } from "./useNotificationHook";
import { APP_KEY, useAppStore } from "../context/AuthProvider";

const api = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(APP_KEY.accessToken);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getConfig = (intent) => {
  let endpoint = "";
  let headers = api.defaults.headers;

  switch (intent) {
    case "signup":
      endpoint = "/auth/signup";
      break;
    case "login":
      endpoint = "/auth/login";
      break;
    case "ocr":
      endpoint = "/image/upload";
      headers = { "Content-Type": "multipart/form-data" };
      break;
    default:
      throw new Error("Invalid intent type");
  }
  return { endpoint, headers };
};

export const useApiHook = () => {
  const toast = useNotificationHook();
  const { showLoader, hideLoader } = useAppStore();
  const refreshAccess = useRefreshAccessTokenHook();

  const makeRequest = async (data, intent) => {
    const { endpoint, headers } = getConfig(intent);

    try {
      const config = {
        headers,
      };
      const response = await api.post(endpoint, data, config);
      const result = response.data;

      if (result?.success) {
        toast().success(result?.message);
        return result.data;
      } else {
        toast().error(result?.message);
      }
    } catch (error) {
      const errorCode = error.response?.status;
      if (errorCode === 401) {
        showLoader();
        const shouldProceed = await refreshAccess();
        hideLoader();
        // If refresh token is successful, retry the request
        if (shouldProceed) {
          return await makeRequest(data, intent);
        }
      }
      const rootError = error?.response?.data;
      const message = error?.response?.data?.message || error?.message;
      const errorData = rootError?.error;
      if (Array.isArray(errorData)) {
        errorData.forEach((err) => {
          const path = err?.path?.toString();
          if (path) {
            toast().error(`Error ${path} ${err.message}`);
          } else {
            toast().error(`Error ${err.message}`);
          }
        });
      } else {
        toast().error(message);
      }
    }
  };
  return makeRequest;
};

const useRefreshAccessTokenHook = () => {
  const toast = useNotificationHook();
  return async () => {
    try {
      const refreshToken = localStorage.getItem(APP_KEY.refreshToken);
      // If refresh token is not found, redirect to login page
      if (!refreshToken) {
        toast().error("Refresh token not found");
        return false;
      }
      const response = await api.post("/auth/refresh-access-token", {
        refreshToken,
      });
      const result = response.data;
      if (result?.success) {
        const resultData = result?.data;
        const accessToken = resultData?.accessToken;
        localStorage.setItem(APP_KEY.accessToken, accessToken);
        return true;
      } else {
        toast().error(result?.message);
        return false;
      }
    } catch (error) {
      const errorCode = error?.response?.status;
      //  If refresh token is expired, redirect to login page
      if (errorCode === 403) {
        window.location.href = "/";
        return false;
      }
      const message = error.response?.data?.message || error?.message;
      toast().error(message);
    }
    return false;
  };
};
