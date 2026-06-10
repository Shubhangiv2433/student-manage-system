import { FiMenu, FiBell, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { getInitials } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

// Top navigation bar inside the dashboard layout
const Navbar = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-4 sm:px-6 py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Open menu"
        >
          <FiMenu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
            Welcome back, {user?.name?.split(" ")[0] || "Admin"} 👋
          </h1>
          <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
            Here's what's happening with your students today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>
        <button
          className="relative rounded-xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition"
          aria-label="Notifications"
        >
          <FiBell />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <div className="hidden sm:flex items-center gap-2 pl-2 ml-1 border-l border-slate-200 dark:border-slate-700">
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs font-bold">
            {getInitials(user?.name || "Admin")}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              {user?.name || "Admin"}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Administrator
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30 transition"
          title="Logout"
          aria-label="Logout"
        >
          <FiLogOut />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
