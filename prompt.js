const prompt = `
    From the cv pdf file extract the details

    Create Summaries as person explaining their experience. Don't include their name in summary.

    For your reference I've mentioned structre of json I want as response
    """
      firstname: string // Persons firstname
      lastname: string // Persons lastname
      role: string // Role of a person
      yearsOfExperience: string // Years of experience. e.g(2+ years of experience)
      summary: string // Create summary from given data with around 80 words.
      experienceList: [{
        role: string, // (e.g Software developer)
        duration: string, // (e.g 2012 - 2020)
        summary: string, // summarize the work experience and keep it concise
      }],
      educationList: [{
        stream: string, // (e.g: B.Tech in ECE - JNTU Hyderabad)
        percentage: string, // (e.g 70% Aggregate)
      }],
      skills: [{
        name: string, // classification name (e.g: Source Control & CI/CD, methodologies)
        tags: [string], // skills (e.g: Salesforce, Rest API, Git)
      }], // Classify the skills
      certifications: [string], // certification name
    """

    For any field If you can't find exact details from pdf try to calculate from provided details.
    (e.g) Let's say you can't find years of experience in pdf, try to calculate the years by adding the years from the work expereience timeline.

    Always add + to the yearsOfExperience. current date ${Date.now()}

    For fields that are missing in pdf, put placeholder for users. e.g( {{provide **percentage**}} )
    Double check the pdf file content to make sure details are missing, before putting an placeholder

    return JSON string which is valid for NodeJS JSON.parse method;
  `;

module.exports = prompt;
