import React from "react";

import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import ContactInfo from "../components/contact/contactInfo";
import AboutIntro from "../components/About/AboutIntro";
import { ContactForm } from "../components/contact/ContactForm";
import Map from "../components/contact/Map";

const ContactUs = () => {
  return (
    <>
      <AboutIntro>Contact Us</AboutIntro>
      <ContactInfo />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto py-20">
        <ContactForm />
        <Map />
      </div>
    </>
  );
};

export default ContactUs;
