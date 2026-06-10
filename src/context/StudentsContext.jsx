import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storage, KEYS } from "../utils/storage";
import { SAMPLE_STUDENTS } from "../data/students";
import { generateStudentId } from "../utils/helpers";

// Holds the student list with CRUD operations
const StudentsContext = createContext(null);

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = storage.get(KEYS.STUDENTS, null);
    if (saved && Array.isArray(saved)) return saved;
    // Seed with sample data
    storage.set(KEYS.STUDENTS, SAMPLE_STUDENTS);
    return SAMPLE_STUDENTS;
  });

  // Persist whenever students change
  useEffect(() => {
    storage.set(KEYS.STUDENTS, students);
  }, [students]);

  const addStudent = (data) => {
    const newStudent = {
      ...data,
      id: generateStudentId(students),
      enrolledOn: data.enrolledOn || new Date().toISOString().slice(0, 10),
    };
    setStudents((list) => [newStudent, ...list]);
    return newStudent;
  };

  const updateStudent = (id, data) => {
    setStudents((list) =>
      list.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  };

  const deleteStudent = (id) => {
    setStudents((list) => list.filter((s) => s.id !== id));
  };

  const getStudent = (id) => students.find((s) => s.id === id);

  // Derived statistics for the dashboard
  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === "Active").length;
    const courses = new Set(students.map((s) => s.course)).size;
    const thirtyDaysAgo = Date.now() - 1000 * 60 * 60 * 24 * 30;
    const newAdmissions = students.filter(
      (s) => new Date(s.enrolledOn).getTime() >= thirtyDaysAgo
    ).length;
    return { total, active, courses };
  }, [students]);

  return (
    <StudentsContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudent,
        stats,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export const useStudents = () => useContext(StudentsContext);
