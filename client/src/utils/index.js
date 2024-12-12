const getYearOptions = (start = 1900, end = new Date().getFullYear()) => {
  const yearOptions = [];
  for (let i = start; i <= end; i++) {
    yearOptions.push(i);
  }

  return yearOptions;
};

const getMonthOptions = () => {
  const months = Array.from({ length: 12 }, (_, index) => {
    return new Date(0, index).toLocaleString("en-US", { month: "short" });
  });

  return months;
};

const getEducationStructure = () => {
  return {
    id: Date.now(),
    degree: "",
    institute: "",
    yearOfCompletion: "",
  };
};

const getExperienceStructure = () => {
  return {
    id: Date.now(),
    company: "",
    title: "",
    summary: "",
    duration: {
      from: {
        month: "Jan",
        year: "2020",
      },
      to: {
        month: "Dec",
        year: "2022",
      },
    },
  };
};

const getSkillGroupStructure = () => {
  return {
    id: Date.now(),
    name: "",
    tags: [getSkillStructure()],
  };
};

const getSkillStructure = () => {
  return {
    id: Date.now(),
    skill: "",
  };
};

const getUserStructure = () => {
  return {
    firstname: "",
    lastname: "",
    role: "",
    location: "",
    gender: GENDER_ENUM["prefer-not-to-disclose"],
    summary: "",
    contact: {
      email: "",
      phone: "",
    },
    experienceList: [],
    educationList: [],
    hobbies: "",
    coverLetter: "",
  };
};

const GENDER_ENUM = {
  male: "male",
  female: "female",
  "prefer-not-to-disclose": "prefer-not-to-disclose",
};

const EDUCATION_SCORE_TYPE_ENUM = {
  percentage: "percentage",
  cgpa: "cgpa",
};

const LOCALSTORAGE_KEYS = {
  RESUME_ID: "RESUME_ID",
};

export {
  getYearOptions,
  getMonthOptions,
  getExperienceStructure,
  getEducationStructure,
  getUserStructure,
  getSkillGroupStructure,
  getSkillStructure,
  GENDER_ENUM,
  LOCALSTORAGE_KEYS,
  EDUCATION_SCORE_TYPE_ENUM,
};
