import React from "react";
import { Link } from "react-router-dom";

const services = [
  { icon: "fa-passport", title: "Tourist Visa Processing", desc: "End-to-end tourist visa applications for dozens of destinations." },
  { icon: "fa-briefcase", title: "Business Visa Support", desc: "Fast-tracked business visa processing with document guidance." },
  { icon: "fa-route", title: "Visa Change Trips", desc: "Overland and cross-border visa-change packages, including guided trips." },
  { icon: "fa-file-alt", title: "Document Verification", desc: "We review every document before submission to reduce rejection risk." },
  { icon: "fa-bell", title: "Status Tracking", desc: "Track every application in real time from your dashboard." },
  { icon: "fa-headset", title: "24/7 Support", desc: "Our team is on hand across our global office network." },
];

const Services = () => (
  <div>
    <section className="bg-primary text-white py-16 text-center">
      <h1 className="text-4xl font-bold">Our Services</h1>
    </section>
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s) => (
          <div key={s.title} className="card p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary text-2xl">
              <i className={`fas ${s.icon}`} />
            </div>
            <h4 className="text-lg mb-2">{s.title}</h4>
            <p className="text-gray-500 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/apply" className="btn-brand">Get Started</Link>
      </div>
    </section>
  </div>
);

export default Services;
