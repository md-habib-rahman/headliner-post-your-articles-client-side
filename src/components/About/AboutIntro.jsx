import React from "react";
import { motion } from "motion/react";
import { PrimaryLink } from "../Buttons";
import bgImage from "../../assets/world-map-vector-isolated-white-background.png";

const AboutIntro = () => {
  return (
    <section className="py-28 mt-19 bg-primary/90 text-base-100 relative overflow-hidden">
      <div className="absolute top-0 -z-10">
        {" "}
        <img src={bgImage} alt="" className="w-full h-full" />
      </div>
      <div className="mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          About Us
        </motion.h1>
      </div>
    </section>
  );
};
export default AboutIntro;
