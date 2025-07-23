import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../api/axiosInstance";
import Swal from "sweetalert2";
import useAxiosInstanceSecure from "../../../api/axiosInstanceSecure";

const DeclineModal = ({ setModalOpen, articleId, refetch }) => {
  const axiosSecure = useAxiosInstanceSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const result = await axiosSecure.patch(
      `/article/decline/${articleId}`,
      data
    );
    if (result.data.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Article denied message updated!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    refetch();
    setModalOpen(false);
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg font-montserrat">Decline Article</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Enter decline reason"
            {...register("declineMessage", { required: true })}
          ></textarea>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary rounded-xl">
              Submit
            </button>
            <button
              type="button"
              className="btn rounded-xl"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default DeclineModal;
