import { LOCALSTORAGE_KEYS } from "../utils";
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
  const resumeId = localStorage.getItem(LOCALSTORAGE_KEYS.RESUME_ID);

  if (!resumeId) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export { Auth };
