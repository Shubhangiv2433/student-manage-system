import { Link } from "react-router-dom";
import { FiArrowLeft, FiAlertTriangle } from "react-icons/fi";
import Button from "../components/Button";

// 404 page
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="text-center max-w-md animate-fade-in-up">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
          <FiAlertTriangle className="h-9 w-9" />
        </div>
        <h1 className="text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="mt-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
          Page not found
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <Link to="/dashboard">
            <Button>
              <FiArrowLeft /> Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
