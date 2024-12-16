const prompt = `
    From the CV PDF file, extract the following details:

    1. **Create Summaries**: Explain the person's experience in a summarized manner. Do not include their name in the summary.
    2. **JSON Structure**: Follow the provided structure for the JSON response.

    For your reference, here is the structure of the JSON I want as a response:
    {
      "firstname": "string *", // First name of the person
      "lastname": "string *", // Last name of the person
      "role": "string *", // Role of the person
      "location": "string", // City name
      "gender": "string", // male, female, or prefer-not-to-disclose
      "summary": "string", // Create a summary from the given data with around 80 words.
      "contact": {
        "email": "string", // Email ID
        "phone": "string" // Phone number with country code, if not found put an empty string
      },
      "experienceList": [
        {
          "id": "uuid", // Unique ID
          "company": "string", // Company name
          "title": "string", // e.g., Software developer
          "duration": {
            "from": {
              "month": "string", // Default 'Jan'
              "year": "number"
            },
            "to": {
              "month": "string", // Default 'Dec'
              "year": "number"
            }
          },
          "summary": "string" // Summarize the work experience and keep it concise
        }
      ],
      "educationList": [
        {
          "id": "uuid",
          "degree": "string", // e.g., Bachelor's in Computer Science
          "institute": "string", // e.g., XYZ University
          "yearOfCompletion": "string", // Valid year of completion or put an empty string
          "scoreType": "percentage | cgpa", // Put empty string if can't find percentage or cgpa 
          "score": "string" // Value of the percentage or CGPA, put empty string if can't find
        }
      ],
      "skills": [
        {
          "id": "uuid",
          "name": "string", // Classification name, e.g., Source Control & CI/CD, methodologies
          "tags": [
            {
              "id": "uuid",
              "skill": "string" // Skill name, e.g., Salesforce, Rest API, Git
            }
          ] // Classify the skills
        }
      ],
      "hobbies": "string",
      "coverLetter": "string"
    }

    Fields marked with * are required fields; they cannot be an empty string. Double-check the PDF file for those details.

    For experience duration:
      Provide the month in a three-letter format like 'Jan', 'Feb'.
      Provide a valid year in a 4-digit number (e.g., 2024).

    I'm going to populate an HTML form using this JSON.
    Ensure the response is a JSON string, valid for the Node.jsJSON.parse method. Do not include any extra words about the generated response, just provide the JSON string.
  `;

module.exports = prompt;

// yearsOfExperience: string // Years of experience. e.g(2+ years of experience)

// skills: [{
//   name: string, // classification name (e.g: Source Control & CI/CD, methodologies)
//   tags: [string], // skills (e.g: Salesforce, Rest API, Git)
// }], // Classify the skills
// certifications: [string], // certification name
