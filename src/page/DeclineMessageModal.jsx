import React from "react";

const DeclineMessageModal = ({ message, setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-semibold text-primary mb-4 font-montserrat">
          Reason for Decline
        </h3>
        <p>{message}</p>
        <button className="btn btn-primary mt-4" onClick={closeModal}>
          Close
        </button>
      </div>
    </dialog>
  );
};

export default DeclineMessageModal;
