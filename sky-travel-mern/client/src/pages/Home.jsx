import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/countries"), api.get("/testimonials")])
      .then(([c, t]) => {
        setCountries(c.data.data.slice(0, 4));
        setTestimonials(t.data.data.slice(0, 3));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: "linear-gradient(rgba(0,58,102,.75), rgba(0,58,102,.85)), url('/img/carousel-1.jpg')" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-28 text-center">
          <p className="uppercase tracking-widest text-secondary font-semibold mb-3">Better Prices, Exceptional Service</p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Explore &amp; Apply for Your Visa Here</h1>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
            We focus on client requirements with a commitment to exemplary service, handling inbound and outbound
            tourism and visa processing across the Middle East, Asia, Africa and beyond.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/apply" className="btn-brand">Start Your Application</Link>
            <Link to="/countries" className="btn-brand-outline !border-white !text-white hover:!bg-white hover:!text-primary">
              Browse Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["8+", "Destinations Covered"],
            ["15k+", "Visas Processed"],
            ["12", "Global Offices"],
            ["98%", "Client Satisfaction"],
          ].map(([stat, label]) => (
            <div key={label}>
              <div className="text-3xl font-bold text-secondary">{stat}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2 className="section-title">How Visa Processing Works</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">A simple, transparent process from application to approval.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              ["1. Choose Destination", "Pick your country and visa type from our supported destinations."],
              ["2. Submit Application", "Fill in traveler details and upload your documents online."],
              ["3. We Review", "Our team verifies your documents and processes your visa."],
              ["4. Track & Receive", "Track your status in real time and get notified on approval."],
            ].map(([title, desc]) => (
              <div key={title} className="card p-6">
                <h4 className="text-lg mb-2">{title}</h4>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <h2 className="section-title">Popular Visa Destinations</h2>
            <p className="text-gray-500">Explore our most requested countries for visa processing.</p>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {countries.map((c) => (
                <Link to={`/countries/${c.slug}`} key={c._id} className="card overflow-hidden group">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={`/img/${c.image}`}
                      alt={c.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg mb-1">{c.name}</h4>
                    <p className="text-sm text-gray-500">From {c.currency} {c.baseFee}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/countries" className="btn-brand-outline">View All Destinations</Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {!loading && testimonials.length > 0 && (
        <section className="py-20 bg-primary text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Clients Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t._id} className="bg-white/10 rounded-xl p-6">
                  <div className="flex text-secondary mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => <i key={i} className="fas fa-star" />)}
                  </div>
                  <p className="text-white/90 mb-4">&ldquo;{t.message}&rdquo;</p>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-white/60">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="section-title">Ready to Start Your Journey?</h2>
          <p className="text-gray-500 mb-8">Create a free account and submit your visa application in minutes.</p>
          <Link to="/apply" className="btn-brand">Apply for a Visa Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
