import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiFacebookCircleFill } from "react-icons/ri";
import { Link } from "react-router";
import HeadlinerLogo from "./HeadlinerLogo";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <HeadlinerLogo />
          <p className="text-sm leading-relaxed">
            Stay informed. Stay ahead. Your trusted source for the latest news
            and stories.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Navigation</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-articles" className="hover:text-primary">
                All Articles
              </Link>
            </li>
            <li>
              <Link to="premium-articles" className="hover:text-primary">
                Premium Articles
              </Link>
            </li>
            <li>
              <Link to="/subscription" className="hover:text-primary">
                Subscription
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about-us" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <Link
              href="#"
              className="hover:text-primary hover:scale-105 transition-transform duration-75"
            >
              <FaFacebookF />
            </Link>
            <a
              href="#"
              className="hover:text-primary hover:scale-105 transition-transform duration-200"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="hover:text-primary hover:scale-105 transition-transform duration-200"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-primary hover:scale-105 transition-transform duration-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 mt-8 text-center py-4 text-sm">
        © {new Date().getFullYear()} Headliner. All rights reserved.
      </div>
    </footer>
  );
}
