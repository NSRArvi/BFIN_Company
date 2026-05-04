import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Container from "../shared/Container";
import { post } from "../lib/api";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[0-9\s\-().]{7,20}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    setLoading(true);
    const { data, ok, error } = await post("/api/v1/auth/register", payload);
    setLoading(false);

    if (!ok) {
      setErrors({ form: error });
      return;
    }

    saveAuth(data);

    navigate("/");
  };

  const inputClass = (field) =>
    `h-10 w-full rounded-lg border bg-white px-3 text-sm text-[#09090b] placeholder-[#a1a1aa] outline-none transition-all duration-150 focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
      errors[field]
        ? "border-[#ef4444] focus:ring-[#ef4444]"
        : "border-[#e4e4e7] hover:border-[#a1a1aa]"
    }`;

  return (
    <div className="flex min-h-screen items-center bg-[#f8f9fa] pb-16 pt-24">
      <Container>
        <div className="mx-auto w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-[#e4e4e7] bg-white px-8 py-10 shadow-sm">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1
                className="text-2xl font-semibold tracking-tight text-[#09090b]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Create an account
              </h1>
              <p className="mt-1.5 text-sm text-[#71717a]">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-[#09090b]"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alice Test"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p className="text-xs text-[#ef4444]">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#09090b]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="alice@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="text-xs text-[#ef4444]">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-[#09090b]"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1234567890"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-[#ef4444]">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[#09090b]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    className={`${inputClass("password")} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] transition-colors hover:text-[#09090b]"
                    tabIndex={-1}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="text-lg" />
                    ) : (
                      <AiOutlineEye className="text-lg" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#ef4444]">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-[#09090b]"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`${inputClass("confirmPassword")} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] transition-colors hover:text-[#09090b]"
                    tabIndex={-1}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible className="text-lg" />
                    ) : (
                      <AiOutlineEye className="text-lg" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-[#ef4444]">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Form-level error */}
              {errors.form && (
                <p className="rounded-lg border border-[#fecaca] bg-[#fef2f2] px-3 py-2 text-sm text-[#ef4444]">
                  {errors.form}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 h-10 w-full rounded-lg bg-primary text-sm font-medium text-white transition-all duration-150 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e4e4e7]" />
              <span className="text-xs text-[#a1a1aa]">or</span>
              <div className="h-px flex-1 bg-[#e4e4e7]" />
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-[#71717a]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-[#a1a1aa]">
            By creating an account, you agree to our{" "}
            <Link
              to="/terms-and-conditions"
              className="underline hover:text-[#71717a]"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy-policy"
              className="underline hover:text-[#71717a]"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
