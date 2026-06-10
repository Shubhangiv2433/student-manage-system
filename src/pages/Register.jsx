import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { isValidEmail } from "../utils/helpers";

// Admin registration page
const Register = () => {
  const { register, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required";
    else if (form.name.trim().length < 3) err.name = "Name is too short";

    if (!form.email) err.email = "Email is required";
    else if (!isValidEmail(form.email)) err.email = "Enter a valid email";

    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6)
      err.password = "Use at least 6 characters";

    if (!form.confirm) err.confirm = "Please confirm your password";
    else if (form.confirm !== form.password)
      err.confirm = "Passwords do not match";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Get started managing your students in minutes.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <FormInput
          label="Full Name"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Jane Doe"
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
          placeholder="you@example.com"
          icon={<FiMail />}
          error={errors.email}
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="At least 6 characters"
          icon={<FiLock />}
          error={errors.password}
          required
        />
        <FormInput
          label="Confirm Password"
          name="confirm"
          type="password"
          value={form.confirm}
          onChange={onChange}
          placeholder="Re-enter password"
          icon={<FiLock />}
          error={errors.confirm}
          required
        />

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          <FiUserPlus /> {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
