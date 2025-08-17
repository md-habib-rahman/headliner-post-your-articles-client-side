import React from "react";
import { motion } from "motion/react";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";

export const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const newMessage = {
      name,
      email,
      message,
      postDate: new Date().toLocaleString(),
    };
    const result = await axiosInstance.post("/user-message", newMessage);
    if (result.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Message sent successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
    }
  };
  return (
    <div className="px-6 md:w-2/3 lg:w-1/2">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold mb-8 text-center"
      >
        Send Us a Message
      </motion.h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block  font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            className="w-full px-4 py-3 rounded-lg border  focus:outline-none"
          />
        </div>

        <div>
          <label className="block  font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="w-full px-4 py-3 rounded-lg border  focus:outline-none"
          />
        </div>

        <div>
          <label className="block  font-medium mb-2">Message</label>
          <textarea
            rows="5"
            placeholder="Write your message..."
            name="message"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 px-6  font-semibold rounded-xl shadow-md  transition duration-300 bg-primary text-base-100 cursor-pointer"
        >
          Send Message
        </motion.button>
      </form>
    </div>
  );
};
