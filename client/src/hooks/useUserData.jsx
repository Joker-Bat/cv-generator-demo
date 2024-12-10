import { useEffect, useState } from "react";

import { useUser } from "./useUser";
import {
  getEducationStructure,
  getExperienceStructure,
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

  const handleRemoveEducation = id => {
    setUserData(prev => ({
      ...prev,
      educationList: prev.educationList.filter(edu => edu.id !== id),
    }));
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
    // handleFetchUserData,
  };
};

export { useUserData };
