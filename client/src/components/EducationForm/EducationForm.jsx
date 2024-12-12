/* eslint-disable react/prop-types */

import { EDUCATION_SCORE_TYPE_ENUM } from "../../utils";

const EducationForm = ({
  education,
  handleChangeEducation,
  handleRemoveEducation,
  canRemove,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 mb-2">
      <input
        type="text"
        placeholder="Degree"
        name="degree"
        value={education.degree}
        onChange={event => handleChangeEducation(education.id, event)}
        className="w-full mb-2 p-2 border rounded-md text-sm"
      />
      <input
        type="text"
        placeholder="Institute Name"
        name="institute"
        value={education.institute}
        onChange={event => handleChangeEducation(education.id, event)}
        className="w-full mb-2 p-2 border rounded-md text-sm"
      />
      <input
        type="text"
        placeholder="Year of Completion"
        name="yearOfCompletion"
        value={education.yearOfCompletion}
        onChange={event => handleChangeEducation(education.id, event)}
        className="w-full mb-2 p-2 border rounded-md text-sm"
      />

      <div className="flex space-x-2 mb-2">
        <input
          type="text"
          name="score"
          value={education.score}
          onChange={event => handleChangeEducation(education.id, event)}
          placeholder="Overall Percentage/CGPA"
          className="w-2/3 p-2 border rounded-md text-sm"
        />
        <select
          name="scoreType"
          className="w-1/3 p-2 border rounded-md text-sm"
          value={education.scoreType}
          onChange={event => handleChangeEducation(education.id, event)}
        >
          <option value="">Select Type</option>
          <option value={EDUCATION_SCORE_TYPE_ENUM.percentage}>
            Percentage
          </option>
          <option value={EDUCATION_SCORE_TYPE_ENUM.cgpa}>CGPA</option>
        </select>
      </div>

      {canRemove && (
        <button
          onClick={() => handleRemoveEducation(education.id)}
          className="text-red-500 text-sm hover:underline"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export { EducationForm };
