import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiCalendar,
  FiSave,
  FiArrowLeft,
} from "react-icons/fi";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useStudents } from "../context/StudentsContext";
import { useToast } from "../context/ToastContext";
import { COURSES, STATUSES } from "../data/students";
import { isValidEmail, isValidPhone } from "../utils/helpers";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  course: COURSES[0],
  status: "Active",
  address: "",
  dob: "",
  gender: "Male",
  enrolledOn: "",
};

// Add/Edit student form (same component, mode based on route)
const StudentForm = ({ mode = "add" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { addStudent, updateStudent, getStudent } = useStudents();

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Prefill form in edit mode
  useEffect(() => {
    if (mode === "edit" && id) {
      const existing = getStudent(id);
      if (existing) setForm({ ...EMPTY, ...existing });
      else {
        toast.error("Student not found");
        navigate("/students");
      }
    }
  }, [mode, id]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required";
    if (!form.email) err.email = "Email is required";
    else if (!isValidEmail(form.email)) err.email = "Enter a valid email";
    if (!form.phone) err.phone = "Phone is required";
    else if (!isValidPhone(form.phone)) err.phone = "Enter a valid phone";
    if (!form.course) err.course = "Course is required";
    if (!form.status) err.status = "Status is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate save delay for UX
    setTimeout(() => {
      if (mode === "edit") {
        updateStudent(id, form);
        toast.success("Student updated successfully");
      } else {
        const created = addStudent(form);
        toast.success(`${created.name} added`);
      }
      setLoading(false);
      navigate("/students");
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/students"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <FiArrowLeft /> Back to students
          </Link>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            {mode === "edit" ? "Edit Student" : "Add New Student"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Fill in the details below to {mode === "edit" ? "update" : "create"}{" "}
            a student record.
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur p-5 sm:p-6 shadow-sm space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="John Doe"
            icon={<FiUser />}
            error={errors.name}
            required
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="john@example.com"
            icon={<FiMail />}
            error={errors.email}
            required
          />
          <FormInput
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="+1 555 123 4567"
            icon={<FiPhone />}
            error={errors.phone}
            required
          />
          <FormInput
            label="Date of Birth"
            name="dob"
            type="date"
            value={form.dob}
            onChange={onChange}
            icon={<FiCalendar />}
          />
          <FormInput
            label="Course"
            name="course"
            as="select"
            value={form.course}
            onChange={onChange}
            error={errors.course}
            required
          >
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </FormInput>
          <FormInput
            label="Status"
            name="status"
            as="select"
            value={form.status}
            onChange={onChange}
            error={errors.status}
            required
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </FormInput>
          <FormInput
            label="Gender"
            name="gender"
            as="select"
            value={form.gender}
            onChange={onChange}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </FormInput>
          <FormInput
            label="Enrolled On"
            name="enrolledOn"
            type="date"
            value={form.enrolledOn}
            onChange={onChange}
            icon={<FiCalendar />}
          />
        </div>
        <FormInput
          label="Address"
          name="address"
          as="textarea"
          value={form.address}
          onChange={onChange}
          placeholder="Street, City, Country"
          icon={<FiHome />}
          rows={2}
        />

        <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/students")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            <FiSave />{" "}
            {loading
              ? "Saving..."
              : mode === "edit"
              ? "Update Student"
              : "Save Student"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
