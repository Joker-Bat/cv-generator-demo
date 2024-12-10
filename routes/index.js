var express = require("express");
var router = express.Router();
const dataStore = require("../store");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ success: true });
});

router.get("/resume/:uniqueId", async (req, res) => {
  const uniqueId = req.params.uniqueId;
  console.log("🚀 ~ uniqueId:", uniqueId);

  const jsonData = dataStore.getJsonData(uniqueId);
  console.log("🚀 ~ jsonData:", jsonData);

  if (!jsonData) {
    // if (uniqueId === "13dc7ad8-95f0-430a-930f-7572de3ec34e") {
    //   await new Promise(res => setTimeout(res, 2000));
    //   return res.status(200).json(data);
    // }
    return res.status(404).send("Resume not found!");
  }

  return res.status(200).json({ data: jsonData });
});

router.put("/resume/:uniqueId", async (req, res) => {
  const uniqueId = req.params.uniqueId;
  const payload = req.body;

  // console.log("🚀 ~ payload:", payload);
  // if (uniqueId === "13dc7ad8-95f0-430a-930f-7572de3ec34e") {
  //   dataStore.setJsonData(uniqueId, payload);
  // }
  // await new Promise(res => setTimeout(res, 2000));

  const jsonData = dataStore.getJsonData(uniqueId);
  if (!jsonData) {
    return res.status(404).send("Resume not found");
  }

  dataStore.setJsonData(uniqueId, payload);

  return res.status(204).send("Updated Successfully");
});

module.exports = router;

const data = {
  data: {
    firstname: "Karan",
    lastname: "Khona",
    role: "Full Stack Web Developer",
    location: "Mumbai",
    gender: "male",
    summary:
      "A highly skilled and experienced Full Stack Web Developer with 3.6 years of experience in building and deploying web applications.  Proficient in JavaScript, TypeScript, React, Node.js, and various other technologies.  Adept at working independently and collaboratively, often taking leadership roles in projects.  Experienced in developing both front-end and back-end systems for various clients, demonstrating a strong ability to deliver innovative and effective solutions.",
    contact: {
      email: "kbkhona@yahoo.co.in",
      phone: "+919004077933",
    },
    experienceList: [
      {
        id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        company: "Mphatek Systems Pvt. Ltd",
        title: "Sr. Software Developer",
        duration: {
          from: {
            month: "Jan",
            year: 2024,
          },
          to: {
            month: "Dec",
            year: 2024,
          },
        },
        summary:
          "Worked in a full-stack capacity on an end-to-end encrypted messaging application using Java, React, Redis, Electron, and various databases.",
      },
      {
        id: "f0e9d8c7-b6a5-4321-9876-543210fedcba",
        company: "Hyperreality Technologies Pvt. Ltd",
        title: "Full Stack Web Developer",
        duration: {
          from: {
            month: "Jun",
            year: 2022,
          },
          to: {
            month: "Nov",
            year: 2023,
          },
        },
        summary:
          "Developed two web applications from scratch for a US client using Nextron (Electron + NextJs). Built innovative solutions for automating third-party sites and led a team in achieving project objectives.",
      },
      {
        id: "5a6b7c8d-9e0f-1g2h-3i4j-5k6l7m8n9opq",
        company: "Yellow",
        title: "Web Developer",
        duration: {
          from: {
            month: "Oct",
            year: 2021,
          },
          to: {
            month: "Mar",
            year: 2022,
          },
        },
        summary:
          "Provided complete web solutions to businesses, including a microsite for Forbes 30 Under 30 and redesigning websites for Sashaa Automotive and Arelang.",
      },
      {
        id: "a1b2c3d4-e5f6-7890-1234-567890abcdef1",
        company: "Sanda Holdings Pvt. Ltd.",
        title: "Software Developer",
        duration: {
          from: {
            month: "Aug",
            year: 2019,
          },
          to: {
            month: "Aug",
            year: 2020,
          },
        },
        summary:
          "Developed a cross-platform, hybrid mobile application for corporate use that handles encryption-based, secure communication and various ERP functions using PhoneGap/Ionic/Cordova and a front-end JavaScript stack.",
      },
      {
        id: "a1b2c3d4-e5f6-7890-1234-567890abcdef2",
        company: "Just Dial Pvt. Ltd.",
        title: "Software Engineer",
        duration: {
          from: {
            month: "Mar",
            year: 2019,
          },
          to: {
            month: "May",
            year: 2019,
          },
        },
        summary:
          "Received training in emerging front-end and back-end technologies. Created dynamic web pages using AngularJS, HTML, CSS, and performed quality analysis and debugging.",
      },
    ],
    educationList: [
      {
        id: "f7e6d5c4-b3a2-1098-7654-3210fedcba98",
        degree: "B.Tech: Computer Science",
        institute: "Mukesh Patel School Of Technology Mngt & Engg",
        yearOfCompletion: "2012",
      },
    ],
    skills: [
      {
        name: "Programming Languages",
        tags: ["JavaScript", "TypeScript", "Java", "Python"],
      },
      {
        name: "Frameworks & Libraries",
        tags: [
          "React.js",
          "Next.js",
          "Node.js",
          "NestJs",
          "AngularJS",
          "jQuery",
          "Electron",
          "Redis",
        ],
      },
      {
        name: "Databases",
        tags: ["MongoDB", "Cassandra", "Postgres"],
      },
      {
        name: "Source Control & CI/CD",
        tags: ["Git", "Github"],
      },
      {
        name: "Other Tools & Technologies",
        tags: [
          "HTML",
          "CSS",
          "Bootstrap",
          "Figma",
          "Postman",
          "Firebase",
          "AWS",
          "PhoneGap/Ionic/Cordova",
          "Selenium",
          "Express",
        ],
      },
      {
        name: "Methodologies",
        tags: ["Agile"],
      },
    ],
    hobbies:
      "Nature, Reading, Music, Sports and other outdoor activities, Politics, History",
    coverLetter: "",
  },
};
