import { useCallback, useRef, useState } from "react";

import {
  getEducationStructure,
  getExperienceStructure,
  getUserStructure,
} from "../utils";

const USER_STRUCTURE = getUserStructure();

const useUserData = () => {
  const signalController = useRef();
  const [userData, setUserData] = useState(USER_STRUCTURE);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [notFound, setNotFound] = useState(true);

  const handleFetchUserData = useCallback(async resumeId => {
    try {
      setErrorText("");
      setLoading(true);
      setNotFound(false);

      // Abort previous requests
      if (signalController.current) {
        signalController.current.abort("new request made");
      }

      signalController.current = new AbortController();

      const response = await fetch(`/api/resume/${resumeId}`, {
        signal: signalController.current.signal,
      });

      if (response.status !== 200) {
        if (response.status === 404) {
          setNotFound(true);
        }
        throw new Error(await response.text());
      }

      const { data } = await response.json();
      console.log("🚀 ~ data:", data);
      setNotFound(false);
      setUserData(data);
      setErrorText("");
      return data;
    } catch (err) {
      let errorMessage = "Error getting user resume...";
      if (err.message) {
        errorMessage = err.message;
      }
      setErrorText(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

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
    loading,
    notFound,
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
    handleFetchUserData,
  };
};

export default useUserData;
