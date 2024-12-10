/* eslint-disable react/prop-types */

import { getMonthOptions, getYearOptions } from "../../utils";

const months = getMonthOptions();
const years = getYearOptions();

const MONTH_OPTIONS = months.map(month => (
  <option key={month} value={month}>
    {month}
  </option>
));

const YEAR_OPTIONS = years.map(year => (
  <option key={year} value={year}>
    {year}
  </option>
));

const ExperienceForm = ({
  experience,
  handleChangeExperience,
  handleChangeDuration,
  handleRemoveExperience,
  canRemove = false,
}) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow p-4 mb-2" key={experience.id}>
      <input
        type="text"
        placeholder="Company Name"
        name="company"
        value={experience.company}
        onChange={event => handleChangeExperience(experience.id, event)}
        className="w-full mb-2 p-2 border rounded-md text-sm"
      />
      <input
        type="text"
        placeholder="Job Title"
        name="title"
        value={experience.title}
        onChange={event => handleChangeExperience(experience.id, event)}
        className="w-full mb-2 p-2 border rounded-md text-sm"
      />
      <div className="flex space-x-2 mb-2">
        <select
          className="w-1/2 p-2 border rounded-md text-sm"
          name="month"
          value={experience.duration.from.month}
          onChange={event => handleChangeDuration(experience.id, "from", event)}
        >
          {MONTH_OPTIONS}
          {/* <option value="Jan">Jan</option>
      <option value="Feb">Feb</option> */}
        </select>
        <select
          className="w-1/2 p-2 border rounded-md text-sm"
          name="year"
          value={experience.duration.from.year}
          onChange={event => handleChangeDuration(experience.id, "from", event)}
        >
          {YEAR_OPTIONS}
          {/* <option value="2020">2020</option>
      <option value="2021">2021</option> */}
        </select>
      </div>
      <div className="flex space-x-2 mb-2">
        <select
          className="w-1/2 p-2 border rounded-md text-sm"
          value={experience.duration.to.month}
          name="month"
          onChange={event => handleChangeDuration(experience.id, "to", event)}
        >
          {MONTH_OPTIONS}
          {/* <option value="Dec">Dec</option>
      <option value="Jan">Jan</option> */}
        </select>
        <select
          className="w-1/2 p-2 border rounded-md text-sm"
          name="year"
          value={experience.duration.to.year}
          onChange={event => handleChangeDuration(experience.id, "to", event)}
        >
          {YEAR_OPTIONS}
          {/* <option value="2023" selected>
        2023
      </option>
      <option value="2024">2024</option> */}
        </select>
      </div>
      <textarea
        placeholder="Responsibilities"
        name="summary"
        value={experience.summary}
        onChange={event => handleChangeExperience(experience.id, event)}
        className="w-full h-24 p-2 border rounded-md text-sm"
      />

      {canRemove && (
        <button
          onClick={() => handleRemoveExperience(experience.id)}
          className="text-red-500 text-sm hover:underline mt-2"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export { ExperienceForm };
