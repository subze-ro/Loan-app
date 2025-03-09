import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const success = await login(data.username, data.password);
    if (success) navigate("/Dashboard");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-red-100 p-4 rounded-lg">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-700 font-semibold">
                Enter name
              </label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your username"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold ">
                Enter password
              </label>
              <input
                className="w-full text-gray-700 mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                })}
                type="password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="login" className="text-red-500 hover:underline">
                {" "}
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Dont have an account ?
          </p>
          <a
            href="/register"
            className="text-red-500 font-medium hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
