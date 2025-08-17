import {
  FaRegNewspaper,
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { ImProfile } from "react-icons/im";

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
    path: "/about-us",
    label: "About Us",
    roles: ["user", "admin", "guest", "premium"],
  },
  {
    path: "/subscription",
    label: "Subscription",
    roles: ["user", "admin", "premium"],
  },
];

export const adminLinks = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "user-profile", label: "User Profile", icon: <ImProfile /> },
  { path: "all-users", label: "All Users", icon: <FaUsers /> },
  {
    path: "all-articles",
    label: "All Articles",
    icon: <FaRegNewspaper />,
  },
  {
    path: "/dashboard/add-publisher",
    label: "Add Publisher",
    icon: <FaUserPlus />,
  },
  {
    path: "/dashboard/visitor-messages",
    label: "Visitor Message",
    icon: <TiMessages />,
  },
];
