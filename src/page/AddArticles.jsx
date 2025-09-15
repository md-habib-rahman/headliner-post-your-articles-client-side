import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { PrimaryButton } from "../components/Buttons";
import axiosInstance from "../api/axiosInstance";
import { tags } from "../js/tags";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstanceSecure from "../api/axiosInstanceSecure";

export default function AddArticles() {
  const axiosSecure = useAxiosInstanceSecure();
  const { user } = useAuth();
  const {
    data: publishers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/publishers");
      return res.data;
    },
  });

  //   console.log(publishers);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

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

  const onSubmit = async (data) => {
    const { title, description, publisher, tags, image, tickerText } = data;
    const initialStatus = {
      isApprove: null,
      isDecline: null,
      declineMessage: null,
    };

    try {
      const tag = tags.map((item) => item.value);
      //   console.log(tag);
      const imageUrl = await uploadImageToImgbb(image[0]);
      //   console.log(imageUrl);
      const articleData = {
        title,
        tickerText,
        description,
        publisher,
        tags: tag,
        imageUrl,
        // isApprove: false,
        approvalStatus: initialStatus,
        isPremium: false,
        viewCount: 0,
        createdBy: user?.email,
        createdAt: new Date().toISOString(),
      };
      //   console.log(articleData);

      const response = await axiosSecure.post("/articles", articleData);
      //   console.log(articleData);
      if (response.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Article added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setImagePreview(null);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "You are not allowed to post any article!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="py-12 flex items-center justify-center bg-base-100 px-4">
      <div className="max-w-4xl w-full bg-white dark:bg-base-200 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-4 text-center font-montserrat">
          Add New Article
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              placeholder="Enter article title"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Ticker Text</label>
            <input
              type="text"
              placeholder="Enter Ticker Text"
              {...register("tickerText")}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              placeholder="Enter article description"
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errors.description && (
              <p className="text-error text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Publisher</label>
            <select
              {...register("publisher", { required: true })}
              className="select select-bordered w-full"
              defaultValue=""
            >
              <option disabled value="">
                -- Select Publisher --
              </option>
              {publishers.map((pub) => (
                <option key={pub._id} value={pub.name}>
                  {pub.name}
                </option>
              ))}
            </select>
            {errors.publisher && (
              <p className="text-error text-sm mt-1">
                {errors.publisher.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Tags</label>
            <Controller
              name="tags"
              control={control}
              rules={{
                required: "Tags are required",
                validate: (value) =>
                  value.length > 0 || "Please select at least one tag",
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  options={tags}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              )}
            />
            {errors.tags && (
              <p className="text-error text-sm mt-1">{errors.tags.message}</p>
            )}
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

          <PrimaryButton type="submit" className="w-full">
            Add Article
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
