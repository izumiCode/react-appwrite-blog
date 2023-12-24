import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { Input } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(authLogin(currentUser));
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("LOGIN ERROR :: ", error);
    }
  };

  return (
    <div className="container flex items-center justify-center w-full">
      <div className="">
        {/* <span className="font-bold">Iuzmii.code</span> */}
        <h2 className="text-2xl font-semibold text-primary">
          Create your account
        </h2>

        <div className="text-blue-700">
          <p>Already have an account?</p>
          <Link to={"/login"} className="underline">
            Login
          </Link>
          {error && <p className="alert alert-error">{error}</p>}
        </div>

        {/* MAIN FORM */}
        <form onSubmit={handleSubmit(signup)} className="mt-6">
          <div className="">
            <Input
              label="Username: "
              placeholder="john doe"
              {...register("name", {
                required: true,
                matchPattern: (value) =>
                  /^[a-zA-Z0-9_-]{3,16}$/.test(value) || "Invalid username",
              })}
            />

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
                    "password must be atleast 8 characters",
                },
              })}
            />

            <button type="submit" className="btn btn-accent px-8">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
