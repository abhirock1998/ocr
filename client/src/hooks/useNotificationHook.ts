import { toast, ToastOptions } from "react-toastify";

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const useNotificationHook = () => {
  return () => ({
    error: (message: string) => {
      toast.error(message, toastOptions);
    },
    success: (message: string) => {
      toast.success(message, toastOptions);
    },
    warning: (message: string) => {
      toast.warning(message, toastOptions);
    },
    info: (message: string) => {
      toast.info(message, toastOptions);
    },
  });
};
