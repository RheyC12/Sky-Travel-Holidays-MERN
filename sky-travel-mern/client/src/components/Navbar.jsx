import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 font-medium transition hover:text-secondary ${isActive ? "text-secondary" : "text-primary"}`;

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-primary text-white text-sm hidden md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex gap-6">
            <a href="mailto:info@skytravelholidaysfz.com" className="hover:text-secondary">
              <i className="fas fa-envelope mr-2" />info@skytravelholidaysfz.com
            </a>
            <a href="tel:+9716921007" className="hover:text-secondary">
              <i className="fas fa-phone-alt mr-2" />+971 6 921 007
            </a>
          </div>
          <div className="flex gap-3 text-white/80">
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram" /></a>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/img/Sky Travel Logo.png" alt="Sky Travel Holidays" className="h-10 w-auto" />
          <span className="text-xl font-heading font-bold text-primary">Sky Travel Holidays</span>
        </Link>

        <button
          className="md:hidden text-primary text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars" />
        </button>

        <div className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent border-t md:border-0 px-6 md:px-0 py-4 md:py-0`}>
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/countries" className={navLinkClass}>Visa Destinations</NavLink>
          <NavLink to="/testimonials" className={navLinkClass}>Testimonials</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 md:ml-3">
              <NavLink
                to={isAdmin ? "/admin" : "/dashboard"}
                className="btn-brand-outline !py-2 !px-4 text-sm"
              >
                {isAdmin ? "Admin Panel" : "My Applications"}
              </NavLink>
              <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-secondary ml-2">
                Sign out ({user?.name?.split(" ")[0]})
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 md:ml-3">
              <Link to="/login" className="px-3 py-2 font-medium text-primary hover:text-secondary">Sign in</Link>
              <Link to="/apply" className="btn-brand !py-2 !px-4 text-sm">Apply for Visa</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
