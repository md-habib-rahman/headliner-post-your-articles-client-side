import React from "react";
import { useNavigate } from "react-router";
import { PrimaryButton } from "./Buttons";

const SubscriptionModal = ({ setShowModal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/subscription");
    setShowModal(false);
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-3xl font-bold text-primary mb-4 font-montserrat ">
          🎉 Unlock Premium Access!
        </h2>
        <p className="text-gray-600 mb-6">
          Join thousands of readers and get exclusive content, ad-free reading,
          and early access to breaking stories.
        </p>

		<PrimaryButton className="w-full text-lg"onClick={handleClick}>Subscribe Now</PrimaryButton>


        <div className="modal-action justify-center mt-6">
          <label
            className="text-sm text-gray-500 cursor-pointer underline"
            onClick={() => setShowModal(false)}
          >
            No thanks, maybe later
          </label>
        </div>
      </div>
    </dialog>
  );
};

export default SubscriptionModal;
