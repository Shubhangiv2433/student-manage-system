import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import StudentForm from "../pages/StudentForm";
import StudentDetails from "../pages/StudentDetails";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Central routing configuration
const AppRoutes = () => (
  <Routes>
    {/* Default redirect */}
    <Route path="/" element={<Navigate to="/dashboard" replace />} />

    {/* Public auth routes */}
    <Route
      element={
        <PublicRoute>
          <AuthLayout />
        </PublicRoute>
      }
    >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    {/* Protected dashboard routes */}
    <Route
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/students/add" element={<StudentForm mode="add" />} />
      <Route
        path="/students/edit/:id"
        element={<StudentForm mode="edit" />}
      />
      <Route path="/students/:id" element={<StudentDetails />} />
      <Route path="/settings" element={<Settings />} />
    </Route>

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
