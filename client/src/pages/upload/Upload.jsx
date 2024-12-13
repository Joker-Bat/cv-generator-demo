import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavBar } from "../../components/Upload";
import { useUploadResume } from "../../data/hooks";

const MODEL_OPTIONS = {
  gemini: "gemini",
  openai: "openai",
};

const Upload = () => {
  const navigate = useNavigate();

  const { loading, upload } = useUploadResume();

  const dropAreaRef = useRef();
  const fileInputRef = useRef();
  const termsAndConditionRef = useRef();

  const [pdfFile, setPdfFile] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [model] = useState(MODEL_OPTIONS.openai);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dropArea = dropAreaRef.current;

    if (dropArea) {
      const addClass = event => {
        event.preventDefault();
        dropArea.classList.add("bg-gray-100");
      };

      const removeClass = () => {
        dropArea.classList.remove("bg-gray-100");
      };

      const handleFileDrop = event => {
        event.preventDefault();
        dropArea.classList.remove("bg-gray-100");
        const file = event.dataTransfer.files[0];
        setPdfFile(file);
        updateFileStatus(file);
      };

      const handleOpenFiles = () => {
        fileInputRef.current.click();
      };

      dropArea.addEventListener("dragover", addClass);
      dropArea.addEventListener("dragleave", removeClass);
      dropArea.addEventListener("drop", handleFileDrop);
      dropArea.addEventListener("click", handleOpenFiles);

      return () => {
        dropArea.removeEventListener("dragover", addClass);
        dropArea.removeEventListener("dragleave", removeClass);
        dropArea.removeEventListener("drop", handleFileDrop);
        dropArea.removeEventListener("click", handleOpenFiles);
      };
    }
  }, []);

  const updateFileStatus = file => {
    if (file) {
      if (file.type === "application/pdf") {
        setStatusText(`File "${file.name}" is ready for upload.`);
      } else {
        setStatusText("Only PDF files are allowed.");
      }
    }
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    setPdfFile(file);
    updateFileStatus(file);
  };

  const validateFields = () => {
    const termsInput = termsAndConditionRef.current;

    if (!termsInput.checked) {
      termsInput.setCustomValidity(
        "Please accept terms and conditions to continue."
      );
      termsInput.reportValidity();
      return false;
    }

    if (!pdfFile) {
      setStatusText("Please select a resume file before uploading.");
      return false;
    }

    if (pdfFile.type !== "application/pdf") {
      setStatusText("Only PDF files are allowed.");
      return false;
    }

    return true;
  };

  const handleSubmit = async e => {
    console.log("Form submitted");
    e.preventDefault();

    const allFieldsValid = validateFields();
    if (!allFieldsValid) return;

    setStatusText("Uploading and processing...");

    const formData = new FormData();
    formData.append("resume", pdfFile);
    formData.append("llm", model);

    try {
      await upload(formData);
      navigate("/user/profile");
    } catch (error) {
      console.error("Error:", error);
      setStatusText(error.message);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900">
      {/* <!-- Navbar --> */}
      <NavBar />

      {/* <!-- Main Content --> */}
      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-3  px-4 py-8">
        {/* <!-- Column 1: Heading Section --> */}
        <div className="lg:col-span-1 bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-200 rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold text-indigo-700 mb-4">
            Welcome to ZJobs.ai!
          </h1>
          <p className="text-gray-700 text-sm">
            ZJobs.ai helps you connect with top companies by streamlining your
            application process. Upload your profile once, and let recruiters
            discover you for your dream role. Benefit from our AI-powered tools
            to highlight your skills and make your profile stand out.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700 text-sm">
            <li>Save time with automated applications.</li>
            <li>Get matched with roles tailored to your skills.</li>
            <li>Secure and user-friendly platform.</li>
          </ul>
        </div>

        {/* <!-- Column 2 and 3: Form Section --> */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-indigo-500 mb-4">
            Complete Your Profile
          </h2>
          <p className="text-sm text-gray-700 mb-4">
            Upload your resume, and our AI will extract key details to build a
            compelling profile for you.
          </p>
          <form onSubmit={handleSubmit} noValidate>
            <fieldset disabled={loading}>
              {/* <!-- Upload Resume --> */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload Resume
                </label>
                <div
                  ref={dropAreaRef}
                  className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4"
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Drag and drop your file here, or
                    </p>
                    <button
                      type="button"
                      className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium enabled:hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Browse
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    name="resume"
                    accept=".pdf"
                    className="hidden"
                  />
                </div>
              </div>

              {/* <!-- Consent Checkbox --> */}
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    ref={termsAndConditionRef}
                    type="checkbox"
                    name="consent"
                    onChange={e => {
                      if (e.target.checked) {
                        e.target.setCustomValidity("");
                      }
                    }}
                    className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-indigo-500 enabled:hover:underline"
                    >
                      terms and conditions
                    </a>
                    .
                  </span>
                </label>
              </div>

              {/* <!-- Status --> */}
              <div className="mt-4 text-md text-red-600">{statusText}</div>

              {/* <!-- Submit Button --> */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm enabled:hover:bg-indigo-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Complete Profile
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </main>

      {/* <!-- Footer --> */}
      <footer className="text-center text-gray-700 text-xs py-4">
        <p>&copy; 2024 ZJobs.ai. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
export { Upload };
