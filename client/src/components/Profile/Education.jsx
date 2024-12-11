/* eslint-disable react/prop-types */

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
    </li>
  );
};

export { Education };
