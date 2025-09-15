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
    </>
  );
};

export default AboutUs;
