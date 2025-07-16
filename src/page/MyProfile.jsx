import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";
import axios from "axios";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-profile", user.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user,
  });

  //   console.log(data);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        image: data.image || "",
      });
      setImagePreview(data.photoURL);
    }
  }, [data, reset]);

  if (!data || !user) {
    return <Loader />;
  }

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

  const onSubmit = async (d) => {
    // e.preventDefault()
    const { name, email, image } = d;
    // console.log(d);

    const imgbbUrl = await uploadImageToImgbb(image[0]);
    // console.log(imgbbUrl);
    if (user) {
      await updateUserProfile({
        displayName: data.name,
        photoURL: imgbbUrl,
      });
    }
    const res = await axiosInstance.put(`/update-user/${user.email}`, {
      displayName: data.name,
      photoURL: imgbbUrl,
    });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Information updated",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Information updated failed!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(data?.photoURL);
    }
  };

  return (
    <div
      className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg mb-10"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div className="form-control">
          <label className="label font-semibold">Full Name</label>
          <input
            type="text"
            // value={user?.name}
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email (Read-Only) */}
        <div className="form-control">
          <label className="label font-semibold">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered bg-gray-100 w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-4 rounded-md w-full h-64 object-cover"
            />
          )}
          {errors.image && (
            <p className="text-error text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
