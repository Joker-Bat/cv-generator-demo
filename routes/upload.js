var express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const exphbs = require("../exphbs");
// const { PDFDocument } = require("pdf-lib");

const { upload } = require("../middlewares/upload");

var router = express.Router();

const API_KEY = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

/* GET users listing. */
router.post("/", upload.single("resume"), async function (req, res, next) {
  try {
    // const updatedHtmlString = await exphbs.render("views/template.hbs", data);
    // res.send(updatedHtmlString);
    // return;

    const example = fileToGenerativePart(req.file.buffer, "application/pdf");

    const files = [example];

    // profile: string // dataURL representation of the image present in the cv for 'img' tag src attribute (make sure it works with JSON.parse)

    let prompt = `
    From the cv pdf file I've uploaded get the details in json below metioned format
    """
      firstname: string
      lastname: string
      role: string // Role of a person
      yearsOfExperience: number // Years of experience
      summary: string // Summary of a working expereince in roles.
      experienceList: [{
        role: string, // (e.g Software developer)
        duration: string, // (e.g 2012 - 2020)
        summary: string, // summary of current role
        details: [string] // (e.g Developed and executed subject-specific lesson plans aligned with the school's curriculum.)
      }],
      educationList: [{
        stream: string, // (e.g: B.Tech in ECE - JNTU Hyderabad)
        percentage: string, // (e.g 70% Aggregate)
      }],
      skills: [string], (e.g, SuccessFactors, SAP Fieldglass)
      certifications: [string], // any certification name to display
    """

    For summary and skills of cv if you can't it or if it's too short then try to generate a it based on other available details like work experience, role and years of experience.

    For any field If you can't find exact details from pdf try to calculate from provided details.
    (e.g) Let's say you can't find years of experience in pdf, try to calculate the years by adding the years from the work expereience timeline.
    for your reference to calculate years of experience current date is ${new Date()}

    If any field can't able to get the details from pdf, 
    put some words in place which would indicate users that it needs their action to fill those details.
    Highlight those words which would easy to seen by user.
  `;

    const generatedContent = await model.generateContent([prompt, ...files]);
    const result = generatedContent.response.text();

    const cleanedResponse = result.replace(/```json\n|\n```/g, "");
    const finalJson = JSON.parse(cleanedResponse);

    const updatedHtmlString = await exphbs.render(
      "views/template.hbs",
      finalJson
    );

    const filepath = path.join(
      __dirname,
      "../uploads",
      "resume-" + Date.now() + ".html"
    );

    fs.writeFile(filepath, updatedHtmlString, err => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Internal Server Error");
      }

      res.download(filepath, "resume.html", err => {
        if (err) {
          console.error("Error sending file:", err);
          res.status(500).send("Internal Server Error");
        }
      });
    });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).send("Unknown error");
  }
});

// router.get("/image", upload.single("pdf"), async (req, res, next) => {
//   const fileBuffer = req.file.buffer;

//   // Convert Buffer to ArrayBuffer
//   const arrayBuffer = fileBuffer.buffer.slice(
//     fileBuffer.byteOffset,
//     fileBuffer.byteOffset + fileBuffer.byteLength
//   );

//   const pdfDoc = await PDFDocument.load(arrayBuffer);
//   const page = pdfDoc.getPage(0);
//   const images = page.node.Resources.XObject;
//   console.log("page.node.Resources", page.node.Resources);

//   console.log("🚀 ~ images:", images);

//   if (images) {
//     for (const key of Object.keys(images)) {
//       const image = images[key];

//       if (image.constructor.name === "PDFImage") {
//         const base64Image = `data:image/jpeg;base64,${image
//           .getContent()
//           .toString("base64")}`;

//         console.log("🚀 ~ base64Image:", base64Image);

//         res.render("image", { profile: base64Image });

//         return;
//       }
//     }
//   }

//   res.json({ done: false });
//   // for (let i = 0; i < pdfDoc.getPageCount(); i++) {
//   // }
// });

// router.get("/", (req, res, next) => {
//   console.log("token: ", __dirname);

//   res.render("template", data);
// });

module.exports = router;

