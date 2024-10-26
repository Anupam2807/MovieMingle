import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../Components/useAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Loader from "../../Components/Loader/Loader";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const vm = useAuth();

  const onSubmit = (data) => {
    if (isSignUp) {
      vm.register(data);
      reset();
    } else {
      vm.login(data);
    }
    if (rememberMe) {
      localStorage.setItem("email", data.email);
    } else {
      localStorage.removeItem("email");
    }
  };

  const handleGoogleSignIn = () => {
    vm.googleLogin();
  };

  return (
    <div className="min-h-screen bg-[#04152d] text-white flex flex-col">
      <Toaster />
      <main className="flex-grow flex items-center justify-center px-4">
        {vm.loading ? (
          <>
            <Loader />
          </>
        ) : (
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-4xl font-extrabold">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="mt-2 text-sm">
                {isSignUp
                  ? "Sign up to start your movie journey"
                  : "Sign in to continue your movie journey"}
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                {isSignUp && (
                  <input
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                    })}
                    id="username"
                    name="username"
                    type="text"
                    className={`bg-[#1a2a3a] border-[#2a3a4a] text-white placeholder-gray-400 w-full p-2 ${
                      errors.username ? "border-red-500" : ""
                    }`}
                    placeholder="Username"
                  />
                )}
                {errors.username && (
                  <p className="text-red-500 text-xs">
                    {errors.username.message}
                  </p>
                )}

                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  id="email"
                  name="email"
                  type="email"
                  className={`bg-[#1a2a3a] border-[#2a3a4a] text-white placeholder-gray-400 w-full p-2 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}

                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className={`bg-[#1a2a3a] border-[#2a3a4a] text-white placeholder-gray-400 w-full p-2 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-600 rounded bg-[#1a2a3a]"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                      Remember me
                    </label>
                  </div>


                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                style={{
                  background:
                    "linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)",
                }}
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0a1929] text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                      <path fill="none" d="M1 1h22v22H1z" />
                    </svg>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>

            <p className="mt-2 text-center text-sm">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-medium text-orange-500 hover:text-orange-400"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
