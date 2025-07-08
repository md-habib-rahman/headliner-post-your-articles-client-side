import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { navLinks } from "./NavLinks";
import HeadlinerLogo from "./HeadlinerLogo";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import {
  PrimaryButton,
  PrimaryLink,
  SecondaryButton,
  SecondaryLink,
} from "./Buttons";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const handleThemeChange = () => {
    setIsDark(!isDark);
  };

  //   const userRole = userRole ? (userRole ? 'admin' : 'user') : 'guest';
  const userRole = "guest";
  //   const navLinks = (
  //     <>
  //       <NavLink
  //         to="/"
  //         className={({ isActive }) =>
  //           isActive
  //             ? "block text-primary font-semibold border-b-2"
  //             : "block hover:text-primary"
  //         }
  //       >
  //         Home{" "}
  //       </NavLink>
  //       <NavLink
  //         to="/add-articles"
  //         className={({ isActive }) =>
  //           isActive
  //             ? "block text-primary font-semibold"
  //             : "block hover:text-primary"
  //         }
  //       >
  //         Add Articles{" "}
  //       </NavLink> <NavLink
  //         to="/add-articles"
  //         className={({ isActive }) =>
  //           isActive
  //             ? "block text-primary font-semibold"
  //             : "block hover:text-primary"
  //         }
  //       >
  //         Add Articles{" "}
  //       </NavLink> <NavLink
  //         to="/add-articles"
  //         className={({ isActive }) =>
  //           isActive
  //             ? "block text-primary font-semibold"
  //             : "block hover:text-primary"
  //         }
  //       >
  //         Add Articles{" "}
  //       </NavLink> <NavLink
  //         to="/add-articles"
  //         className={({ isActive }) =>
  //           isActive
  //             ? "block text-primary font-semibold"
  //             : "block hover:text-primary"
  //         }
  //       >
  //         Add Articles{" "}
  //       </NavLink> <NavLink
  //         to="/add-articles"
  //         className={({ isActive }) =>
  //           isActive
  //             ? "block text-primary font-semibold"
  //             : "block hover:text-primary"
  //         }
  //       >
  //         Add Articles{" "}
  //       </NavLink> <NavLink
  //         to="/add-articles"
  //         className={({ isActive }) =>
  //           isActive
  //             ? "block text-primary font-semibold"
  //             : "block hover:text-primary"
  //         }
  //       >
  //         Add Articles{" "}
  //       </NavLink>
  //     </>
  //   );
  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-base-100/60 border-b border-base-300 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <HeadlinerLogo theme={isDark} />

        <div className="hidden md:flex space-x-6 items-center">
          {navLinks
            .filter((link) => link.roles.includes(userRole))
            .map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "hover:text-primary"
                }
              >
                {link.label}
              </NavLink>
            ))}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
                  <img
                    src="https://i.ibb.co/ZYW3VTp/brown-brim.png"
                    alt="User"
                  />
                </div>
              </label>
            </div>
          ) : (
            <>
              {" "}
              <PrimaryLink to="/auth/login">Login</PrimaryLink>
              <SecondaryLink to="/auth/registration">Register</SecondaryLink>
            </>
          )}

          <button
            onClick={handleThemeChange}
            className="btn btn-ghost btn-circle text-xl"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <FaMoon className="text-yellow-400" />
            ) : (
              <FiSun className="text-indigo-500" />
            )}
          </button>

          {/* <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="dark" />
            <svg
              className="swap-on fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64 17.66A9 9 0 0112 3v0a9 9 0 010 18v0a9 9 0 01-6.36-2.34z" />
            </svg>
            <svg
              className="swap-off fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2a1 1 0 011 1v2a1 1 0 01-2 0V3a1 1 0 011-1zm5.657 3.343a1 1 0 011.414 0l1.414 1.414a1 1 0 01-1.414 1.414L17.657 6.757a1 1 0 010-1.414zM21 11h-2a1 1 0 110-2h2a1 1 0 110 2zm-9 9a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-7.657-1.343a1 1 0 000-1.414L3.93 15.828a1 1 0 011.414-1.414l1.414 1.414a1 1 0 000 1.414zM4 11H2a1 1 0 110-2h2a1 1 0 110 2zm1.343-6.657a1 1 0 000 1.414L6.757 6.757a1 1 0 101.414-1.414L6.757 3.93a1 1 0 00-1.414 0z" />
            </svg>
          </label> */}
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-primary focus:outline-none"
          >
            {isMenuOpen ? <IoClose size={35} /> : <HiOutlineMenu size={35} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-base-100/80 backdrop-blur-lg p-4 space-y-3 flex flex-col mx-4">
          {navLinks
            .filter((link) => link.roles.includes(userRole))
            .map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold border-b-1 border-primary/30"
                    : "hover:text-primary border-b-1 border-primary/30"
                }
              >
                {link.label}
              </NavLink>
            ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
