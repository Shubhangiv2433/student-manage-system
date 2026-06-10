import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiBookOpen, FiArrowRight } from "react-icons/fi";
import { getInitials, colorFromString } from "../utils/helpers";

// Card representation of a single student (used in grid views)
const StudentCard = ({ student }) => {
  const gradient = colorFromString(student.name);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white text-lg font-bold shadow-md`}
        >
          {getInitials(student.name)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-800 dark:text-slate-100">
            {student.name}
          </h3>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {student.id}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300 truncate">
          <FiMail className="text-indigo-500" /> {student.email}
        </p>
        <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <FiPhone className="text-emerald-500" /> {student.phone}
        </p>
        <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <FiBookOpen className="text-purple-500" /> {student.course}
        </p>
      </div>

      <Link
        to={`/students/${student.id}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all"
      >
        View profile <FiArrowRight />
      </Link>
    </div>
  );
};

export default StudentCard;
