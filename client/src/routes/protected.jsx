import { Navigate, Outlet } from "react-router-dom";
import { LOCALSTORAGE_KEYS } from "../utils";

const Protected = () => {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.USER_ID);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export { Protected };
