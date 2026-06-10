import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPlus, FiUsers, FiFilter } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import StudentTable from "../components/StudentTable";
import Button from "../components/Button";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import { useStudents } from "../context/StudentsContext";
import { useToast } from "../context/ToastContext";
import { COURSES, STATUSES } from "../data/students";

// Students list page with search + filters + table
const Students = () => {
  const { students, deleteStudent } = useStudents();
  const toast = useToast();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return students.filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q);
      const matchesCourse = !courseFilter || s.course === courseFilter;
      const matchesStatus = !statusFilter || s.status === statusFilter;
      return matchesQuery && matchesCourse && matchesStatus;
    });
  }, [students, search, courseFilter, statusFilter]);

  const handleEdit = (student) => {
    navigate(`/students/edit/${student.id}`);
  };

  const handleDelete = (student) => setConfirmDelete(student);

  const confirmRemove = () => {
    deleteStudent(confirmDelete.id);
    toast.success(`${confirmDelete.name} was deleted`);
    setConfirmDelete(null);
  };

  const resetFilters = () => {
    setSearch("");
    setCourseFilter("");
    setStatusFilter("");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            Students
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage all enrolled students from one place.
          </p>
        </div>
        <Link to="/students/add">
          <Button>
            <FiPlus /> Add Student
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 backdrop-blur p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name, email or ID..."
          />
          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <FiFilter /> Filters:
            </div>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none"
            >
              <option value="">All Courses</option>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 outline-none"
            >
              <option value="">All Status</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {(search || courseFilter || statusFilter) && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Showing <strong>{filtered.length}</strong> of {students.length} students
        </p>
      </div>

      {/* Table / Empty */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60">
          <EmptyState
            title={students.length === 0 ? "No students yet" : "No matches"}
            description={
              students.length === 0
                ? "Start by adding your first student to the system."
                : "Try adjusting your search or filters."
            }
            icon={<FiUsers className="h-8 w-8" />}
            action={
              students.length === 0 ? (
                <Link to="/students/add">
                  <Button>
                    <FiPlus /> Add Student
                  </Button>
                </Link>
              ) : (
                <Button variant="secondary" onClick={resetFilters}>
                  Reset filters
                </Button>
              )
            }
          />
        </div>
      ) : (
        <StudentTable
          students={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Delete confirmation */}
      <Modal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete student"
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmRemove}>
              Yes, delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete{" "}
          <strong className="text-slate-900 dark:text-slate-100">
            {confirmDelete?.name}
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default Students;
