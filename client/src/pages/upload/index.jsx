import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const MODEL_OPTIONS = {
  gemini: "gemini",
  openai: "openai",
};

const Upload = () => {
  const navigate = useNavigate();

  const dropAreaRef = useRef();
  const fileInputRef = useRef();

  const [pdfFile, setPdfFile] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [model, setModel] = useState(MODEL_OPTIONS.openai);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dropArea = dropAreaRef.current;

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

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Form submitted");

    if (!pdfFile) {
      setStatusText("Please select a resume file before uploading.");
      return;
    }

    if (pdfFile.type !== "application/pdf") {
      setStatusText("Only PDF files are allowed.");
      return;
    }

    setLoading(true);
    setStatusText("Uploading and processing...");

    const formData = new FormData();
    formData.append("resume", pdfFile);
    formData.append("llm", model);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.status !== 200) {
        throw new Error(response.text());
      }

      const jsonData = await response.json();
      console.log("🚀 ~ res:", jsonData);
      setLoading(false);
      navigate(`/resume/${jsonData.resumeId}`);
    } catch (error) {
      setStatusText("Error uploading resume.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = event => {
    setModel(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        {/* <!-- Heading --> */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Upload Your Resume
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Drag and drop your resume (PDF only) or click to browse.
        </p>

        {/* <!-- Drag and Drop File Upload --> */}
        <form
          id="resume-upload-form"
          className="text-center"
          onSubmit={handleSubmit}
        >
          <div className="w-full border-2 border-dashed border-gray-300 p-6 rounded-lg">
            <div
              ref={dropAreaRef}
              id="drop-area"
              className="w-full h-40 flex flex-col items-center justify-center space-y-4 cursor-pointer"
            >
              <svg
                className="w-12 h-12 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h16m-5 4l4-4m0 0l-4-4m4 4H3"
                ></path>
              </svg>
              <span className="text-sm text-gray-500">
                Drag & drop your resume here
              </span>
              <span className="text-sm text-gray-400">or</span>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded shadow hover:bg-blue-700"
              >
                Browse
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              id="resume-input"
              name="resume"
              accept=".pdf"
              className="hidden"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="gemini" className="mr-2">
              Gemini
            </label>
            <input
              type="radio"
              name="llm"
              id="gemini"
              value={MODEL_OPTIONS.gemini}
              className="mr-10"
              checked={model === MODEL_OPTIONS.gemini}
              onChange={handleModelChange}
            />
            <label htmlFor="openai" className="mr-2">
              Open AI
            </label>
            <input
              type="radio"
              name="llm"
              id="openai"
              value={MODEL_OPTIONS.openai}
              checked={model === MODEL_OPTIONS.openai}
              onChange={handleModelChange}
            />
          </div>

          {/* <!-- Submit Button --> */}
          <div className="mt-6">
            <button
              id="submit-btn"
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow enabled:hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Upload & Process Resume
            </button>
          </div>
        </form>

        {/* <!-- Status --> */}
        <div id="status" className="mt-4 text-sm text-center text-gray-600">
          {statusText}
        </div>
      </div>
    </div>
  );
};

export default Upload;
