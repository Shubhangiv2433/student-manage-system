import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiUserPlus,
  FiSettings,
  FiX,
  FiBookOpen,
} from "react-icons/fi";

const LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: <FiGrid /> },
  { to: "/students", label: "Students", icon: <FiUsers /> },
  { to: "/students/add", label: "Add Student", icon: <FiUserPlus /> },
  { to: "/settings", label: "Settings", icon: <FiSettings /> },
];

// Responsive sidebar: drawer on mobile, fixed on desktop
const Sidebar = ({ isOpen, onClose }) => {
  const linkClasses = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-white shadow-md">
              <FiBookOpen className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-base font-extrabold bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                SV_Manage 
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Admin Panel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Close menu"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          <p className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
            Menu
          </p>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/students"}
              onClick={onClose}
              className={linkClasses}
            >
              <span className="text-lg">{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
