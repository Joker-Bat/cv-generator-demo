import { Link } from "react-router-dom";

const UserNotFound = () => {
  return (
    <div className="w-full h-full fixed inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
      <h1>User not found</h1>
      <br />
      <Link to="/">
        <button className="bg-purple-500 text-white font-medium px-6 py-2 rounded-full shadow enabled:hover:bg-purple-600 text-sm disabled:opacity-50">
          Go Back
        </button>
      </Link>
    </div>
  );
};

export { UserNotFound };
