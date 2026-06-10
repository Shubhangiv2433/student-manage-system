import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { isValidEmail } from "../utils/helpers";

// Login page (admin-only)
const Login = () => {
  const { login, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.email) err.email = "Email is required";
    else if (!isValidEmail(form.email)) err.email = "Enter a valid email";
    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6)
      err.password = "Password must be at least 6 characters";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(form);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
        Sign in to your account
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Enter your credentials to access the admin dashboard.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={onChange}
          error={errors.email}
          icon={<FiMail />}
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={onChange}
          error={errors.password}
          icon={<FiLock />}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <input type="checkbox" className="accent-indigo-600" /> Remember me
          </label>
          <button
            type="button"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          <FiLogIn /> {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
