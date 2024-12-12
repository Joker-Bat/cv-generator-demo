/* eslint-disable react/prop-types */

import { EDUCATION_SCORE_TYPE_ENUM } from "../../utils";

const Education = ({ education }) => {
  return (
    <li key={education.id}>
      <strong>{education.degree}</strong>
      {education.institute && (
        <>
          <span> from </span>
          <strong>{education.institute}</strong>
        </>
      )}
      {education.yearOfCompletion && (
        <>
          <span> in </span>
          <strong>{education.yearOfCompletion}</strong>
        </>
      )}
      {education.scoreType && education.score && (
        <>
          <span> with </span>
          {education.scoreType === EDUCATION_SCORE_TYPE_ENUM.percentage && (
            <>
              <strong>{education.score}%</strong>
            </>
          )}
          {education.scoreType === EDUCATION_SCORE_TYPE_ENUM.cgpa && (
            <>
              <span>CGPA </span>
              <strong>{education.score}</strong>
            </>
          )}
        </>
      )}
    </li>
  );
};

export { Education };
