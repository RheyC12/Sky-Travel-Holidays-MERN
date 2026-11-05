import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/visa-applications/stats/summary").then(({ data }) => setStats(data.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const statusOrder = ["submitted", "under_review", "additional_docs_required", "approved", "rejected", "cancelled"];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link to="/admin/applications" className="btn-brand-outline !py-2 !px-4 text-sm">All Applications</Link>
            <Link to="/admin/messages" className="btn-brand-outline !py-2 !px-4 text-sm">Contact Messages</Link>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <div className="card p-5 text-center col-span-2 sm:col-span-1">
            <div className="text-2xl font-bold text-primary">{stats.total}</div>
            <div className="text-xs text-gray-500 mt-1">Total Applications</div>
          </div>
          {statusOrder.map((s) => (
            <div key={s} className="card p-5 text-center">
              <div className="text-2xl font-bold text-secondary">{stats.byStatus[s] || 0}</div>
              <div className="text-xs text-gray-500 mt-1 capitalize">{s.replace(/_/g, " ")}</div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-primary mb-4">Recent Applications</h2>
        <div className="space-y-3">
          {stats.recent.map((app) => (
            <Link to={`/admin/applications/${app._id}`} key={app._id} className="card flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-primary">{app.fullName} &middot; {app.country?.name}</p>
                <p className="text-xs text-gray-500">Ref: {app.referenceNumber}</p>
              </div>
              <StatusBadge status={app.status} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
