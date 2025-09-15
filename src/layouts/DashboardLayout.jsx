import { Link, NavLink, Outlet, useNavigate } from "react-router";
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
import { FiMenu, FiSun, FiX } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";

export default function DashboardLayout() {
  const { role, isLoading, error } = useUserRole();
  const { user, logOut } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  //   if (role !== "admin") {
  //     return (
  //       <div className="flex flex-col items-center justify-center min-h-screen gap-4">
  //         <Lottie
  //           animationData={animationData}
  //           loop={true}
  //           className="w-full h-96"
  //         />
  //         <p className="text-2xl font-semibold text-slate-500">
  //           You are not authorized!
  //         </p>
  //         <SecondaryLink to={"/"}>Go To Home</SecondaryLink>
  //       </div>
  //     );
  //   }

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
    <div className="flex min-h-screen bg-base-100 text-base-content font-sans">
      <header className="md:hidden flex items-center justify-between bg-primary text-base-100 px-4 py-3 fixed top-0 left-0 right-0 z-30">
        <div className="text-xl font-bold tracking-wide">
          Headliner Dashboard
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="focus:outline-none"
        >
          <FiMenu size={28} />
        </button>
      </header>

      <div
        className={`fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setDrawerOpen(false)}
      />

      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-64 bg-primary/60 text-base-100
          transform transition-transform duration-300 py-10
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        <HeadlinerLogo />

        <div className="flex items-center justify-between px-6 py-6 border-b border-base-200 md:hidden">
          <div className="text-2xl font-bold tracking-wide">
            Headliner Dashboard
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            className="focus:outline-none"
          >
            <FiX size={28} />
          </button>
        </div>

        <nav className="flex flex-col flex-grow px-4 py-6 space-y-3">
          {adminLinks
            .filter((link) => link.role.includes(role))
            .map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                end
                onClick={() => setDrawerOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                 ${
                   isActive
                     ? "bg-base-200 text-primary font-semibold"
                     : "hover:bg-secondary"
                 }`
                }
              >
                {icon}
                <span>{label}</span>
              </NavLink>
            ))}
          <button
            className="flex items-center justify-start gap-3 hover:bg-secondary py-2 rounded-lg transition-colors font-semibold px-3 hover:border-0 cursor-pointer"
            onClick={handleLogout}
          >
            <IoLogOut />
            Log Out
          </button>
        </nav>
        <div className="p-6 border-t border-base-200 text-sm text-base-100 opacity-70">
          &copy; 2025 HeadLiner
        </div>
      </aside>

      <main className="flex-grow p-6 md:p-8 bg-base-100 min-h-screen ">
        <header className="hidden md:flex justify-between items-center mb-8 border-b-2 border-base-300">
          <h1 className="text-3xl font-extrabold text-primary">Dashboard</h1>
          <div className="flex  items-center">
            <img
              className="w-15 h-15 rounded-full border-base-100 border-2"
              src={
                user?.photoURL ||
                "https://i.ibb.co/jZf74p9g/User-avatar-svg.png"
              }
              onError={(e) =>
                (e.currentTarget.src =
                  "https://i.ibb.co/jZf74p9g/User-avatar-svg.png")
              }
              alt="User"
            />
            <button
              onClick={handleThemeChange}
              className="btn btn-ghost btn-circle text-xl"
              aria-label="Toggle Theme"
            >
              {!isDark ? (
                <FaMoon className="text-yellow-400" />
              ) : (
                <FiSun className="text-indigo-500" />
              )}
            </button>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