const temp = {
  profile:
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCw8NDg8QEQABAQECBAYFAQEBAQEBAP/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAABwECAwQFBgcBAQEAAgMBAQAAAAAAAAAAAAABAgMEBQgB/9oADAMBAAIQAAAB1m0AAAAAAAAP/EABwQAAIDAQAAAAAAAAAAAAAAAAABAgMEBQgH/2gAIAQEAAT8A/wD/xAAjEAABBAEDAwUBAAAAAAAAAAABAgMRBCExBhMRAwIHE0QhIjJRYX/9oACAECAQE/AP//xAAUEAEAAAAAAAAAAAAAAAAAAAAAE/9oACAEDAQE/AP//xAAaEQACAgMBAQEAAAAAAAAAAAABAgADEQQhMRBBIT/9oACAEBAAE/AP//xAAeEQABBAEDAwUAAAAAAAAAAAABAgMRBCExBhMGAwQhIjMl/9oACAEBAAE/AP//xAAUEQEAAAAAAAAAAAAAAAAAAAB/9oACAECAQE/AP//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQMBAT8A//xAAUEQEAAAAAAAAAAAAAAAAAAAB/9oACAECAQE/AP//Z",
  firstname: "Michael",
  lastname: "James",
  role: "Technical Support Specialist",
  yearsOfExperience: 5,
  summary:
    "A technical support specialist with five years of experience troubleshooting hardware and software issues for end users. Adept at identifying creative solutions to complex technical issues and delivering exceptional customer service.",
  experienceList: [
    {
      role: "Technical Support Specialist",
      duration: "March 2021 – Present",
      summary:
        "Identify timely solutions to tier 1 and tier II technical support tickets and maintain a 93% to 95% customer satisfaction rating year over year. Provided remote desktop support for software installations and issue resolution. Collaborated with IT teams to enhance daily workflows, contributing to a 12% reduction in average resolution times.",
      details: [],
    },
    {
      role: "Technical Support Specialist",
      duration: "June 2019 – March 2021",
      summary:
        "Fielded 20 to 50 tier I and tier II trouble tickets per day, identified solutions to complex issues, and achieved a 97% customer satisfaction rating in 2020. Led the implementation of a shared knowledge base to improve resolution times for recurring customer issues by over 30%.",
      details: [],
    },
  ],
  educationList: [
    {
      stream: "Associate of Science (A.S.) in Information Technology",
      percentage: null,
    },
  ],
  skills: [
    "Customer support",
    "IT service management (ITSM)",
    "Troubleshooting",
    "Technical support",
    "Remote support",
  ],
  certifications: [],
};

const data = {
  firstname: "Sandhya",
  lastname: "Kamuni",
  role: "SAP Fieldglass QA",
  yearsOfExperience: "5",
  summary:
    "Experienced in SAP application quality assurance, test management, and production support with expertise in SAP Fieldglass and SuccessFactors. Skilled in Agile and Waterfall methodologies, end-to-end testing, and regression testing.",
  experienceList: [
    {
      role: "SAP Fieldglass QA - Deloitte USI",
      duration: "2021 Sep - Present",
      summary:
        "Played a key role in quality assurance for SAP Fieldglass implementations and enhancements. Coordinated with onshore and offshore teams to ensure seamless project delivery. Major responsibilities included:",
      details: [
        "Created detailed test strategies and plans for Agile-based sprints using Azure Board.",
        "Tested SAP Fieldglass functionalities like hiring, termination, time and expense management, and invoicing for contingent and SOW contractors.",
        "Validated integrations with other systems, including SAP ECC, Active Directory, SuccessFactors, and ServiceNow.",
        "Ensured QA readiness by conducting smoke tests, SIT, and UAT.",
        "Prepared user training documents (QRG) and maintained QA artifacts for internal and external audits.",
      ],
    },
    // {
    //   role: "Teaching Faculty - Sai Baba Central School",
    //   duration: "2017 - 2019",
    //   summary:
    //     "Contributed to the academic success of elementary-level students by designing engaging lesson plans and fostering a collaborative learning environment. Major contributions included:",
    //   details: [
    //     "Developed and executed subject-specific lesson plans aligned with the school's curriculum.",
    //     "Mentored students to improve their understanding of core subjects, boosting overall performance.",
    //     "Introduced innovative teaching methods to engage students and make learning interactive.",
    //     "Assessed and evaluated student progress through exams and interactive assessments.",
    //   ],
    // },
  ],
  educationList: [
    { stream: "B.Tech in ECE - JNTU Hyderabad", percentage: "70% Aggregate" },
    { stream: "Diploma in Elementary Education" },
  ],
  skills: [
    "SAP Fieldglass",
    "SuccessFactors",
    "ServiceNow",
    // "Azure Board",
    // "Regression Testing",
    // "Agile Methodologies",
  ],
  certifications: ["Details not listed; candidate can update."],
};
