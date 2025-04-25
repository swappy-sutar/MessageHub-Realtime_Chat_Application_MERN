import React, { useState } from "react";
import { useAuthStore } from "../utils/useAuthStore";
import { Eye, EyeOff, Mail, Lock, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import { toast } from "react-hot-toast";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();
 
  const validateForm = () => {
    const { email, password } = formData;

    if (!email.trim()) return toast.error("Email is required.");
    if (!/\S+@\S+\.\S+/.test(email))
      return toast.error("Invalid email format.");
    if (!password) return toast.error("Password is required.");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validated = validateForm();
    if (validated === true) {
      await login(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Heading */}
          <div className="text-center">
            <div className="size-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-200">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="size-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input input-bordered pl-11 w-full"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="size-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input input-bordered pl-11 w-full"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-400" />
                  ) : (
                    <Eye className="size-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? " loading..." : "Login"}
            </button>
          </form>
          <div>
            <p className="text-center text-base-content/60">
              Create a new account?{" "}
              <Link to="/signup" className="link link-primary font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      />
    </div>
  );
}

export default LoginPage;
