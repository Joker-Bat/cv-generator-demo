/* eslint-disable react/prop-types */

const EducationForm = ({
  education,
  handleChangeEducation,
  handleRemoveEducation,
  canRemove,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 mb-2" key={education.id}>
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
