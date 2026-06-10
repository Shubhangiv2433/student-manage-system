import { Outlet, Link } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";

// Layout used by Login and Register pages — split screen with branding panel
const AuthLayout = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      {/* Branding panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 bg-linear-to-br from-indigo-600 via-purple-600 to-fuchsia-600 text-white overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <Link to="/" className="relative flex items-center gap-2">
          <div className="h-11 w-11 flex items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
            <FiBookOpen className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold">SV_Manage</span>
        </Link>

        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight">
            Manage your students with ease.
          </h2>
          <p className="mt-3 max-w-md text-white/85">
            A clean, modern, admin-only dashboard to add, edit, and track every
            student in your institution.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
            {[
              { k: "1.2k", v: "Students" },
              { k: "32", v: "Courses" },
              { k: "98%", v: "Satisfaction" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl bg-white/10 backdrop-blur p-3 text-center"
              >
                <p className="text-xl font-bold">{s.k}</p>
                <p className="text-[11px] text-white/80">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/70">
          © {new Date().getFullYear()} SV_Manage. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
