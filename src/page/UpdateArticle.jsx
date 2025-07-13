import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import Select from "react-select";
import { PrimaryButton } from "../components/Buttons";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { tags } from "../js/tags";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateArticle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;
  const [imagePreview, setImagePreview] = useState(null);

  // ✅ Add 'control' here
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
    if (article) {
      setValue("title", article.title);
      setValue("description", article.description);
      setValue("publisher", article.publisher);

      // ✅ Convert array of strings to array of tag objects from master `tags` array
      const tagObjects = tags.filter((option) =>
        article.tags.includes(option.value)
      );
      setValue("tags", tagObjects);

      setValue("image", article.imageUrl); // optional: you may want to preview
    }
  }, [article, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
    try {
      let imageUrl = article.imageUrl;
      if (data.image instanceof File) {
        imageUrl = await uploadImageToImgbb(data.image);
      }
      const updatedArticle = {
        title: data.title,
        description: data.description,
        publisher: data.publisher,
        tags: data.tags.map((tag) => tag.value),
        imageUrl,
      };
      //   console.log(updatedArticle);
      const result = await axiosInstance.put(
        `/update-article/${article._id}`,
        updatedArticle
      );
      //   console.log("api respone", result);
      if (result.data.modifiedCount === 1) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Article updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        setValue("tags", []);
        setValue("image", null);
        setImagePreview(null);
        setValue("publisher", "-- Select Publisher --");
        navigate("/my-articles");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Update Article</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
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
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
          />
          {errors.description && (
            <p className="text-error text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Publisher</label>
          <select
            {...register("publisher", { required: "Publisher is required" })}
            className="w-full select select-bordered"
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

        {/* ✅ Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={tags}
                className="basic-multi-select"
                classNamePrefix="select"
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
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />

          {errors.image && (
            <p className="text-error text-sm mt-1">{errors.image.message}</p>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 rounded max-w-xs border"
            />
          )}
        </div>

        <PrimaryButton type="submit" className="w-full">
          Update Article
        </PrimaryButton>
      </form>
    </div>
  );
};

export default UpdateArticle;
