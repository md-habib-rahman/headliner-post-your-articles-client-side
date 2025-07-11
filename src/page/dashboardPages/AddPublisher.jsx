import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

const AddPublisher = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editId, setEditId] = useState(null);

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

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (data.image[0]) {
        imageUrl = await uploadImageToImgbb(data.image[0]);
      }

      const publisherData = {
        name: data.name,
        image: imageUrl,
      };

      if (editId) {
        await axiosInstance.put(`/publishers/${editId}`, publisherData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Publisher updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setEditId(null);
      } else {
        await axiosInstance.post("/publishers", publisherData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Publisher Added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      reset();
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    refetch();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the publisher!",
      icon: "warning",
      showCancelButton: true,

      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/publishers/${id}`);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Publisher deleted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    refetch();
  };

  const handleEdit = (pub) => {
    setEditId(pub._id);
    setValue("name", pub.name);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row items-center gap-2 mb-6"
      >
        <input
          type="text"
          placeholder="Publisher/Category Name"
          {...register("name", { required: true })}
          className="input input-bordered w-full md:w-1/3"
        />
        <input
          type="file"
          {...register("image")}
          className="file-input file-input-bordered w-full md:w-1/3"
        />
        <button className="btn btn-primary w-full md:w-auto">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Preview</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              publishers.map((pub, index) => (
                <tr key={pub._id}>
                  <td>{index + 1}</td>
                  <td>
                    {pub.image && (
                      <img
                        src={pub.image}
                        alt={pub.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td>{pub.name}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleEdit(pub)}
                      className="btn btn-xs btn-warning"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(pub._id)}
                      className="btn btn-xs btn-error"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddPublisher;
