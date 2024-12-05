import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastService = {
  // Success Toast
  success: (message, options = {}) => {
    toast.success(message || "Success Notification!", {
      position: "top-right", // Set the desired position
      autoClose: 3000, // Default auto-close time in ms
      ...options, // Override with custom options if provided
    });
  },

  // Error Toast
  error: (message, options = {}) => {
    toast.error(message || "Error Notification!", {
      position: "top-center", // Set the desired position
      autoClose: 3000,
      ...options,
    });
  },

  // Info Toast
  info: (message, options = {}) => {
    toast.info(message || "Info Notification!", {
      position: "bottom-center", // Set the desired position
      autoClose: 3000,
      ...options,
    });
  },

  // Warning Toast
  warning: (message, options = {}) => {
    toast.warn(message || "Warning Notification!", {
      position: "bottom-left", // Set the desired position
      autoClose: 3000,
      ...options,
    });
  },

  // Custom Styled Toast
  custom: (message, options = {}) => {
    toast(message || "Custom Style Notification with css class!", {
      position: "bottom-right", // Set the desired position
      className: "foo-bar", // Apply custom class
      autoClose: 3000,
      ...options,
    });
  },
};

export default ToastService;
