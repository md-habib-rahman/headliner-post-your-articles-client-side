import React from "react";
import { Link } from "react-router";
import logo from "../assets/head liner logo for light.png";
import logo1 from "../assets/head liner logo for dark.png";

const HeadlinerLogo = ({ theme }) => {
  return (
    <Link>
      <img
        src={theme ? logo1 : logo}
        alt="Headliner Logo"
        className="w-35 md:w-50"
      />
    </Link>
  );
};

export default HeadlinerLogo;
