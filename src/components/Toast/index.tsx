import { toast } from "react-toastify";

const Toast = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
};

export default Toast;
