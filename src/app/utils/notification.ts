import { toast, ToastOptions } from "react-hot-toast";

const defaultOptions: ToastOptions = {
  duration: 3000,
  style: {
    background: "#333",
    color: "#fff",
    borderRadius: "8px",
    padding: "12px 16px",
  },
};

export const showSuccess = (message: string, options?: ToastOptions) => {
  return toast.success(message, { ...defaultOptions, ...options });
};

export const showError = (message: string, options?: ToastOptions) => {
  return toast.error(message, { ...defaultOptions, ...options });
};

export const showInfo = (message: string, options?: ToastOptions) => {
  return toast(message, { ...defaultOptions, ...options });
};

export const showWarning = (message: string, options?: ToastOptions) => {
  return toast(message, {
    ...defaultOptions,
    ...options,
    icon: "⚠️",
  });
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};
