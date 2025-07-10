import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { PrimaryButton } from "../components/Buttons";
import axiosInstance from "../api/axiosInstance";
import { tags } from "../js/tags";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

export default function AddArticles() {
  //   console.log(tags);

  const { user } = useAuth();
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
    const { title, description, publisher, tags, image } = data;

    try {
      const tag = tags.map((item) => item.value);
      //   console.log(tag);
      const imageUrl = await uploadImageToImgbb(image[0]);
    //   console.log(imageUrl);
      const articleData = {
        title,
        description,
        publisher,
        tags: tag,
        imageUrl,
        isApprove: false,
        isPremium: false,
        cratedBy: user?.email,
        createdAt: new Date().toISOString(),
      };

      const response = await axiosInstance.post("/articles", articleData);
      //   console.log(articleData);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Article added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
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
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
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
            <input
              type="text"
              placeholder="Enter publisher name"
              {...register("publisher", { required: "Publisher is required" })}
              className="input input-bordered w-full"
            />
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
                  {...field} // Make react-select controlled by react-hook-form
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
