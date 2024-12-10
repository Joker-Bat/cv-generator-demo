import { Route, Routes } from "react-router-dom";
import { SWRConfig } from "swr";

import "./App.css";
import { CandidateLayout } from "./layout/CandidateLayout";
import { Upload } from "./pages/upload";
import { Edit } from "./pages/edit";
import { Profile } from "./pages/profile";
import { Auth } from "./HOC/Auth";

function App() {
  return (
    <>
      <SWRConfig
        value={{
          onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
            if (error.status === 404) return;
            if (retryCount >= 3) return;
            setTimeout(() => revalidate({ retryCount }), 5000);
          },
        }}
      >
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/user" element={<Auth />}>
            <Route path="profile" element={<CandidateLayout />}>
              <Route index element={<Profile />} />
            </Route>
            <Route path="edit" element={<Edit />} />
          </Route>
        </Routes>
      </SWRConfig>
    </>
  );
}

export default App;
