const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const { randomUUID } = require("crypto");

const { upload } = require("../middlewares/upload");
const openai = require("../openai");
const gemini = require("../gemini");
const dataStore = require("../store");

const router = express.Router();

router.post("/", upload.single("resume"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const ext = path.extname(req.file.originalname);
    const pdfFileName = path.basename(req.file.originalname, ext);

    const filePath = path.join(
      __dirname,
      "../uploads/",
      `${pdfFileName}-${Date.now()}.${ext}`
    );
    console.log("🚀 ~ filePath:", filePath);

    await fs.writeFile(filePath, req.file.buffer);
    console.log("File Created");

    const llm = req.body.llm; // gemini or openai

    let jsonData;
    if (llm === "openai") {
      jsonData = await openai.getJSONFromPdf(filePath);
    } else if (llm === "gemini") {
      jsonData = await gemini.getJSONFromPdf(filePath);
    } else {
      throw new Error(`Unknown llm: ${llm}, valid values: 'openai', 'gemini'`);
    }

    console.log("🚀 ~ jsonData:", jsonData);
    console.log("Generating template from jsonData");

    const uniqueId = randomUUID();
    dataStore.setJsonData(uniqueId, jsonData);

    res.redirect(`/resume/${uniqueId}`);

    // Removing file
    console.log("Removing file");
    await fs.unlink(filePath);

    // const summaryResponse = await axios.post(
    //   "https://api.openai.com/v1/chat/completions",
    //   modelInput,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${openai.API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // const assistant = await openai.model.beta.assistants.create({
    //   name: "PDF Parsing assistant",
    //   instructions:
    //     "You are an expert PDF parsing assistant. Use your knowledge to parse pdf files to get data in that pdf.",
    //   model: "gpt-4o-mini",
    //   tools: [{ type: "file_search" }],
    // });

    // console.log("🚀 ~ assistant:", assistant);

    // const thread = await openai.model.beta.threads.create({
    //   messages: [
    //     {
    //       role: "user",
    //       content: prompt,
    //       attachments: [{ file_id: fileId, tools: [{ type: "file_search" }] }],
    //     },
    //   ],
    //   // response_format: zodResponseFormat(CVData, "cvData"),
    // });

    // console.log("🚀 ~ thread:", thread);

    // const threadId = thread.id;
    // const assistantId = process.env.ASSISTANT_ID;

    // const run = await openai.model.beta.threads.runs.createAndPoll(threadId, {
    //   assistant_id: assistantId,
    // });

    // const messages = await openai.model.beta.threads.messages.list(threadId, {
    //   run_id: run.id,
    // });

    // const dataString = messages.data[0].content[0].text.value;

    // const cleanedResponse = dataString.replace(/```json\n|\n```/g, "");
    // const jsonData = JSON.parse(cleanedResponse);

    // res.json(messages);

    // const modelInput = {
    //   model: "gpt-4o-mini",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are an assistant that parse data from PDF files.",
    //     },
    //     {
    //       role: "user",
    //       content: prompt,
    //       attachments: [{ file_id: fileId, tools: [{ type: "file_search" }] }],
    //     },
    //   ],
    // };

    // const summaryResponse = await openai.model.chat.completions.create(
    //   modelInput
    // );
    // return res.json(summaryResponse);
  } catch (err) {
    console.log("🚀 ~ err:", err);
    res.status(500).send(`error: ${err}`);
  }
});

router.get("/files", async (req, res) => {
  const files = await openai.listFiles();
  return res.json(files);
});

router.get("/assistants", async (req, res) => {
  const assistants = await openai.listAssistants();
  return res.json(assistants);
});

// router.post("/file", upload.single("resume"), async (req, res, next) => {
//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   try {
//     const file = await openaiModel.uploadFile(req.file.path);
//     res.json({ data: file });
//   } catch (err) {
//     console.log("🚀 ~ err:", err);
//     res.status(500).send(`Unknown error: ${err}`);
//   }
// });

module.exports = router;

// let prompt = `
//     From the cv pdf file get the details

//     For your reference I've mentioned structre of json I want as response
//     """
//       firstname: string
//       lastname: string
//       role: string // Role of a person
//       yearsOfExperience: number // Years of experience
//       summary: string // Summary of a working expereince in roles.
//       experienceList: [{
//         role: string, // (e.g Software developer)
//         duration: string, // (e.g 2012 - 2020)
//         summary: string, // summarize the work experience and keep it concise
//       }],
//       educationList: [{
//         stream: string, // (e.g: B.Tech in ECE - JNTU Hyderabad)
//         percentage: string, // (e.g 70% Aggregate)
//       }],
//       skills: [{
//         name: string, // classification name (e.g: Source Control & CI/CD, methodologies)
//         tags: [string], // skills (e.g: Salesforce, Rest API, Git)
//       }], // Classify the skills
//       certifications: [string], // certification name
//     """

//     Give me the final output as JSON string without any extra words about generated response.
//   `;

// `For summary and skills of cv if you can't it or if it's too short then try to generate a it based on other available details like work experience, role and years of experience.

//   For any field If you can't find exact details from pdf try to calculate from provided details.
//   (e.g) Let's say you can't find years of experience in pdf, try to calculate the years by adding the years from the work expereience timeline.
//   for your reference to calculate years of experience current date is ${new Date()}

//   If any field can't able to get the details from pdf,
//   put some words in place which would indicate users that it needs their action to fill those details.
//   Highlight those words which would easy to seen by user.`

// const CVData = z.object({
//   firstname: z.string(),
//   lastname: z.string(),
//   role: z.string(),
//   yearsOfExpereience: z.number(),
//   summary: z.string(),
//   experienceList: z.array(
//     z.object({
//       role: z.string(),
//       duration: z.string(),
//       summary: z.string(),
//     })
//   ),
//   educationList: z.array(
//     z.object({
//       stream: z.string(),
//       percentage: z.string(),
//     })
//   ),
//   skills: z.array(
//     z.object({
//       name: z.string(),
//       tags: z.array(z.string()),
//     })
//   ),
// });
