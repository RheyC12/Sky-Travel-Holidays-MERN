import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/testimonials").then(({ data }) => setTestimonials(data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Client Testimonials</h1>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          {loading ? (
            <Loader />
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t._id} className="card p-6">
                  <div className="flex text-secondary mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => <i key={i} className="fas fa-star" />)}
                  </div>
                  <p className="text-gray-600 mb-4">&ldquo;{t.message}&rdquo;</p>
                  <div className="font-semibold text-primary">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.role}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
