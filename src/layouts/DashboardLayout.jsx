import { Link, Outlet, useNavigate } from "react-router";
import HeadlinerLogo from "../components/HeadlinerLogo";
import { adminLinks } from "../components/NavLinks";
import useUserRole from "../hooks/useUserRole";
import ErrorPage from "../page/ErrorPage";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Authenticate.json";
import { SecondaryLink } from "../components/Buttons";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

export default function DashboardLayout() {
  const { role, isLoading, error } = useUserRole();
  const { user, logOut } = useAuth();
  const [isDark, setIsDark] = useState(false);
  //   const navigate = useNavigate();
  //   console.log(adminLinks)
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  useEffect(() => {
    document.title = "HeadLiner | Dashboard";
  }, []);

  if (role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-full h-96"
        />
        <p className="text-2xl font-semibold text-slate-500">
          You are not authorized!
        </p>
        <SecondaryLink to={"/"}>Go To Home</SecondaryLink>
      </div>
    );
  }

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
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Top Navbar */}
      <div className="bg-base-300 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4 justify-between w-full">
            <div className="lg:hidden">
              <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <HeadlinerLogo />
            <div className="flex items-center gap-6">
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
                  <SecondaryLink to="/auth/registration">
                    Register
                  </SecondaryLink>
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
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar (shown always on large screens) */}
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle hidden"
        />

        <div className="hidden lg:block bg-base-200 rounded-lg p-4 h-fit">
          <ul className="menu text-base-content space-y-2">
            {adminLinks.map((link, idx) => (
              <li key={idx} className="border-b-1 border-base-300">
                <Link to={link.path}>
                  {link.label}
                  {link.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar drawer for small screens */}
        <div className="drawer-side lg:hidden">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
            {adminLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
