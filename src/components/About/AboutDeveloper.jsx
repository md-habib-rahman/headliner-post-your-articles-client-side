import React from "react";
import { FiExternalLink, FiGithub, FiGlobe, FiLinkedin } from "react-icons/fi";
import { motion } from "motion/react";
import developerImage from "../../assets/md habib rahman.JPG";

const AboutDeveloper = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-primary">
          Meet Our Developer
        </h2>
        <p className="text-neutral mt-2">
          The fullstack developer who built this platform from scratch.
        </p>
      </div>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="bg-neutral/70 rounded-2xl p-8 shadow-lg max-w-xs text-center"
        >
          <img
            src={developerImage}
            alt="Developer"
            className="w-64 h-64 mx-auto rounded-full mb-4 object-cover"
          />
          <h3 className="text-2xl font-bold text-base-100 mb-1">
            Md Habibur Rahman
          </h3>
          <p className="font-medium mb-4 text-accent">Fullstack Developer</p>
          <p className="text-neutral-content mb-4">
            Built this entire platform from scratch, handling both frontend and
            backend development, ensuring a seamless experience for all users.
          </p>
          <div className="flex justify-center gap-4 text-accent  text-2xl">
            <a
              href="https://github.com/md-habib-rahman/"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/habibur-rahman-md/"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin />
            </a>
            <a
              href="https://mdhabibrahman.com"
              target="_blank"
              rel="noreferrer"
            >
              <FiGlobe />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutDeveloper;
