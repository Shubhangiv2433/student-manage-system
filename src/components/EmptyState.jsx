import { FiInbox } from "react-icons/fi";

// Friendly empty state shown when no data is available
const EmptyState = ({
  title = "Nothing here yet",
  description = "There are no items to display.",
  icon,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-600 dark:text-indigo-300">
        {icon || <FiInbox className="h-8 w-8" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
