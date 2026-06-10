import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

// Reusable form input that supports password toggling and inline errors
const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
  as = "input", // "input" | "select" | "textarea"
  children,
  required,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  const base =
    "w-full rounded-xl border bg-white/80 dark:bg-slate-800/80 px-4 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none transition focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500";
  const borderCls = error
    ? "border-rose-400"
    : "border-slate-200 dark:border-slate-700";
  const padLeft = icon ? "pl-10" : "";
  const padRight = isPassword ? "pr-10" : "";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        {as === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`${base} ${borderCls} ${padLeft} ${padRight}`}
            {...props}
          >
            {children}
          </select>
        ) : as === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={props.rows || 3}
            className={`${base} ${borderCls} ${padLeft} ${padRight} resize-none`}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${base} ${borderCls} ${padLeft} ${padRight}`}
            {...props}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-rose-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
