const OpenAI = require("openai");
// const axios = require("axios");
const fs = require("fs");
const prompt = require("./prompt");
// const FormData = require("form-data");

const API_KEY = process.env.OPEN_AI_KEY;

const model = new OpenAI({
  apiKey: API_KEY,
});

class OpenAIModel {
  pdfAssistantName = "PDF Parsing assistant";

  constructor(model) {
    this.openai = model;
  }

  async #uploadFile(filePath) {
    const response = await this.openai.files.create({
      file: fs.createReadStream(filePath),
      purpose: "assistants",
    });

    return response;
  }

  async getJSONFromPdf(filePath) {
    // Upload file
    console.log("Uploading file ...");
    const fileResponse = await this.#uploadFile(filePath);
    console.log("🚀 ~ fileResponse:", fileResponse);
    const fileId = fileResponse.id;

    // Giving some time before accessing the file
    await new Promise(res => setTimeout(res, 1000));

    // Creaete assistant if not already present
    const assistants = await this.listAssistants();

    let pdfAssistant = assistants.find(el => el.name === this.pdfAssistantName);
    if (!pdfAssistant) {
      console.log("PDF assistant not found, creating now ...");
      pdfAssistant = await this.#createPdfAssistant();
      console.log("🚀 ~ pdfAssistant:", pdfAssistant);
    }

    console.log("Creating Thread ...");
    const thread = await this.openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content: prompt,
          attachments: [{ file_id: fileId, tools: [{ type: "file_search" }] }],
        },
      ],
    });

    console.log("🚀 ~ thread:", thread);

    const threadId = thread.id;

    const run = await this.openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: pdfAssistant.id,
    });

    const messages = await this.openai.beta.threads.messages.list(threadId, {
      run_id: run.id,
    });

    const dataString = messages.data[0].content[0].text.value;

    // INFO: Deleting a file sometimes causing error that it can't able to access files
    // Delete file using openai endpoint
    // console.log("Deleting uploaded file ...");
    // await this.openai.files.del(fileResponse.id);

    // Generating JSON from response
    const cleanedResponse = dataString.replace(/```json\n|\n```/g, "");
    console.log("🚀 ~ cleanedResponse:", cleanedResponse);
    const jsonData = JSON.parse(cleanedResponse);
    return jsonData;
  }

  async listFiles() {
    return await this.openai.files.list();
  }

  async listAssistants() {
    const assistants = await this.openai.beta.assistants.list();
    return assistants.data;
  }

  async #createPdfAssistant() {
    return await this.openai.beta.assistants.create({
      name: this.pdfAssistantName,
      instructions:
        "You are an expert PDF parsing assistant. Use your knowledge to parse pdf files to get data in that pdf.",
      model: "gpt-4o-mini",
      tools: [{ type: "file_search" }],
    });
  }
}

// const uploadFile = async file => {
//   const formData = new FormData();
//   formData.append("file", file.buffer, {
//     filename: file.originalname,
//     contentType: file.mimetype,
//   });
//   formData.append("purpose", "assistants");

//   const response = await axios.post(
//     "https://api.openai.com/v1/files",
//     formData,
//     {
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         ...formData.getHeaders(),
//       },
//     }
//   );

//   return response.data;
// };

const openAIModel = new OpenAIModel(model);

module.exports = openAIModel;
