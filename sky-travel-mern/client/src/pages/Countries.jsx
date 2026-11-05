import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import Loader from "../components/Loader.jsx";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCountries = (q = "") => {
    setLoading(true);
    api
      .get("/countries", { params: q ? { search: q } : {} })
      .then(({ data }) => setCountries(data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCountries(search);
  };

  return (
    <div>
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Visa Destinations</h1>
        <form onSubmit={handleSearch} className="mx-auto max-w-md flex">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search a country..."
            className="w-full rounded-l-full px-4 py-2 text-gray-800 focus:outline-none"
          />
          <button className="rounded-r-full bg-secondary px-5 py-2 font-semibold">Search</button>
        </form>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {loading ? (
            <Loader />
          ) : countries.length === 0 ? (
            <p className="text-center text-gray-500">No destinations found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {countries.map((c) => (
                <Link to={`/countries/${c.slug}`} key={c._id} className="card overflow-hidden group">
                  <div className="h-44 overflow-hidden">
                    <img src={`/img/${c.image}`} alt={c.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg mb-1">{c.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{c.summary}</p>
                    <p className="text-sm font-semibold text-secondary">From {c.currency} {c.baseFee}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Countries;
