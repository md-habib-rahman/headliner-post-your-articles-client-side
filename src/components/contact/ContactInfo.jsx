import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { motion } from "motion/react";

const contactItems = [
  {
    id: 1,
    icon: <FiMapPin className="text-3xl text-secondary" />,
    title: "Our Location",
    info: "Dhaka-1216, Bangladesh",
  },
  {
    id: 2,
    icon: <FiMail className="text-3xl text-secondary" />,
    title: "Email Us",
    info: "habib.rahman@live.com",
  },
  {
    id: 3,
    icon: <FiPhone className="text-3xl text-secondary" />,
    title: "Call Us",
    info: "+880 1715 983652",
  },
];

const ContactInfo = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="grid md:grid-cols-3 gap-8">
          {contactItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className=" p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-base-300"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold  mb-2">{item.title}</h3>
              <p className="">{item.info}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
