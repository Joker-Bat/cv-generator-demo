import React, { useEffect } from "react";

import { useUser } from "../../hooks/useUser";
import { Loader } from "../../components/Loader";
import { getFormatedDurationString } from "../../utils/helpers";
import { LOCALSTORAGE_KEYS } from "../../utils";
import { useNavigate } from "react-router-dom";
import { EDIT_PAGE_SECTIONS } from "../edit/constants";
import { UserNotFound } from "../../components/UserNotFound";

const Profile = () => {
  const navigate = useNavigate();

  const { user, isLoading } = useUser(
    localStorage.getItem(LOCALSTORAGE_KEYS.RESUME_ID)
  );

  useEffect(() => {
    if (isLoading) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isLoading]);

  const navigateToEditForm = section => {
    navigate("/user/edit", {
      state: {
        section,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-black/50 z-10">
        <Loader />
      </div>
    );
  }

  if (!user || Object.keys(user).length === 0) {
    return <UserNotFound />;
  }

  return (
    <main className="col-span-4 bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6 p-4 bg-indigo-50 rounded-lg shadow">
        <h2 className="text-lg font-bold text-indigo-500">
          Get Noticed by Top Employers
        </h2>
        <p className="text-gray-600 text-sm">
          ZJobs.ai connects your profile with top employers actively seeking
          talent. Completing your profile and taking the AI interview enhances
          your visibility, making it easier for employers to find and evaluate
          you for the right opportunities.
        </p>
        {/* <button class="mt-2 bg-indigo-500 text-white font-medium px-4 py-1 rounded-full shadow hover:bg-indigo-600 text-sm">
                    Boost Your Profile Now
                </button> */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* <!-- Left Column --> */}
        <div className="space-y-4">
          {/* <!-- Basic Details --> */}
          <div className="bg-gray-50 rounded-lg shadow p-4 relative">
            <div className="flex items-center space-x-3">
              <img
                src="2.png"
                alt="Candidate Photo"
                className="w-32 h-32 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold">
                  {user.firstname} {user.lastname}
                </h1>
                <p className="text-gray-600 text-sm">
                  <i className="fas fa-user-tie"></i> {user.role}
                </p>
                <p className="text-gray-600 text-sm">
                  <i className="fas fa-map-marker-alt"></i> {user.location}
                </p>
              </div>
            </div>
            <p className="mt-2 text-gray-500 text-xs">
              Last updated: 5 days ago
            </p>
            <span
              onClick={() =>
                navigateToEditForm(EDIT_PAGE_SECTIONS.PERSONAL_DETAILS)
              }
            >
              <i className="fas fa-pencil-alt absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"></i>
            </span>
          </div>

          {/* <!-- Contact Info --> */}
          <div className="bg-gray-50 rounded-lg shadow p-4 relative">
            <h2 className="text-lg font-semibold text-indigo-500 mb-2">
              Contact Information
            </h2>
            <p className="text-gray-600 text-sm">
              <i className="fas fa-envelope"></i> Email: {user.contact.email}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              <i className="fas fa-phone"></i> Contact: {user.contact.phone}
            </p>

            <span
              onClick={() =>
                navigateToEditForm(EDIT_PAGE_SECTIONS.CONTACT_INFO)
              }
            >
              <i className="fas fa-pencil-alt absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"></i>
            </span>
          </div>

          {/* <!-- Profile Summary --> */}
          <div className="bg-gray-50 rounded-lg shadow p-4 relative">
            <h2 className="text-lg font-semibold text-indigo-500 mb-2">
              Profile Summary
            </h2>
            <p className="text-gray-600 text-sm">{user.summary}</p>

            <span
              onClick={() =>
                navigateToEditForm(EDIT_PAGE_SECTIONS.PROFILE_SUMMARY)
              }
            >
              <i className="fas fa-pencil-alt absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"></i>
            </span>
          </div>

          {/* <!-- Skills --> */}
          <div className="bg-gray-50 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-indigo-500">Skills</h2>
            {user.skills.map((skill, index) => {
              return (
                <React.Fragment key={index}>
                  <h3 className="text-md font-bold text-gray-700 mt-2">
                    {skill.name}
                  </h3>

                  <div className="flex flex-wrap gap-1 mt-1 text-sm">
                    {skill.tags.map(tag => {
                      let colors = "bg-indigo-100 text-indigo-700";
                      if (index % 2 !== 0) {
                        colors = "bg-green-100 text-green-700";
                      }

                      return (
                        <span
                          key={tag}
                          className={"px-2 py-1 rounded-full shadow " + colors}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* <!-- Self-Rating Skills --> */}
          <div className="bg-gray-50 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-indigo-500 mb-2">
              Self-Rated Skills
            </h2>
            <p className="text-gray-600 text-sm italic">
              You have not rated your skills yet.
            </p>
            <button className="mt-2 bg-indigo-500 text-white font-medium px-4 py-1 rounded-full shadow hover:bg-indigo-600 text-sm">
              Rate Your Skills
            </button>
          </div>
        </div>

        {/* <!-- Right Column --> */}
        <div className="space-y-4">
          {/* <!-- Work Experience --> */}
          <div className="bg-gray-50 rounded-lg shadow p-4 relative">
            <h2 className="text-lg font-semibold text-indigo-500 mb-2">
              Work Experience
            </h2>
            {user.experienceList.map(exp => {
              return (
                <div className="mb-4" key={exp.id}>
                  <h3 className="text-md font-bold text-gray-700">
                    {exp.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Company: {exp.company}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    Duration: {getFormatedDurationString(exp.duration)}
                  </p>
                  <p className="text-gray-700 text-sm">{exp.summary}</p>
                  {/* <ul className="list-disc list-inside text-gray-700 text-sm">
                    <li>{exp.summary}</li>
                    <li>
                      Reduced testing time by 30% through efficient test case
                      design.
                    </li>
                  </ul> */}
                </div>
              );
            })}

            <span
              onClick={() =>
                navigateToEditForm(EDIT_PAGE_SECTIONS.WORK_EXPERIENCE)
              }
            >
              <i className="fas fa-pencil-alt absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"></i>
            </span>
          </div>

          {/* <!-- Education --> */}
          <div className="bg-gray-50 rounded-lg shadow p-4 relative">
            <h2 className="text-lg font-semibold text-indigo-500 mb-2">
              Education
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {user.educationList.map(edu => {
                return (
                  <li key={edu.id}>
                    <strong>{edu.degree}</strong> from
                    <strong> {edu.institute}</strong> in
                    <strong> {edu.yearOfCompletion}</strong>
                  </li>
                );
              })}
            </ul>

            <span
              onClick={() => navigateToEditForm(EDIT_PAGE_SECTIONS.EDUCATION)}
            >
              <i className="fas fa-pencil-alt absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"></i>
            </span>
          </div>

          {/* <!-- AI Interview --> */}
          <div className="bg-gray-50 rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-indigo-500 mb-2">
              AI Interview
            </h2>
            <p className="text-gray-600 text-sm italic">
              You have not taken an AI interview yet.
            </p>
            <button className="mt-2 bg-indigo-500 text-white font-medium px-4 py-1 rounded-full shadow hover:bg-indigo-600 text-sm">
              Take an AI Interview
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export { Profile };
