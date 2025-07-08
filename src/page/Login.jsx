import { Link } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../assets/lottie login.json";
import { PrimaryButton, SecondaryLink } from "../components/Buttons";
import { useForm } from "react-hook-form";
import HeadlinerLogo from "../components/HeadlinerLogo";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle authentication logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-4xl w-full bg-white dark:bg-base-200 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2">
          <Lottie
            animationData={loginAnimation}
            loop={true}
            className="w-full h-96"
          />
        </div>

        <div className="w-full md:w-1/2">
          <HeadlinerLogo />
          <h2 className="text-2xl font-bold mb-6 text-primary">Please Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="input focus:outline-none w-full"
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
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  validate: {
                    hasUpper: (v) =>
                      /[A-Z]/.test(v) || "Must include an uppercase letter",
                    hasNumber: (v) =>
                      /[0-9]/.test(v) || "Must include a number",
                    hasSpecial: (v) =>
                      /[!@#$%^&*]/.test(v) ||
                      "Must include a special character",
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

            <PrimaryButton type="submit" className="w-full">
              Login
            </PrimaryButton>

            <p className="text-sm text-base-content mt-4 text-center">
              Don't have an account?{" "}
              <Link
                to="/auth/registration"
                className="border-b-1 text-secondary"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
