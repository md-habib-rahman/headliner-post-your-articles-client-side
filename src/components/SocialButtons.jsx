import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialButtons = ({ handleGoogleSignIn }) => {
  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn btn-secondary btn-outline w-full rounded-xl shadow-xl"
    >
      {/* <FcGoogle size={24} /> */}
      <FaGoogle size={24} />
      Login with Google
    </button>
  );
};

export default SocialButtons;
