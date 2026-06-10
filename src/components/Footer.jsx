import { FiHeart } from "react-icons/fi";

// Simple dashboard footer
const Footer = () => (
  <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 px-4 sm:px-6 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
    <p className="inline-flex items-center gap-1.5">
      © {new Date().getFullYear()} SV_Manage — Built with
      <FiHeart className="text-rose-500" /> by a fresher dev.
    </p>
  </footer>
);

export default Footer;
