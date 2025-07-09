import React, { useState } from "react";
import registerAnimation from "../assets/registration lottie.json";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import { PrimaryButton, SecondaryLink } from "../components/Buttons";
import HeadlinerLogo from "../components/HeadlinerLogo";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";
import SocialButtons from "../components/SocialButtons";

const Register = () => {
  const navigate = useNavigate();
  //   const [profileImage, setProfileImage] = useState("");
  const { user, registerWithEmail, updateUserProfile, signInWithGoogle } =
    useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //imgbb Image upload function
  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbbApiKey
    }`;

    const response = await axios.post(imgbbUrl, formData);
    // console.log(response.data.data.url);
    return response.data.data.url;
  };

  //save user info to db usig api function
  const saveUserToBackend = async (userData) => {
    const response = await axiosInstance.post("/users", userData);
    return response.data;
  };

  const onSubmit = async (data) => {
    const { name, email, password, image } = data;
    const userInfo = {
      name,
      email,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    try {
      //register user to firebase
      const userCredential = await registerWithEmail(email, password);

      //update userinfo in the database
      const updateUserData = await saveUserToBackend(userInfo);

      //upload image to imgbb
      const imgbbUrl = await uploadImageToImgbb(image[0]);
      console.log(imgbbUrl);
      //update user info firebase
      const userProfileForFirebase = {
        displayName: name,
        photoURL: imgbbUrl,
      };
      updateUserProfile(userProfileForFirebase)
        .then(() => {
          console.log("Profile updated to firebase");
        })
        .catch((err) => {
          console.log(err.message);
        });
      navigate("/");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration completed successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
          role: "user",
          createdAt: new Date().toISOString(),
        };
        const updateUserData = await saveUserToBackend(userInfo);
        if (updateUserData) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration completed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
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
            {/* image upload here */}
            <div>
              <label className="block mb-1 font-medium">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Profile image is required",
                })}
                className="file-input file-input-bordered w-full"
              />
              {errors.image && (
                <p className="text-error text-sm mt-1">
                  {errors.image.message}
                </p>
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
          <div className="divider">OR</div>
          <SocialButtons handleGoogleSignIn={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default Register;
