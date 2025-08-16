import React from "react";
import { motion } from "motion/react";
import Lottie from "lottie-react";
import newsAnimation from "../../assets/Website Design Lottie Animation.json";

export const OurStory = () => {
  return (
    <section className="py-20">
      <div className="mx-auto px-6 grid md:grid-cols-2 gap-12 items-center max-w-7xl">
       
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat text-primary">
            Our Story
          </h2>
          <p className="text-lg mb-4 leading-relaxed">
            Every story deserves to be heard. Our journey started with a mission
            to create a platform where people can share, discover, and engage
            with news that matters to them.
          </p>
          <p className="text-lg leading-relaxed">
            From breaking headlines to inspiring human stories, we believe in
            building a community where information flows freely, empowering
            readers and writers alike.
          </p>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Lottie
            animationData={newsAnimation}
            loop={true}
            className="w-full max-w-md"
          />
        </motion.div>
      </div>
    </section>
  );
};
