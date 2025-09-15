import {
  FaRegNewspaper,
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { ImProfile } from "react-icons/im";
import { TbArticle } from "react-icons/tb";
import { RiArticleLine } from "react-icons/ri";

export const navLinks = [
  { path: "/", label: "Home", roles: ["guest", "user", "admin", "premium"] },
  {
    path: "/all-articles",
    label: "All Articles",
    roles: ["user", "admin", "guest", "premium"],
  },

  { path: "/premium-articles", label: "Premium Articles", roles: ["premium"] },
  { path: "/dashboard", label: "Dashboard", roles: ["user", "admin"] },
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
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <FaTachometerAlt />,
    role: ["admin"],
  },
  {
    path: "user-profile",
    label: "User Profile",
    icon: <ImProfile />,
    role: ["user", "admin"],
  },
  {
    path: "all-users",
    label: "All Users",
    icon: <FaUsers />,
    role: ["admin"],
  },
  {
    path: "add-articles",
    label: "Add Articles",
    icon: <TbArticle />,
    role: ["admin", "user"],
  },
  {
    path: "my-articles",
    label: "My Articles",
    icon: <RiArticleLine />,
    role: ["admin", "user"],
  },
  {
    path: "all-articles",
    label: "All Articles",
    icon: <FaRegNewspaper />,
    role: ["admin"],
  },
  {
    path: "/dashboard/add-publisher",
    label: "Add Publisher",
    icon: <FaUserPlus />,
    role: ["admin"],
  },
  {
    path: "/dashboard/visitor-messages",
    label: "Visitor Message",
    icon: <TiMessages />,
    role: ["admin"],
  },
];
