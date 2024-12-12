import { RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";

import "./App.css";
import { router } from "./routes/router";
import { LOCALSTORAGE_KEYS } from "./utils";

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
          onError: error => {
            console.log("Error: ", error.status);
            if (error.status === 404) {
              localStorage.removeItem(LOCALSTORAGE_KEYS.USER_ID);
              router.navigate("/login");
            }
          },
        }}
      >
        <RouterProvider router={router} />
      </SWRConfig>
    </>
  );
}

export default App;
