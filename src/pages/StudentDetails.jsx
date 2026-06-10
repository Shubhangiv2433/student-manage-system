import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiBookOpen,
  FiUser,
  FiEdit2,
  FiTrash2,
  FiHash,
} from "react-icons/fi";
import Button from "../components/Button";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import { useStudents } from "../context/StudentsContext";
import { useToast } from "../context/ToastContext";
import {
  getInitials,
  colorFromString,
  formatDate,
} from "../utils/helpers";

const STATUS_BADGE = {
  Active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Inactive: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
  Graduated:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
};

// Reusable info row
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70">
    <div className="mt-0.5 text-indigo-600 dark:text-indigo-400">{icon}</div>
    <div className="min-w-0">
      <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="font-semibold text-slate-800 dark:text-slate-100 wrap-break-words">
        {value || "—"}
      </p>
    </div>
  </div>
);

const StudentDetails = () => {
  const { id } = useParams();
  const { getStudent, deleteStudent } = useStudents();
  const navigate = useNavigate();
  const toast = useToast();
  const [confirm, setConfirm] = useState(false);

  const student = getStudent(id);

  if (!student) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60">
        <EmptyState
          title="Student not found"
          description="The student you are looking for doesn't exist or has been removed."
          action={
            <Link to="/students">
              <Button variant="secondary">
                <FiArrowLeft /> Back to students
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const handleDelete = () => {
    deleteStudent(student.id);
    toast.success(`${student.name} was deleted`);
    navigate("/students");
  };

  const gradient = colorFromString(student.name);

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      <Link
        to="/students"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
      >
        <FiArrowLeft /> Back to students
      </Link>

      {/* Profile card */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur shadow-sm animate-fade-in-up">
        <div className={`h-28 bg-linear-to-r ${gradient}`} />
        <div className="px-5 sm:px-8 pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div
                className={`h-24 w-24 sm:h-28 sm:w-28 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white text-3xl font-extrabold border-4 border-white dark:border-slate-900 shadow-lg`}
              >
                {getInitials(student.name)}
              </div>
              <div className="pb-1">
                <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                  {student.name}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {student.course} • {student.id}
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[student.status]}`}
                >
                  {student.status}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to={`/students/edit/${student.id}`}>
                <Button variant="secondary">
                  <FiEdit2 /> Edit
                </Button>
              </Link>
              <Button variant="danger" onClick={() => setConfirm(true)}>
                <FiTrash2 /> Delete
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Info grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur p-5 shadow-sm animate-fade-in-up">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow
              icon={<FiUser />}
              label="Full Name"
              value={student.name}
            />
            <InfoRow icon={<FiHash />} label="Student ID" value={student.id} />
            <InfoRow
              icon={<FiCalendar />}
              label="Date of Birth"
              value={formatDate(student.dob)}
            />
            <InfoRow
              icon={<FiUser />}
              label="Gender"
              value={student.gender}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur p-5 shadow-sm animate-fade-in-up">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">
            Course Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow
              icon={<FiBookOpen />}
              label="Course"
              value={student.course}
            />
            <InfoRow
              icon={<FiCalendar />}
              label="Enrolled On"
              value={formatDate(student.enrolledOn)}
            />
            <InfoRow
              icon={<FiUser />}
              label="Status"
              value={student.status}
            />
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur p-5 shadow-sm animate-fade-in-up">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <InfoRow icon={<FiMail />} label="Email" value={student.email} />
            <InfoRow icon={<FiPhone />} label="Phone" value={student.phone} />
            <InfoRow
              icon={<FiMapPin />}
              label="Address"
              value={student.address}
            />
          </div>
        </div>
      </section>

      <Modal
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        title="Delete student"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Yes, delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete{" "}
          <strong className="text-slate-900 dark:text-slate-100">
            {student.name}
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default StudentDetails;
