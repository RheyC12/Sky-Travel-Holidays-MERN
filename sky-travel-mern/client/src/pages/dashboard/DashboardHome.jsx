import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const DashboardHome = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/visa-applications/mine").then(({ data }) => setApplications(data.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">My Applications</h1>
            <p className="text-gray-500 text-sm">Welcome back, {user?.name}.</p>
          </div>
          <Link to="/apply" className="btn-brand">New Application</Link>
        </div>

        {loading ? (
          <Loader />
        ) : applications.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-gray-500 mb-4">You haven't submitted any visa applications yet.</p>
            <Link to="/apply" className="btn-brand">Apply for a Visa</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <Link
                to={`/dashboard/applications/${app._id}`}
                key={app._id}
                className="card flex items-center justify-between p-5"
              >
                <div>
                  <p className="font-semibold text-primary">{app.country?.name} &middot; {app.visaType}</p>
                  <p className="text-sm text-gray-500">Ref: {app.referenceNumber} &middot; Submitted {new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <StatusBadge status={app.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
