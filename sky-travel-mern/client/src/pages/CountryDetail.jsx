import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const CountryDetail = () => {
  const { slug } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/countries/${slug}`)
      .then(({ data }) => setCountry(data.data))
      .catch(() => setError("This destination could not be found."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader />;
  if (error || !country) {
    return <p className="text-center py-24 text-gray-500">{error || "Destination not found."}</p>;
  }

  return (
    <div>
      <div className="h-72 bg-cover bg-center relative" style={{ backgroundImage: `url('/img/${country.image}')` }}>
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{country.name}</h1>
        </div>
      </div>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="section-title">Overview</h2>
            <p className="text-gray-600 mb-6">{country.summary}</p>

            <h3 className="text-xl font-semibold text-primary mb-3">Visa Types Offered</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {country.visaTypesOffered?.map((v) => (
                <span key={v} className="rounded-full bg-secondary/10 text-secondary px-4 py-1.5 text-sm font-medium">{v}</span>
              ))}
            </div>

            <h3 className="text-xl font-semibold text-primary mb-3">Required Documents</h3>
            <ul className="space-y-2">
              {country.requiredDocuments?.map((d) => (
                <li key={d} className="flex items-center gap-2 text-gray-600">
                  <i className="fas fa-check-circle text-secondary" /> {d}
                </li>
              ))}
            </ul>
          </div>

          <aside className="card p-6 h-fit">
            <h4 className="text-lg mb-4">Application Summary</h4>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Processing Time</dt><dd className="font-medium">{country.processingTimeDays} days</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Base Fee</dt><dd className="font-medium">{country.currency} {country.baseFee}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Region</dt><dd className="font-medium">{country.region}</dd></div>
            </dl>
            <Link
              to={isAuthenticated ? `/apply?country=${country._id}` : "/login"}
              className="btn-brand w-full mt-6"
            >
              Apply for This Visa
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default CountryDetail;
