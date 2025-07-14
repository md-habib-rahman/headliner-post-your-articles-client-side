import {
  FaRegNewspaper,
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

export const navLinks = [
  { path: "/", label: "Home", roles: ["guest", "user", "admin", "premium"] },
  {
    path: "/all-articles",
    label: "All Articles",
    roles: ["user", "admin", "guest", "premium"],
  },
  {
    path: "/add-articles",
    label: "Add Articles",
    roles: ["user", "admin", "premium"],
  },
  {
    path: "/my-articles",
    label: "My Articles",
    roles: ["user", "admin", "premium"],
  },
  { path: "/premium-articles", label: "Premium Articles", roles: ["premium"] },
  { path: "/dashboard", label: "Dashboard", roles: ["admin"] },
  {
    path: "/subscription",
    label: "Subscription",
    roles: ["user", "admin", "guest"],
  },
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
