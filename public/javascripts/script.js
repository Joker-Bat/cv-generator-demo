const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("resume-input");
const form = document.getElementById("resume-upload-form");
const submitButton = document.getElementById("submit-btn");
const status = document.getElementById("status");

// Open file dialog when button clicked
dropArea.addEventListener("click", () => fileInput.click());

// Drag and drop functionality
dropArea.addEventListener("dragover", event => {
  event.preventDefault();
  dropArea.classList.add("bg-gray-100");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("bg-gray-100");
});

dropArea.addEventListener("drop", event => {
  event.preventDefault();
  dropArea.classList.remove("bg-gray-100");
  fileInput.files = event.dataTransfer.files;
  updateStatus(fileInput.files[0]);
});

// Update status message
const updateStatus = file => {
  if (file) {
    if (file.type === "application/pdf") {
      status.textContent = `File "${file.name}" is ready for upload.`;
    } else {
      status.textContent = "Only PDF files are allowed.";
    }
  }
};

// Handle manual file selection
fileInput.addEventListener("change", event => {
  updateStatus(event.target.files[0]);
});

// Submit the form
submitButton.addEventListener("click", () => {
  if (fileInput.files.length === 0) {
    status.textContent = "Please select a resume file before uploading.";
    return;
  }

  const file = fileInput.files[0];
  if (file.type !== "application/pdf") {
    status.textContent = "Only PDF files are allowed.";
    return;
  }

  const llm = document.querySelector("input[name='llm']:checked").value;

  // Simulate file upload
  submitButton.setAttribute("disabled", true);
  status.textContent = "Uploading and processing...";
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("llm", llm);

  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then(async response => {
      if (response.status === 200) {
        return response.blob();
      }

      throw new Error(`Error: ${await response.text()} `);
    })
    .then(blob => {
      status.textContent = "Resume uploaded successfully!";
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "resume.html";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      submitButton.removeAttribute("disabled");
    })
    .catch(error => {
      status.textContent = "Error uploading resume.";
      console.error("Error:", error);
      submitButton.removeAttribute("disabled");
    });
});
