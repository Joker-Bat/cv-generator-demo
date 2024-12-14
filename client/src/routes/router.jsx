import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { Protected } from "./protected";
import { Upload } from "../pages/upload";
import { Profile } from "../pages/profile";
import { Edit } from "../pages/edit";
import { DashboardLayout } from "../layout/DashboardLayout";
import { Public } from "./public";
import { Login } from "../pages/login";

// TODO: Handle Common header

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<Public />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/user" element={<Protected />}>
        <Route path="upload" element={<Upload />} />
        <Route path="profile" element={<DashboardLayout />}>
          <Route index element={<Profile />} />
        </Route>
        <Route path="edit" element={<Edit />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </>
  )
);

export { router };
