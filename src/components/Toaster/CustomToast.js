import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customToast = (type, { msg, time = 3000, pos = "top-right",theme="colored" }) => {
  switch (type) {
    case "error":
      return toast.error(msg, {
        position: pos,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    case "success":
      return toast.success(msg, {
        position: pos,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    case "warning":
      return toast.warning(msg, {
        position: pos,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    case "info":
      return toast.info(msg, {
        position: pos,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
    case "login":
     return toast.su
    default:
      return toast(msg, {
        position: pos,
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
      });
  }
};

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export { customToast, Toast };
