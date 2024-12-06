const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

const prompt = require("./prompt");

const API_KEY = process.env.GEMINI_KEY;

const fileManager = new GoogleAIFileManager(API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

class GeminiModel {
  async #uploadFile(filePath) {
    const fileExt = path.extname(filePath);
    console.log("🚀 ~ fileExt:", fileExt);
    const filename = path.basename(filePath, fileExt);
    console.log("🚀 ~ filename:", filename);

    const response = await fileManager.uploadFile(filePath, {
      mimeType: "application/pdf",
      displayName: filename,
    });

    return response.file;
  }

  async getJSONFromPdf(filePath) {
    // Upload file
    console.log("Uploading file ...");
    const fileResponse = await this.#uploadFile(filePath);
    console.log("🚀 ~ fileResponse:", fileResponse);

    // Giving some time before accessing the file
    await new Promise(res => setTimeout(res, 1000));

    const generatedContent = await model.generateContent([
      prompt + `\n For your reference current date: ${new Date()} `,
      {
        fileData: {
          fileUri: fileResponse.uri,
          mimeType: fileResponse.mimeType,
        },
      },
    ]);

    const result = generatedContent.response.text();

    const cleanedResponse = result.replace(/```json\n|\n```/g, "");
    console.log("🚀 ~ cleanedResponse:", cleanedResponse);
    const finalJson = JSON.parse(cleanedResponse);
    return finalJson;
  }
}

const geminiModel = new GeminiModel();

module.exports = geminiModel;
