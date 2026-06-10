import { Link } from "react-router-dom";
import {
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiTrendingUp,
  FiArrowRight,
  FiPlus,
} from "react-icons/fi";
import StatsCard from "../components/StatsCard";
import Button from "../components/Button";
import { useStudents } from "../context/StudentsContext";
import { COURSES } from "../data/students";
import { getInitials, colorFromString, formatDate } from "../utils/helpers";

// Static bar chart built with divs (no chart library, simple + clean)
const CourseBarChart = ({ students }) => {
  const counts = COURSES.map((c) => ({
    name: c,
    count: students.filter((s) => s.course === c).length,
  }));
  const max = Math.max(1, ...counts.map((c) => c.count));

  return (
    <div className="space-y-3">
      {counts.map((c, i) => (
        <div key={c.name}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {c.name}
            </span>
            <span className="text-slate-500 dark:text-slate-400">{c.count}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-br from-indigo-500 to-purple-600 transition-all duration-700"
              style={{
                width: `${(c.count / max) * 100}%`,
                transitionDelay: `${i * 80}ms`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Status doughnut-like ring using conic-gradient (pure CSS)
const StatusDonut = ({ students }) => {
  const active = students.filter((s) => s.status === "Active").length;
  const inactive = students.filter((s) => s.status === "Inactive").length;
  const graduated = students.filter((s) => s.status === "Graduated").length;
  const total = Math.max(1, active + inactive + graduated);
  const pA = (active / total) * 100;
  const pI = (inactive / total) * 100;

  const gradient = `conic-gradient(
    #10b981 0% ${pA}%,
    #94a3b8 ${pA}% ${pA + pI}%,
    #6366f1 ${pA + pI}% 100%
  )`;

  const Legend = ({ color, label, value }) => (
    <div className="flex items-center gap-2 text-xs">
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ background: color }}
      />
      <span className="text-slate-700 dark:text-slate-200 font-medium">
        {label}
      </span>
      <span className="ml-auto text-slate-500 dark:text-slate-400">{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div
        className="relative h-36 w-36 rounded-full"
        style={{ background: gradient }}
      >
        <div className="absolute inset-3 rounded-full bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            {students.length}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Total
          </span>
        </div>
      </div>
      <div className="flex-1 w-full space-y-2">
        <Legend color="#10b981" label="Active" value={active} />
        <Legend color="#94a3b8" label="Inactive" value={inactive} />
        <Legend color="#6366f1" label="Graduated" value={graduated} />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { students, stats } = useStudents();

  // Latest 5 students by enrollment date
  const recent = [...students]
    .sort((a, b) => new Date(b.enrolledOn) - new Date(a.enrolledOn))
    .slice(0, 5);

  return (
    <div className="space-y-6">

      {/* Stats cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value={stats.total}
          icon={<FiUsers className="h-6 w-6" />}
          gradient="from-indigo-500 to-purple-600"
          trend="All enrolled records"
          delay={0}
        />
        <StatsCard
          title="Active Students"
          value={stats.active}
          icon={<FiUserCheck className="h-6 w-6" />}
          gradient="from-emerald-500 to-teal-600"
          trend="Currently studying"
          delay={80}
        />
        <StatsCard
          title="Courses"
          value={stats.courses}
          icon={<FiBookOpen className="h-6 w-6" />}
          gradient="from-amber-500 to-orange-600"
          trend="Programs offered"
          delay={160}
        />
    
      </section>

      {/* Charts row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur p-5 shadow-sm animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                Students per Course
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Distribution across programs
              </p>
            </div>
          </div>
          <CourseBarChart students={students} />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur p-5 shadow-sm animate-fade-in-up">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Status Overview
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Breakdown of student statuses
          </p>
          <StatusDonut students={students} />
        </div>
      </section>

      {/* Recent students */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur p-5 shadow-sm animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Recent Enrollments
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Latest students added to the system
            </p>
          </div>
          <Link
            to="/students"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all"
          >
            View all <FiArrowRight />
          </Link>
        </div>

        <ul className="divide-y divide-slate-100 dark:divide-slate-700">
          {recent.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between py-3 gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br ${colorFromString(
                    s.name
                  )} text-white text-xs font-bold`}
                >
                  {getInitials(s.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800 dark:text-slate-100">
                    {s.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {s.course} • Enrolled {formatDate(s.enrolledOn)}
                  </p>
                </div>
              </div>
              <Link
                to={`/students/${s.id}`}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
