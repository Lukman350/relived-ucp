import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  customClass: {
    popup: "colored-toast",
  },
});

const Toast = {
  success: (message: string) => {
    toast.fire({
      title: "Success",
      text: message,
      icon: "success",
    });
  },
  error: (message: string) => {
    toast.fire({
      title: "Oops...",
      text: message,
      icon: "error",
    });
  },
};

export default Toast;
