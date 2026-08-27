import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";

import AdminUsers from "./pages/AdminUsers";
import AdminStores from "./pages/AdminStores";
import AdminRatings from "./pages/AdminRatings";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";
import Home from "./pages/Home";
import UserRatings from "./pages/UserRatings";


import { useState } from "react";

import {
  Star,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Store,
  ShieldCheck,
  Users,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Search,
  Bell,
  LogOut,
  LayoutDashboard,
  BarChart3,
  Settings,
  UserRound,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";

import {
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";

import "./App.css";

/* =========================================================
   AUTH PAGE
========================================================= */

function AuthPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(
    window.location.pathname !== "/signup"
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  /* =========================================================
     HANDLE INPUT CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  /* =========================================================
     SIGNUP VALIDATION
  ========================================================= */

  const validateSignup = () => {
    const newErrors = {};
    const nameLength = formData.name.trim().length;

    if (nameLength < 20 || nameLength > 60) {
      newErrors.name =
        "Name must be between 20 and 60 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (formData.address.trim().length > 400) {
      newErrors.address =
        "Address cannot exceed 400 characters.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    } else if (formData.password.length > 16) {
      newErrors.password =
        "Password cannot exceed 16 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     LOGIN VALIDATION
  ========================================================= */

  const validateLogin = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     LOGIN / SIGNUP
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valid = isLogin
      ? validateLogin()
      : validateSignup();

    if (!valid) return;

    try {
      const endpoint = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/signup";

      const body = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setSuccessMessage(
          data.message || "Something went wrong."
        );
        return;
      }

      /* SAVE LOGIN DATA */

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSuccessMessage(data.message);

      /* ROLE BASED REDIRECT */

      if (data.user.role === "admin") {
        navigate("/admin");
      } else if (data.user.role === "owner") {
        navigate("/owner");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Authentication error:", error);

      setSuccessMessage(
        "Unable to connect to backend. Please try again."
      );
    }
  };

  /* =========================================================
     SWITCH LOGIN / SIGNUP
  ========================================================= */

  const switchMode = () => {
    const nextMode = !isLogin;

    setIsLogin(nextMode);

    setFormData({
      name: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
    });

    setErrors({});
    setSuccessMessage("");

    navigate(nextMode ? "/login" : "/signup");
  };

  /* =========================================================
     AUTH UI
  ========================================================= */

  return (
    <div className="app">

      {/* LEFT HERO */}

      <section className="hero-section">

        <div className="brand">
          <div className="brand-icon">
            <Star size={24} fill="currentColor" />
          </div>

          <span>StoreRate</span>
        </div>

        <div className="hero-content">

          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            Trusted Store Rating Platform
          </div>

          <h1>
            Discover stores.
            <br />
            <span>Share your experience.</span>
          </h1>

          <p>
            Find the best stores around you, share honest
            ratings, and help others make better choices.
          </p>

          <div className="features">

            <div className="feature">
              <div className="feature-icon">
                <Store size={19} />
              </div>

              <div>
                <strong>Discover Stores</strong>
                <small>Explore registered stores</small>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <Star size={19} />
              </div>

              <div>
                <strong>Rate & Review</strong>
                <small>Share your experience</small>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <strong>Trusted Ratings</strong>
                <small>Real user experiences</small>
              </div>
            </div>

          </div>
        </div>

        <div className="hero-footer">
          © 2026 StoreRate. Built for better choices.
        </div>

      </section>

      {/* RIGHT AUTH */}

      <section className="auth-section">

        <div className="auth-card">

          <div className="mobile-brand">

            <div className="brand-icon">
              <Star size={21} fill="currentColor" />
            </div>

            <span>StoreRate</span>

          </div>

          <div className="auth-header">

            <div className="welcome-icon">
              <Users size={22} />
            </div>

            <h2>
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </h2>

            <p>
              {isLogin
                ? "Sign in to continue to your StoreRate account."
                : "Join StoreRate and start sharing your experiences."}
            </p>

          </div>

          {successMessage && (
            <div className="success-message">
              <CheckCircle2 size={17} />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            {!isLogin && (
              <div className="form-group">

                <label>Full Name</label>

                <div
                  className={`input-wrapper ${
                    errors.name ? "input-error" : ""
                  }`}
                >

                  <Users size={18} />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />

                </div>

                {errors.name && (
                  <div className="error-text">
                    <AlertCircle size={13} />
                    {errors.name}
                  </div>
                )}

              </div>
            )}

            {/* EMAIL */}

            <div className="form-group">

              <label>Email Address</label>

              <div
                className={`input-wrapper ${
                  errors.email ? "input-error" : ""
                }`}
              >

                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                />

              </div>

              {errors.email && (
                <div className="error-text">
                  <AlertCircle size={13} />
                  {errors.email}
                </div>
              )}

            </div>

            {/* ADDRESS */}

            {!isLogin && (
              <div className="form-group">

                <label>Address</label>

                <div
                  className={`input-wrapper textarea-wrapper ${
                    errors.address ? "input-error" : ""
                  }`}
                >

                  <MapPin size={18} />

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    maxLength={400}
                  />

                </div>

                <div className="field-footer">

                  {errors.address ? (
                    <div className="error-text">
                      <AlertCircle size={13} />
                      {errors.address}
                    </div>
                  ) : (
                    <span></span>
                  )}

                  <small>
                    {formData.address.length}/400
                  </small>

                </div>

              </div>
            )}

            {/* PASSWORD */}

            <div className="form-group">

              <label>Password</label>

              <div
                className={`input-wrapper ${
                  errors.password ? "input-error" : ""
                }`}
              >

                <Lock size={18} />

                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.password && (
                <div className="error-text">
                  <AlertCircle size={13} />
                  {errors.password}
                </div>
              )}

              {!isLogin && (
                <small className="password-hint">
                  8–16 characters · 1 uppercase · 1 special
                  character
                </small>
              )}

            </div>

            {/* CONFIRM PASSWORD */}

            {!isLogin && (
              <div className="form-group">

                <label>Confirm Password</label>

                <div
                  className={`input-wrapper ${
                    errors.confirmPassword
                      ? "input-error"
                      : ""
                  }`}
                >

                  <Lock size={18} />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <div className="error-text">
                    <AlertCircle size={13} />
                    {errors.confirmPassword}
                  </div>
                )}

              </div>
            )}

            {/* LOGIN OPTIONS */}

            {isLogin && (
              <div className="form-options">

                <label className="remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="forgot"
                >
                  Forgot password?
                </button>

              </div>
            )}

            {/* SUBMIT */}

            <button
              className="submit-btn"
              type="submit"
            >
              {isLogin
                ? "Sign In"
                : "Create Account"}

              <ArrowRight size={19} />
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="switch-auth">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={switchMode}
            >
              {isLogin
                ? "Create account"
                : "Sign in"}
            </button>

          </p>

          {!isLogin && (
            <p className="terms">
              By creating an account, you agree to our
              Terms of Service and Privacy Policy.
            </p>
          )}

        </div>

      </section>

    </div>
  );
}


/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user") || "null"
    );
  } catch (error) {
    console.error("Invalid user data:", error);
    localStorage.removeItem("user");
  }

  /* No login */

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  /* Wrong role */

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/user" replace />;
  }

  return children;
}


/* =========================================================
   ROUTES
========================================================= */

function App() {
  return (
    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={<Home />}
      />

      {/* AUTH */}

      <Route
        path="/login"
        element={<AuthPage />}
      />

      <Route
        path="/signup"
        element={<AuthPage />}
      />

      {/* =====================================================
          ADMIN
      ===================================================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminStores />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/ratings"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminRatings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminAnalytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminSettings />
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          USER
      ===================================================== */}

      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/user/ratings"
  element={
    <ProtectedRoute allowedRoles={["user"]}>
      <UserRatings />
    </ProtectedRoute>
  }
/>

      {/* =====================================================
          STORE OWNER
      ===================================================== */}

      <Route
        path="/owner"
        element={
          <ProtectedRoute allowedRoles={["owner"]}>
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          INVALID URL
      ===================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;