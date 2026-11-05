import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";

const ApplicationDetail = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const load = () => {
    api.get(`/visa-applications/${id}`).then(({ data }) => setApplication(data.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Cancel this application? This cannot be undone.")) return;
    setCancelling(true);
    try {
      await api.put(`/visa-applications/${id}/cancel`);
      toast.success("Application cancelled");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <Loader />;
  if (!application) return <p className="text-center py-24 text-gray-500">Application not found.</p>;

  const canCancel = ["submitted", "under_review", "additional_docs_required"].includes(application.status);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-6">
        <Link to="/dashboard" className="text-sm text-secondary mb-4 inline-block">&larr; Back to My Applications</Link>

        <div className="card p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-primary">{application.country?.name} &middot; {application.visaType}</h1>
              <p className="text-sm text-gray-500">Reference: {application.referenceNumber}</p>
            </div>
            <StatusBadge status={application.status} />
          </div>

          <dl className="grid sm:grid-cols-2 gap-4 text-sm mt-6">
            <div><dt className="text-gray-400">Full Name</dt><dd className="font-medium">{application.fullName}</dd></div>
            <div><dt className="text-gray-400">Passport Number</dt><dd className="font-medium">{application.passportNumber}</dd></div>
            <div><dt className="text-gray-400">Nationality</dt><dd className="font-medium">{application.nationality}</dd></div>
            <div><dt className="text-gray-400">Submitted On</dt><dd className="font-medium">{new Date(application.createdAt).toLocaleDateString()}</dd></div>
            <div><dt className="text-gray-400">Intended Travel Date</dt><dd className="font-medium">{application.intendedTravelDate ? new Date(application.intendedTravelDate).toLocaleDateString() : "—"}</dd></div>
            <div><dt className="text-gray-400">Fee</dt><dd className="font-medium">AED {application.fee}</dd></div>
          </dl>

          {application.adminNotes && (
            <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
              <b>Note from our team:</b> {application.adminNotes}
            </div>
          )}

          {canCancel && (
            <button onClick={handleCancel} disabled={cancelling} className="mt-6 text-sm text-red-600 hover:underline">
              {cancelling ? "Cancelling..." : "Cancel this application"}
            </button>
          )}
        </div>

        <div className="card p-8 mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Documents</h3>
          {application.documents?.length === 0 ? (
            <p className="text-gray-500 text-sm">No documents uploaded.</p>
          ) : (
            <ul className="space-y-2">
              {application.documents.map((doc, i) => (
                <li key={i} className="flex items-center justify-between text-sm border-b py-2">
                  <span>{doc.label} &middot; {doc.fileName}</span>
                  <a href={`/${doc.filePath}`} target="_blank" rel="noreferrer" className="text-secondary hover:underline">View</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-8">
          <h3 className="text-lg font-semibold text-primary mb-4">Status History</h3>
          <ol className="border-l-2 border-secondary/30 pl-4 space-y-4">
            {application.statusHistory?.slice().reverse().map((h, i) => (
              <li key={i}>
                <p className="text-sm font-semibold text-primary">{h.status.replace(/_/g, " ")}</p>
                <p className="text-xs text-gray-400">{new Date(h.changedAt).toLocaleString()}</p>
                {h.note && <p className="text-sm text-gray-600 mt-1">{h.note}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
