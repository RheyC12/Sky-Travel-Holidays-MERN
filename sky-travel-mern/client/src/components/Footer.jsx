import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-primary text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Info</h4>
          <p className="mb-2 flex gap-2"><i className="fa fa-map-marker-alt mt-1" /> Beside Megamall, 2XL Building, 4th Floor, Room 4040, Sharjah, UAE</p>
          <p className="mb-2 flex gap-2"><i className="fas fa-envelope mt-1" /> info@skytravelholidaysfz.com</p>
          <p className="mb-2 flex gap-2"><i className="fas fa-phone mt-1" /> +971 50 101 8277</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Opening Hours</h4>
          <p className="text-sm">Mon - Saturday</p>
          <p className="text-white">10:00 am - 8:00 pm</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/countries" className="hover:text-secondary">Tourist Visas</Link></li>
            <li><Link to="/countries" className="hover:text-secondary">Visa Change Trips</Link></li>
            <li><Link to="/apply" className="hover:text-secondary">Apply Online</Link></li>
            <li><Link to="/dashboard" className="hover:text-secondary">Track My Application</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-l-full px-4 py-2 text-gray-800 focus:outline-none"
            />
            <button type="submit" className="rounded-r-full bg-secondary px-4 py-2 text-white font-semibold">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Sky Travel Holidays. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
