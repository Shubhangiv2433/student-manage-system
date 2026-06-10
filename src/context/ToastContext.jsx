import { createContext, useCallback, useContext, useState } from "react";
import {
  FiCheckCircle,
  FiAlertTriangle,
  FiInfo,
  FiXCircle,
  FiX,
} from "react-icons/fi";

// Simple in-app toast notification system
const ToastContext = createContext(null);

const ICONS = {
  success: <FiCheckCircle className="h-5 w-5" />,
  error: <FiXCircle className="h-5 w-5" />,
  warning: <FiAlertTriangle className="h-5 w-5" />,
  info: <FiInfo className="h-5 w-5" />,
};

const COLORS = {
  success:
    "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700",
  error:
    "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-700",
  warning:
    "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700",
  info: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-200 dark:border-sky-700",
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info", duration = 3000) => {
      const id = Date.now() + Math.random();
      setToasts((list) => [...list, { id, message, type }]);
      if (duration) setTimeout(() => remove(id), duration);
    },
    [remove]
  );

  // Convenience methods
  const toast = {
    success: (m) => push(m, "success"),
    error: (m) => push(m, "error"),
    warning: (m) => push(m, "warning"),
    info: (m) => push(m, "info"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[min(360px,90vw)]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-toast flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur ${COLORS[t.type]}`}
          >
            <span className="mt-0.5">{ICONS[t.type]}</span>
            <span className="flex-1 text-sm font-medium">{t.message}</span>
            <button
              onClick={() => remove(t.id)}
              className="opacity-70 hover:opacity-100 transition"
              aria-label="Dismiss"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
