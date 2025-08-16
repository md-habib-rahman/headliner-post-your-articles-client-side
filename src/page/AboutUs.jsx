import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import AboutIntro from "../components/About/AboutIntro";
import { OurStory } from "../components/About/OurStory";
import MissionVisionValues from "../components/About/MissionVisionValues";
import AboutDeveloper from "../components/About/AboutDeveloper";
import Statistics from "../components/Statistics";
import AboutCTA from "../components/About/AboutCTA";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const AboutUs = () => {
  const position = [23.79597709944024, 90.36825117647867]; // 23.79597709944024, 90.36824030903901

  return (
    <>
      <AboutIntro />
      <OurStory />
      <MissionVisionValues />
      <AboutDeveloper />
      <Statistics />
	  <AboutCTA/>
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
            <div className="h-[400px] w-full rounded-lg overflow-hidden shadow">
              <MapContainer
                center={position}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    Our Company HQ <br /> Dhaka, Bangladesh.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
