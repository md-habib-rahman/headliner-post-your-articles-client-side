import {
  FaRegNewspaper,
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

export const navLinks = [
  { path: "/", label: "Home", roles: ["guest", "user", "admin", "premium"] },
  {
    path: "/add-articles",
    label: "Add Articles",
    roles: ["user", "admin", "premium"],
  },

  {
    path: "/all-articles",
    label: "All Articles",
    roles: ["user", "admin", "guest", "premium"],
  },
  {
    path: "/subscription",
    label: "Subscription",
    roles: ["user", "admin", "guest"],
  },
  { path: "/dashboard", label: "Dashboard", roles: ["admin"] },
  {
    path: "/my-articles",
    label: "My Articles",
    roles: ["user", "admin", "premium"],
  },
  { path: "/premium-articles", label: "Premium Articles", roles: ["premium"] },
];

export const adminLinks = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/dashboard/all-users", label: "All Users", icon: <FaUsers /> },
  {
    path: "/dashboard/all-articles",
    label: "All Articles",
    icon: <FaRegNewspaper />,
  },
  {
    path: "/dashboard/add-publisher",
    label: "Add Publisher",
    icon: <FaUserPlus />,
  },
];
