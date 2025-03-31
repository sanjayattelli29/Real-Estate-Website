/* eslint-disable jsx-a11y/anchor-is-valid */

import { BiBuildingHouse } from "react-icons/bi";
import { FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-slate-200">
      <footer>
        <div className="flex flex-wrap gap-2 max-w-7xl mx-auto px-4">
          <div className="flex-1 basis-[10rem]">
            <Link to="/" className="flex-shrink-0 flex-align-center gap-x-1">
              <BiBuildingHouse className="text-3xl text-primary" />
              <h1 className="hidden md:block">Your Company Name</h1>
            </Link>
            <div className="mt-3">
              <p className="text-sm">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab
                harum explicabo illo, magnam vitae expedita.
              </p>
              <div className="gap-5 my-6 flex-center-center">
                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FiFacebook />
                </div>

                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FaTwitter />
                </div>

                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FaInstagram />
                </div>

                <div className="icon-box bg-dark-light hover:bg-hover-color-dark">
                  <FaWhatsapp />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold">Properties</h2>
            <ul>
              <li className="my-3 text-muted">
                <Link to="/properties">All Properties</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/properties/residential">Residential</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/properties/commercial">Commercial</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/properties/featured">Featured</Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul>
              <li className="my-3 text-muted">
                <Link to="/about">About Us</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/agents">Our Agents</Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold">Legal</h2>
            <ul>
              <li className="my-3 text-muted">
                <Link to="/terms-and-conditions">Terms & Conditions</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="my-3 text-muted">
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 basis-[10rem] text-center md:text-left">
            <h2 className="text-xl font-semibold">
              Contact us
            </h2>

            <ul>
              <li className="my-3 text-muted">
                <a href="tel:0123456789">Ph: 0123456789</a>
              </li>
              <li className="my-3 text-muted">
                <a href="mailto:sales@company.com">Email: sales@company.com</a>
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">
              Subscribe to our Newsletter
            </h2>
            <p className="text-sm text-muted">
              Subscribe to be the first one to know about updates. Enter your
              email
            </p>
            <div className="justify-center my-3 flex-align-center">
              <input
                type="text"
                className="px-4 py-[0.35rem] card-bordered dark:shadow-none outline-none bg-transparent rounded-lg border-dark"
                placeholder="Email Address.."
              />
              <button className="-ml-2 btn btn-primary">subscribe</button>
            </div>
          </div>
        </div>
      </footer>
      <div className="py-2 mt-3 text-center border-t text-muted border-dark">
        <p>
          Created By <span className="text-primary">design-with-sanjay</span> | All
          Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
