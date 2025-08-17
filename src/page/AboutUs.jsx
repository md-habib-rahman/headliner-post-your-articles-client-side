import React from "react";

import "leaflet/dist/leaflet.css";
import AboutIntro from "../components/About/AboutIntro";
import { OurStory } from "../components/About/OurStory";
import MissionVisionValues from "../components/About/MissionVisionValues";
import AboutDeveloper from "../components/About/AboutDeveloper";
import Statistics from "../components/Statistics";
import AboutCTA from "../components/About/AboutCTA";



const AboutUs = () => {
 // 23.79597709944024, 90.36824030903901

  return (
    <>
      <AboutIntro>About Us</AboutIntro>
      <OurStory />
      <MissionVisionValues />
      <AboutDeveloper />
      <Statistics />
      <AboutCTA />
      <div className="min-h-screen bg-gray-100 p-8 ">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 mb-6">
            Welcome to Headliner, your trusted source for accurate, timely, and
            insightful news. We are an independent digital news platform
            committed to delivering stories that matter — from breaking
            headlines and investigative journalism to features on politics,
            society, education, health, and beyond.
          </p>

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Our Location
            </h2>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
