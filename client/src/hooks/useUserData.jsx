import { useEffect, useState } from "react";

import { useUser } from "./useUser";
import {
  getEducationStructure,
  getExperienceStructure,
  getSkillGroupStructure,
  getSkillStructure,
  LOCALSTORAGE_KEYS,
} from "../utils";

const useUserData = () => {
  const { user, isLoading, isError } = useUser(
    localStorage.getItem(LOCALSTORAGE_KEYS.RESUME_ID)
  );

  const [userData, setUserData] = useState(null);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    if (isError) {
      setErrorText(isError.message);
    }
  }, [isError]);

  const handleChange = event => {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  //* Contact Section
  const handleContactChange = event => {
    const { name, value } = event.target;

    setUserData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [name]: value,
      },
    }));
  };

  //* Experience Section
  const handleChangeExperience = (id, event) => {
    const { name, value } = event.target;

    setUserData(prev => ({
      ...prev,
      experienceList: prev.experienceList.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            [name]: value,
          };
        }
        return exp;
      }),
    }));
  };

  const handleChangeDuration = (id, type, event) => {
    const { name, value } = event.target;

    setUserData(prev => ({
      ...prev,
      experienceList: prev.experienceList.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            duration: {
              ...exp.duration,
              [type]: {
                ...exp.duration[type],
                [name]: value,
              },
            },
          };
        }
        return exp;
      }),
    }));
  };

  const handleAddExperience = () => {
    setUserData(prev => ({
      ...prev,
      experienceList: [...prev.experienceList, getExperienceStructure()],
    }));
  };

  const handleRemoveExperience = id => {
    setUserData(prev => ({
      ...prev,
      experienceList: prev.experienceList.filter(exp => exp.id !== id),
    }));
  };

  //* Education Section
  const handleChangeEducation = (id, event) => {
    const { name, value } = event.target;

    setUserData(prev => ({
      ...prev,
      educationList: prev.educationList.map(ed => {
        if (ed.id === id) {
          return { ...ed, [name]: value };
        }
        return ed;
      }),
    }));
  };

  const handleAddEducation = () => {
    setUserData(prev => ({
      ...prev,
      educationList: [...prev.educationList, getEducationStructure()],
    }));
  };

  const handleRemoveEducation = id => {
    setUserData(prev => ({
      ...prev,
      educationList: prev.educationList.filter(edu => edu.id !== id),
    }));
  };

  //* Skills Section
  const handleAddSkill = id => {
    setUserData(prev => ({
      ...prev,
      skills: prev.skills.map(skillGroup => {
        if (skillGroup.id === id) {
          return {
            ...skillGroup,
            tags: [...skillGroup.tags, getSkillStructure()],
          };
        }
        return skillGroup;
      }),
    }));
  };

  const handleRemoveSkillGroup = id => {
    setUserData(prev => ({
      ...prev,
      skills: prev.skills.filter(skillGroup => skillGroup.id !== id),
    }));
  };

  const handleAddSkillGroup = () => {
    setUserData(prev => ({
      ...prev,
      skills: [...prev.skills, getSkillGroupStructure()],
    }));
  };

  const handleChangeSkillGroupName = (id, event) => {
    const { value } = event.target;

    setUserData(prev => ({
      ...prev,
      skills: prev.skills.map(skillGroup => {
        if (skillGroup.id === id) {
          return { ...skillGroup, name: value };
        }
        return skillGroup;
      }),
    }));
  };

  const handleChangeSkill = (id, skillId, event) => {
    const { value } = event.target;

    setUserData(prev => ({
      ...prev,
      skills: prev.skills.map(skillGroup => {
        if (skillGroup.id === id) {
          return {
            ...skillGroup,
            tags: skillGroup.tags.map(tag => {
              if (tag.id === skillId) return { ...tag, skill: value };
              return tag;
            }),
          };
        }
        return skillGroup;
      }),
    }));
  };

  //* Validation
  const validateAllFields = data => {
    const allKeys = Object.keys(data);
    const stringFields = [
      "firstname",
      "lastname",
      "role",
      "location",
      "gender",
      "summary",
      "hobbies",
    ];
    for (const key of allKeys) {
      if (stringFields.includes(key)) {
        if (data[key] === "") {
          setErrorText(`Enter valid ${key}`);
          return false;
        }
        continue;
      }

      switch (key) {
        case "contact": {
          const valid = isContactsValid(data);
          if (!valid) return false;
          break;
        }
        case "experienceList": {
          const valid = isExperienceValid(data);
          if (!valid) return false;
          break;
        }
        case "educationList": {
          const valid = isEducationValid(data);
          if (!valid) return false;
          break;
        }
        case "skills": {
          const valid = isSkillsValid(data);
          if (!valid) return false;
          break;
        }
      }
    }

    return true;
  };

  const isContactsValid = data => {
    const { contact } = data;

    if (!contact.email) {
      setErrorText("Enter valid Email");
      return false;
    }

    if (!contact.phone) {
      setErrorText("Enter valid Phone number");
      return false;
    }

    return true;
  };

  const isExperienceValid = data => {
    const { experienceList } = data;

    for (const exp of experienceList) {
      if (!exp.company) {
        setErrorText("Enter Valid Company name");
        return false;
      }

      if (!exp.title) {
        setErrorText("Enter Valid Job title");
        return false;
      }

      if (!exp.summary) {
        setErrorText("Enter Valid Job summary");
        return false;
      }

      const { from, to } = exp.duration;

      if (!from.month || !from.year || !to.month || !to.year) {
        setErrorText("Enter Valid Job duration range");
        return false;
      }
    }

    return true;
  };

  const isEducationValid = data => {
    const { educationList } = data;

    for (const edu of educationList) {
      if (!edu.degree) {
        setErrorText("Enter Valid Degree");
        return false;
      }
      if (!edu.institute) {
        setErrorText("Enter Valid Institute");
        return false;
      }
      if (!edu.yearOfCompletion) {
        setErrorText("Enter Valid Year of Completion");
        return false;
      }
      if (!edu.score) {
        setErrorText("Enter Valid Overall percentage / CGPA");
        return false;
      }
      if (!edu.scoreType) {
        setErrorText("Choose valid type, Percentage or CGPA");
        return false;
      }
    }

    return true;
  };

  const isSkillsValid = data => {
    const { skills } = data;

    for (const skillGroup of skills) {
      if (!skillGroup.name) {
        setErrorText("Enter Valid Skill group name");
        return false;
      }

      if (skillGroup.tags.length === 0) {
        setErrorText("Remove empty skill group or fill values");
        return false;
      }

      for (const tag of skillGroup.tags) {
        if (!tag.skill) {
          setErrorText("Enter Valid Skill name");
          return false;
        }
      }
    }

    return true;
  };

  return {
    userData,
    loading: isLoading,
    errorText,
    setErrorText,
    handleChange,
    handleContactChange,
    handleChangeExperience,
    handleChangeEducation,
    handleChangeDuration,
    handleAddEducation,
    handleAddExperience,
    handleRemoveEducation,
    handleRemoveExperience,
    handleAddSkill,
    handleAddSkillGroup,
    handleRemoveSkillGroup,
    handleChangeSkillGroupName,
    handleChangeSkill,
    validateAllFields,
  };
};

export { useUserData };
