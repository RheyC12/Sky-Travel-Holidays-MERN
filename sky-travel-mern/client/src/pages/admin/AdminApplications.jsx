import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";

const STATUS_OPTIONS = [
  "", "submitted", "under_review", "additional_docs_required", "approved", "rejected", "cancelled",
];

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api
      .get("/visa-applications", { params: { status: status || undefined, search: search || undefined, page } })
      .then(({ data }) => {
        setApplications(data.data);
        setTotal(data.total);
        setPages(data.pages);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [status, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-2xl font-bold text-primary mb-6">All Applications ({total})</h1>

        <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-6">
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, reference, passport #"
            className="input-field max-w-xs"
          />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="input-field max-w-[220px]">
            <option value="">All statuses</option>
            {STATUS_OPTIONS.filter(Boolean).map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </select>
          <button type="submit" className="btn-brand-outline !py-2 !px-4">Search</button>
        </form>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="overflow-x-auto card">
              <table className="w-full text-sm">
                <thead className="bg-primary/5 text-left text-gray-500">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Applicant</th>
                    <th className="p-4">Country</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id} className="border-t hover:bg-gray-50 cursor-pointer">
                      <td className="p-4">
                        <Link to={`/admin/applications/${app._id}`} className="text-secondary font-medium">{app.referenceNumber}</Link>
                      </td>
                      <td className="p-4">{app.fullName}<br /><span className="text-xs text-gray-400">{app.applicant?.email}</span></td>
                      <td className="p-4">{app.country?.name}</td>
                      <td className="p-4"><StatusBadge status={app.status} /></td>
                      <td className="p-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr><td colSpan={5} className="p-8 text-center text-gray-400">No applications match these filters.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {pages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`h-9 w-9 rounded-full text-sm ${page === i + 1 ? "bg-secondary text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
