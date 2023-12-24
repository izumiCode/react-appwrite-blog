import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Input } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.error("LOGIN ERROR :: ", error);
    }
  };

  return (
    <div className="container flex items-center justify-center w-full">
      <div className="">
        <span className="font-bold">Iuzmii.code</span>
        <h2 className="text-2xl font-semibold text-primary">
          Sign In to your account
        </h2>

        <div className="text-blue-700">
          <p>Don&apos;t have an account?</p>
          <Link to={"/signup"} className="underline">
            Sign Up
          </Link>
          {error && <p className="alert alert-error">{error}</p>}
        </div>

        {/* MAIN FORM */}
        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="">
            <Input
              label={"Email: "}
              placeholder="example@mail.com"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      value
                    ) || "Input must be a valid email address",
                },
              })}
            />
            <Input
              label={"Password: "}
              placeholder="enter your password"
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                    "Input must be a valid email address",
                },
              })}
            />

            <button type="submit" className="btn btn-accent px-8">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
