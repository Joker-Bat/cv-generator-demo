import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../../data/hooks";
import { useVerifyOTP } from "../../data/hooks";
import { LOCALSTORAGE_KEYS } from "../../utils";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [errorText, setErrorText] = useState("");

  const { loading: loginLoading, login } = useLogin();
  const { loading: verifyLoading, verifyOTP } = useVerifyOTP();

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const handleOTPChange = event => {
    setOTP(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setErrorText("");

    try {
      // Verify email
      if (!email) {
        setErrorText("Provide valid email");
        return;
      }

      // Submit the email to get otp
      if (!emailSubmitted) {
        await login({ email });
        setEmailSubmitted(true);
        return;
      }

      if (otp.length !== 6) {
        setErrorText("OTP has to be 6 digit");
      }
      const data = await verifyOTP({ email, otp });
      localStorage.setItem(LOCALSTORAGE_KEYS.USER_ID, data.userId);

      if (data.hasProfileData) {
        navigate("/user/profile");
      } else {
        navigate("/user/upload");
      }
    } catch (err) {
      console.log("🚀 ~ err:", err);
      if (err.status === 400) {
        setErrorText(err.message);
      } else {
        setErrorText("Something went wrong!");
      }
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-gray-800 font-bold text-lg">ZJobs.ai</div>
      </nav>

      <main className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-5xl min-h-[500px]">
          {/* <!-- Left Side: Benefits --> */}
          <div
            className="w-full md:w-1/2 bg-cover bg-center bg-no-repeat p-6 rounded-l-lg bg-login-abstract"
            // style="background-image: url('abstract.webp');"
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-4">
              Benefits of ZJobs.ai
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 bg-white bg-opacity-70 p-4 rounded-lg">
              <li>Streamline your job search with AI-powered tools.</li>
              <li>
                Get personalized job recommendations tailored to your skills.
              </li>
              <li>Seamless login with email-based OTP verification.</li>
              <li>
                Secure and private platform for all your job search needs.
              </li>
            </ul>
          </div>

          {/* <!-- Right Side: Input Box --> */}
          <div className="w-full md:w-1/2 p-6">
            <div id="form-section">
              <h1 className="text-2xl font-semibold text-indigo-700 text-center mb-6">
                Sign Up / Log In
              </h1>
              <p className="text-sm text-gray-600 text-center mb-4">
                Enter your email below. We&apos;ll send you an OTP to log in.
              </p>

              <div className="h-full">
                <form onSubmit={handleSubmit}>
                  <fieldset disabled={loginLoading || verifyLoading}>
                    <div className="mb-6">
                      <label
                        htmlFor="entered-email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        className={`mt-2 w-full border-gray-300 rounded-lg shadow-sm text-sm px-4 py-2 
                        ${
                          emailSubmitted
                            ? " bg-gray-100 text-gray-500"
                            : " focus:ring-indigo-500 focus:border-indigo-500"
                        }`}
                        onChange={handleChangeEmail}
                        disabled={emailSubmitted}
                        required
                      />
                    </div>
                    {emailSubmitted && (
                      <div className="mb-4">
                        <label
                          htmlFor="otp"
                          className="block text-sm font-medium text-gray-700"
                        >
                          OTP
                        </label>
                        <input
                          type="text"
                          name="otp"
                          placeholder="6 digit OTP"
                          className="mt-2 w-full border-gray-300 rounded-lg shadow-sm text-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                          value={otp}
                          onChange={handleOTPChange}
                          required
                        />
                        <p className="text-sm text-gray-600 mt-2">
                          Please check your email (and spam folder) for the OTP.
                        </p>

                        {errorText && (
                          <p className="text-sm text-red-600 mt-4">
                            {errorText}
                          </p>
                        )}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="w-full bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm enabled:hover:bg-indigo-600 text-sm disabled:opacity-50"
                    >
                      {emailSubmitted ? "Log In" : "Send OTP"}
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <!-- Footer --> */}
      <footer className="text-center text-gray-700 text-xs py-4">
        <p>&copy; 2024 ZJobs.ai. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export { Login };
