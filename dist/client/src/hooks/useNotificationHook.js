import { toast } from "react-toastify";
const toastOptions = {
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
        error: (message) => {
            toast.error(message, toastOptions);
        },
        success: (message) => {
            toast.success(message, toastOptions);
        },
        warning: (message) => {
            toast.warning(message, toastOptions);
        },
        info: (message) => {
            toast.info(message, toastOptions);
        },
    });
};
//# sourceMappingURL=useNotificationHook.js.map