import {
  createContext,
  useContext,
  Fragment,
  useState,
  useEffect,
} from "react";
import Toast from "../src/components/Toast";

const ToastContext = createContext();
const hideDuration = 5000;

const ToastProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  useEffect(() => {
    if (isOpen === true) {
      setTimeout(() => {
        setIsOpen(false);
      }, hideDuration);
    }
  }, [isOpen]);

  const showToast = (msg = "Something went wrong", svt = "info") => {
    setMessage(msg);
    setSeverity(svt);
    setIsOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Fragment>
        {props.children}
        <Toast
          open={isOpen}
          severity={severity}
          message={message}
          setOpen={setIsOpen}
        />
      </Fragment>
    </ToastContext.Provider>
  );
};

const useToast = () => {
  return useContext(ToastContext);
};

export { ToastProvider, useToast };
