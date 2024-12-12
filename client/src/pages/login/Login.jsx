const Login = () => {
  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-gray-800 font-bold text-lg">ZJobs.ai</div>
      </nav>

      <main className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-5xl h-[500px]">
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

              <div id="email-section">
                <form id="email-form">
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-2 w-full border-gray-300 rounded-lg shadow-sm text-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    id="send-otp"
                    className="w-full bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-600 text-sm"
                  >
                    Send OTP
                  </button>
                </form>
              </div>

              <div id="otp-section" className="">
                <form id="otp-form">
                  <div className="mb-4">
                    <label
                      htmlFor="entered-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="entered-email"
                      name="entered-email"
                      readOnly
                      className="mt-2 w-full border-gray-300 bg-gray-100 text-gray-500 rounded-lg shadow-sm text-sm px-4 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      required
                      className="mt-2 w-full border-gray-300 rounded-lg shadow-sm text-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      Please check your email (and spam folder) for the OTP.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-600 text-sm"
                  >
                    Log In
                  </button>
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
