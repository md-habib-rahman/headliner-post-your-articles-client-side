import React from "react";
import { motion } from "motion/react";
import { PrimaryLink } from "../Buttons";
import ctaBg from "../../assets/set-white-computer-keyboards-with-word-bottom.png";

const AboutCTA = () => {
  return (
    <section className="bg-primary/60 py-20 relative">
      <div className="absolute top-0 left-0 w-full h-80 -z-10">
        <img src={ctaBg} alt="" className="w-full h-full object-cover"/>
      </div>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Join Our Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
          className="text-lg md:text-xl mb-8"
        >
          Share your stories, discover breaking news, and connect with readers
          around the world.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
        >
          <PrimaryLink to="/auth/registration" className="text-lg">
            Get Started
          </PrimaryLink>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
