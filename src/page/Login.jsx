import { Link, useLocation, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loginAnimation from "../assets/lottie login.json";
import { PrimaryButton, SecondaryLink } from "../components/Buttons";
import { useForm } from "react-hook-form";
import HeadlinerLogo from "../components/HeadlinerLogo";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import SocialButtons from "../components/SocialButtons";
import axiosInstance from "../api/axiosInstance";

export default function Login() {
  const { user, registerWithEmail, LoginWithEmail, signInWithGoogle } =
    useAuth();

  const location = useLocation();

  const from = location.state?.from || "/";

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    LoginWithEmail(data.email, data.password)
      .then((res) => {
        if (res.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Logged in successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from);
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

  //save user info to db usig api function
  const saveUserToBackend = async (userData) => {
    const response = await axiosInstance.post("/users", userData);
    return response.data;
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
          role: "user",
          photoURL: result.user.photoURL,
          createdAt: new Date().toISOString(),
        };
        const updateUserData = await saveUserToBackend(userInfo);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: updateUserData.success ? "Login Successfully" : "Welcome Back",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
          <div className="divider">OR</div>
          <SocialButtons handleGoogleSignIn={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
}
