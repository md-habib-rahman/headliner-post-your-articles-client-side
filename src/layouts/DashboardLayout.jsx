import { Link, Outlet } from "react-router";
import HeadlinerLogo from "../components/HeadlinerLogo";
import { adminLinks } from "../components/NavLinks";


export default function DashboardLayout() {
  //   console.log(adminLinks)
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Top Navbar */}
      <div className="bg-base-300 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
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
                <Link to={link.path}>{link.label}{link.icon}</Link>
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
