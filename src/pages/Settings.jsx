import { FiSun, FiMoon, FiDatabase, FiTrash2 } from "react-icons/fi";
import Button from "../components/Button";
import { useTheme } from "../context/ThemeContext";
import { useStudents } from "../context/StudentsContext";
import { useToast } from "../context/ToastContext";
import { storage, KEYS } from "../utils/storage";
import { SAMPLE_STUDENTS } from "../data/students";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();
  const { user } = useAuth();

  // We use storage directly here for "reset" actions
  const resetStudents = () => {
    storage.set(KEYS.STUDENTS, SAMPLE_STUDENTS);
    toast.success("Student data reset to sample dataset");
    setTimeout(() => window.location.reload(), 600);
  };

  const clearStudents = () => {
    storage.set(KEYS.STUDENTS, []);
    toast.success("All students cleared");
    setTimeout(() => window.location.reload(), 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
          Settings
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage preferences and application data.
        </p>
      </div>

      {/* Account info */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          Account
        </h3>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/70 p-3">
            <p className="text-[11px] uppercase text-slate-500 dark:text-slate-400">
              Name
            </p>
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {user?.name}
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/70 p-3">
            <p className="text-[11px] uppercase text-slate-500 dark:text-slate-400">
              Email
            </p>
            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {user?.email}
            </p>
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          Appearance
        </h3>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              Theme
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Toggle between light and dark mode.
            </p>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            {theme === "dark" ? <FiSun /> : <FiMoon />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </section>

      {/* Data */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-5 shadow-sm">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
          Data Management
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          All data is stored in your browser's LocalStorage.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={resetStudents}>
            <FiDatabase /> Reset Sample Data
          </Button>
          <Button variant="danger" onClick={clearStudents}>
            <FiTrash2 /> Clear All Students
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
