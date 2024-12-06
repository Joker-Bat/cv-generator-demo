import { Link, useParams } from "react-router-dom";

import { GENDER_ENUM } from "../../utils";
import useUserData from "../../hooks/useUserData";
import ExperienceForm from "../../components/ExperienceForm";
import EducationForm from "../../components/EducationForm";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const Resume = () => {
  const { resumeId } = useParams();

  const {
    userData,
    loading,
    notFound,
    errorText,
    setErrorText,
    handleFetchUserData,
    handleChange,
    handleContactChange,
    handleChangeExperience,
    handleChangeEducation,
    handleChangeDuration,
    handleAddEducation,
    handleAddExperience,
    handleRemoveEducation,
    handleRemoveExperience,
  } = useUserData();

  useEffect(() => {
    if (!resumeId) {
      return setErrorText("Can't find resumeId");
    }
    const fetchUser = async () => {
      await handleFetchUserData(resumeId);
    };

    fetchUser();
  }, [handleFetchUserData, resumeId, setErrorText]);

  const handleSubmit = e => {
    e.preventDefault();

    console.log("userData: ", userData);
  };

  return (
    <>
      {loading && (
        <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader />
        </div>
      )}

      {/* // <!-- Navbar --> */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="text-gray-800 font-bold text-lg">ZJobs.ai</div>
        <Link to="/" className="text-gray-800 font-medium hover:underline">
          Back to Profile
        </Link>
      </nav>

      {/* // <!-- Two-Column Layout --> */}
      <main className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0 px-4 py-6">
        {/* <!-- Column 1: Heading Section --> */}
        <div className="lg:col-span-1 bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200 rounded-lg shadow p-6">
          <h1 className="text-2xl font-semibold text-purple-700 mb-4">
            Welcome to ZJobs.ai!
          </h1>
          <p className="text-gray-700 text-sm">
            ZJobs.ai helps you connect with top companies by streamlining your
            application process. Upload your profile once, and let recruiters
            discover you for your dream role. Benefit from our AI-powered tools
            to highlight your skills and make your profile stand out.
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700 text-sm">
            <li>Save time with automated applications.</li>
            <li>Get matched with roles tailored to your skills.</li>
            <li>Secure and user-friendly platform.</li>
          </ul>
        </div>

        {/* <!-- Column 2: Form Section --> */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            {/* <!-- Personal Details --> */}
            <fieldset disabled={loading || notFound}>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-500 mb-2">
                  Personal Details
                </h2>
                <div className="flex space-x-4 mb-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstname"
                    value={userData.firstname}
                    onChange={handleChange}
                    className="w-1/2 p-2 border rounded-md text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastname"
                    value={userData.lastname}
                    onChange={handleChange}
                    className="w-1/2 p-2 border rounded-md text-sm"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Current Role"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  className="w-full mb-2 p-2 border rounded-md text-sm"
                />
                <div className="mb-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md text-sm bg-gray-50 disabled:bg-disabled-input"
                  >
                    <option value={GENDER_ENUM.female}>Female</option>
                    <option value={GENDER_ENUM.male}>Male</option>
                    <option value={GENDER_ENUM["prefer-not-to-disclose"]}>
                      Prefer not to disclose
                    </option>
                  </select>
                </div>
              </div>

              {/* <!-- Profile Summary --> */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-500 mb-2">
                  Profile Summary
                </h2>
                <textarea
                  placeholder="Write a brief summary about yourself"
                  className="w-full h-32 p-2 border rounded-md text-sm"
                  name="summary"
                  value={userData.summary}
                  onChange={handleChange}
                />
              </div>

              {/* <!-- Contact Info --> */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-500 mb-2">
                  Contact Information
                </h2>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userData.contact.email}
                  onChange={handleContactChange}
                  className="w-full mb-2 p-2 border rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={userData.contact.phone}
                  onChange={handleContactChange}
                  className="w-full mb-2 p-2 border rounded-md text-sm"
                />
              </div>

              {/* <!-- Work Experience --> */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-500 mb-2">
                  Work Experience
                </h2>
                <div id="work-container">
                  {userData.experienceList.map((experience, index) => {
                    return (
                      <ExperienceForm
                        key={experience.id}
                        experience={experience}
                        handleChangeDuration={handleChangeDuration}
                        handleChangeExperience={handleChangeExperience}
                        handleRemoveExperience={handleRemoveExperience}
                        canRemove={index > 0}
                      />
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="text-blue-500 text-sm enabled:hover:underline"
                >
                  Add Work Experience
                </button>
              </div>

              {/* <!-- Education --> */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-500 mb-2">
                  Education
                </h2>
                <div id="education-container">
                  {userData.educationList.map((education, index) => {
                    return (
                      <EducationForm
                        key={education.id}
                        education={education}
                        handleChangeEducation={handleChangeEducation}
                        handleRemoveEducation={handleRemoveEducation}
                        canRemove={index > 0}
                      />
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="text-blue-500 text-sm enabled:hover:underline"
                >
                  Add Degree
                </button>
              </div>

              {/* <!-- Hobbies --> */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-500 mb-2">
                  Hobbies
                </h2>
                <textarea
                  placeholder="List your hobbies"
                  className="w-full h-24 p-2 border rounded-md text-sm"
                  value={userData.hobbies}
                  name="hobbies"
                  onChange={handleChange}
                />
              </div>

              {/* <!-- Optional Cover Letter --> */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-purple-500 mb-2">
                  Cover Letter (Optional)
                </h2>
                <textarea
                  placeholder="Write your cover letter here"
                  className="w-full h-32 p-2 border rounded-md text-sm"
                  value={userData.coverLetter}
                  name="coverLetter"
                  onChange={handleChange}
                ></textarea>
              </div>

              <p className="text-md text-red-500">{errorText}</p>

              {/* <!-- Submit Button --> */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="bg-purple-500 text-white font-medium px-6 py-2 rounded-full shadow enabled:hover:bg-purple-600 text-sm disabled:opacity-50"
                >
                  {/* <a href="candidate_profile_self_view.html">Save Changes</a> */}
                  Save Changes
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </main>

      {/* // <!-- Footer --> */}
      <footer className="text-center text-gray-700 text-xs py-4">
        <p>&copy; 2024 ZJobs.ai. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Resume;
