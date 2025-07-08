import React from "react";
import registerAnimation from "../assets/registration lottie.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryLink } from "../components/Buttons";
import HeadlinerLogo from "../components/HeadlinerLogo";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const { user, registerWithEmail } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    registerWithEmail(data.email, data.password)
      .then((res) => {
        if (res.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registered successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const password = watch("password", "");
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-4xl w-full bg-white dark:bg-base-200 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <Lottie
            animationData={registerAnimation}
            loop={true}
            className="w-full h-96"
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="mb-4 text-center">
            <HeadlinerLogo />
          </div>

          <h2 className="text-2xl font-bold mb-4 text-primary">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  validate: {
                    hasUpper: (v) =>
                      /[A-Z]/.test(v) || "Must include an uppercase letter",
                    hasNumber: (v) =>
                      /[0-9]/.test(v) || "Must include a number",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="input input-bordered w-full"
              />
              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <PrimaryButton type="submit" className="w-full">
              Register
            </PrimaryButton>

            <p className="text-sm text-base-content mt-4 text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-secondary border-b-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
