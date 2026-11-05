import React from "react";

const About = () => (
  <div>
    <section className="bg-primary text-white py-16 text-center">
      <h1 className="text-4xl font-bold">About Sky Travel Holidays</h1>
      <p className="text-white/70 mt-2">Better prices, exceptional service</p>
    </section>
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <img src="/img/about-3.jpg" alt="Our office" className="rounded-xl shadow-md w-full" />
        <div>
          <h2 className="section-title">Who We Are</h2>
          <p className="text-gray-600 mb-4">
            Sky Travel Holidays focuses on client requirements with a commitment to exemplary service and total
            satisfaction. Our core business is the marketing and distribution of inbound and outbound tourism
            packages, and end-to-end visa processing, to leading destinations across the Middle East, Asia, Africa
            and beyond.
          </p>
          <p className="text-gray-600 mb-6">
            From tourist visas to overland visa-change trips, our team handles the paperwork so you can focus on
            the journey.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {["Licensed & Trusted", "Fast Turnaround", "Transparent Pricing", "Real-time Tracking"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-primary font-medium">
                <i className="fas fa-check-circle text-secondary" /> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
