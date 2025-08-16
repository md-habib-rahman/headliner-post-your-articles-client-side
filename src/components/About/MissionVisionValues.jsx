import React from "react";
import { FiEye, FiHeart, FiTarget } from "react-icons/fi";
import {motion} from 'motion/react'

const items = [
  {
    icon: <FiTarget className="text-4xl text-accent" />,
    title: "Mission",
    description:
      "We try to deliver the most engaging and trustworthy news platform for readers and writers alike.",
  },
  {
    icon: <FiEye className="text-4xl text-accent" />,
    title: "Vision",
    description:
      "Be the go-to community for news discovery and sharing, connecting people worldwide.",
  },
  {
    icon: <FiHeart className="text-4xl text-accent" />,
    title: "Values",
    description:
      "Integrity, transparency, and community-driven content are at the heart of everything we do.",
  },
];

const MissionVisionValues = () => {
  return (
    <section className=" py-20">
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary font-montserrat">
          Our Mission, Vision & Values
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 bg-base-200"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-primary">
              {item.title}
            </h3>
            <p className="text-neutral">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MissionVisionValues;
