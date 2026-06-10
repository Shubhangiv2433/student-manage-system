import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { getInitials, colorFromString } from "../utils/helpers";

const STATUS_BADGE = {
  Active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Inactive:
    "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
  Graduated:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
};

// Responsive student table (card layout on mobile, table layout on md+)
const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="w-full">
      {/* Desktop / tablet table */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-indigo-50/40 dark:hover:bg-slate-700/40 transition"
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                    {s.id}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 flex items-center justify-center rounded-full bg-gradient-to-br ${colorFromString(
                          s.name
                        )} text-white text-xs font-bold`}
                      >
                        {getInitials(s.name)}
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">
                        {s.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {s.email}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {s.course}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {s.phone}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[s.status]}`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/students/${s.id}`}
                        title="View"
                        className="rounded-lg p-2 text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-900/30 transition"
                      >
                        <FiEye />
                      </Link>
                      <button
                        title="Edit"
                        onClick={() => onEdit(s)}
                        className="rounded-lg p-2 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30 transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => onDelete(s)}
                        className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30 transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {students.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`h-11 w-11 flex items-center justify-center rounded-full bg-gradient-to-br ${colorFromString(
                    s.name
                  )} text-white text-sm font-bold`}
                >
                  {getInitials(s.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
                    {s.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {s.id} • {s.course}
                  </p>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${STATUS_BADGE[s.status]}`}
              >
                {s.status}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 gap-1 text-sm">
              <p className="truncate text-slate-600 dark:text-slate-300">
                ✉️ {s.email}
              </p>
              <p className="text-slate-600 dark:text-slate-300">📞 {s.phone}</p>
            </div>
            <div className="mt-3 flex items-center justify-end gap-1">
              <Link
                to={`/students/${s.id}`}
                className="rounded-lg p-2 text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-900/30"
              >
                <FiEye />
              </Link>
              <button
                onClick={() => onEdit(s)}
                className="rounded-lg p-2 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => onDelete(s)}
                className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentTable;
