const prompt = `
    From the cv pdf file extract the details

    Create Summaries as person explaining their experience. Don't include their name in summary.

    For your reference I've mentioned structre of json I want as response
    """
      firstname: string * // First name of a person
      lastname: string * // Last name of a person
      role: string * // Role of a person
      location: string // City name
      gender: string // male or female or prefer-not-to-disclose
      summary: string // Create summary from given data with around 80 words.
      contact: {
        email: string // email id
        phone: string // phone number with country code
      }
      experienceList: [{
        id: uuid, // unique id
        company: string, // Company name
        title: string, // (e.g Software developer)
        duration: { // Duration worked on this company
          from: {
            month: string, // default 'Jan'
            year: number 
          },
          to: {
            month: string, // default 'Dec'
            year: number
          },
        },
        summary: string, // summarize the work experience and keep it concise
      }],
      educationList: [{                     
        id: uuid,
        degree: "", // (e.g: Bachelor's in Computer Science)
        institute: string, // (e.g: XYZ University)
        yearOfCompletion: string,
      }],
      hobbies: "",
      coverLetter: "",
    ""

    Fields marked with * are required fields they can't be an empty string, double check the pdf file for those details

    For experience duration,
    Provide month in three letter format like 'Jan', 'Feb'.
    Provide valid year in 4 digit number. (e.g 2024)

    I'm going to populate a HTML form using this json.

    Don't include any extra words about generated response. Just give me the JSON string.
    return JSON string which is valid for NodeJS JSON.parse method;
  `;

module.exports = prompt;

// yearsOfExperience: string // Years of experience. e.g(2+ years of experience)

// skills: [{
//   name: string, // classification name (e.g: Source Control & CI/CD, methodologies)
//   tags: [string], // skills (e.g: Salesforce, Rest API, Git)
// }], // Classify the skills
// certifications: [string], // certification name
