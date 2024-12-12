import { Navigate, Outlet } from "react-router-dom";
import { LOCALSTORAGE_KEYS } from "../utils";

const Public = () => {
  const token = localStorage.getItem(LOCALSTORAGE_KEYS.USER_ID);

  return token ? <Navigate to="/user/profile" /> : <Outlet />;
};

export { Public };
