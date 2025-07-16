import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";

import HeadlinerLogo from "./HeadlinerLogo";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaCrown, FaMoon, FaSun } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import {
  PrimaryButton,
  PrimaryLink,
  SecondaryButton,
  SecondaryLink,
} from "./Buttons";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import Loader from "./Loader";
import useUserRole from "../hooks/useUserRole";
import { navLinks } from "./NavLinks";
import useSubscriptionStatus from "../hooks/useSubscriptionStatus";

const Navbar = () => {
  const { user, loading, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { role, isLoading, error } = useUserRole();
  //   const {
  //     subscription,
  //     error: subError,
  //     isLoading: subLoading,
  //   } = useSubscriptionStatus();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  console.log(role);
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

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have been loged out!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  //   const userRole = userRole ? (userRole ? 'admin' : 'user') : 'guest';
  //   const userRole = "guest";
  //   if (loading) {
  //     return <Loader />;
  //   }
  return (
    <div className="w-full z-50 backdrop-blur-lg bg-base-100/60 border-b border-base-300 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <HeadlinerLogo theme={isDark} />

        <div className="hidden md:flex space-x-6 items-center">
          {navLinks
            .filter((link) => link.roles.includes(role))
            .map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `${
                    link.label === "Subscription"
                      ? "bg-secondary px-4 rounded-2xl py-1 flex items-center gap-2 text-white "
                      : ""
                  }${
                    isActive
                      ? "text-primary font-semibold"
                      : "hover:text-primary"
                  }`
                }
              >
                {link.label}
                {link.label === "Subscription" && <FaCrown />}
              </NavLink>
            ))}
          {user ? (
            <div className="dropdown dropdown-right dropdown-center ">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hover:scale-110 transition-transform duration-200"
              >
                <div className="w-8 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/jZf74p9g/User-avatar-svg.png"
                    }
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://i.ibb.co/jZf74p9g/User-avatar-svg.png")
                    }
                    // src={
                    //   user?.photoURL
                    //     ? user?.photoURL
                    //     : "https://i.ibb.co/jZf74p9g/User-avatar-svg.png"
                    // }
                    alt="User"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow-sm rounded-box fixed w-52  bg-base-100  z-50"
              >
                <li>
                  <Link
                    to="user-profile"
                    className="justify-between text-md bg-secondary/60 mb-1.5 hover:scale-102 transition-all"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-md bg-secondary/60 hover:scale-102 transition-all"
                  >
                    Logout
                  </button>
                </li>
              </ul>
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
            .filter((link) => link.roles.includes(role))
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
