import React from "react";
import { Link } from "react-router";

export const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-xl shadow-md bg-primary text-primary-content font-semibold hover:bg-primary/90 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 rounded-xl border border-secondary text-secondary hover:bg-secondary hover:text-secondary-content font-medium transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export const PrimaryLink = ({ children, to, className = "" }) => {
  return (
    <Link
      to={to}
      className={`inline-block px-6 py-2 rounded-xl shadow-md bg-primary text-primary-content font-semibold hover:bg-primary/90 transition duration-200 ${className}`}
    >
      {children}
    </Link>
  );
};

export const SecondaryLink = ({ children, to, className = "" }) => {
  return (
    <Link
      to={to}
      className={`inline-block px-6 py-2 rounded-xl border border-secondary text-secondary hover:bg-secondary hover:text-secondary-content font-medium transition duration-200 ${className}`}
    >
      {children}
    </Link>
  );
};
