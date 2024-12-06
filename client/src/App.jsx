import { Route, Routes } from "react-router-dom";

import "./App.css";
import Upload from "./pages/upload";
import Resume from "./pages/resume";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/resume/:resumeId" element={<Resume />} />
      </Routes>
    </>
  );
}

export default App;
