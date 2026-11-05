import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios.js";
import Loader from "../../components/Loader.jsx";
import StatusBadge from "../../components/StatusBadge.jsx";

const STATUS_OPTIONS = ["submitted", "under_review", "additional_docs_required", "approved", "rejected", "cancelled"];

const AdminApplicationDetail = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get(`/visa-applications/${id}`).then(({ data }) => {
      setApplication(data.data);
      setStatus(data.data.status);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [id]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await api.put(`/visa-applications/${id}/status`, { status, note });
      toast.success("Application updated");
      setNote("");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!application) return <p className="text-center py-24 text-gray-500">Application not found.</p>;

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-6">
        <Link to="/admin/applications" className="text-sm text-secondary mb-4 inline-block">&larr; Back to All Applications</Link>

        <div className="card p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-primary">{application.fullName}</h1>
              <p className="text-sm text-gray-500">Ref: {application.referenceNumber} &middot; {application.country?.name} &middot; {application.visaType}</p>
            </div>
            <StatusBadge status={application.status} />
          </div>

          <dl className="grid sm:grid-cols-2 gap-4 text-sm mt-6">
            <div><dt className="text-gray-400">Applicant Account</dt><dd className="font-medium">{application.applicant?.name} ({application.applicant?.email})</dd></div>
            <div><dt className="text-gray-400">Passport Number</dt><dd className="font-medium">{application.passportNumber}</dd></div>
            <div><dt className="text-gray-400">Nationality</dt><dd className="font-medium">{application.nationality}</dd></div>
            <div><dt className="text-gray-400">Date of Birth</dt><dd className="font-medium">{new Date(application.dateOfBirth).toLocaleDateString()}</dd></div>
            <div><dt className="text-gray-400">Passport Expiry</dt><dd className="font-medium">{new Date(application.passportExpiry).toLocaleDateString()}</dd></div>
            <div><dt className="text-gray-400">Contact</dt><dd className="font-medium">{application.email} / {application.phone}</dd></div>
            <div><dt className="text-gray-400">Purpose of Travel</dt><dd className="font-medium">{application.purposeOfTravel || "—"}</dd></div>
            <div><dt className="text-gray-400">Fee</dt><dd className="font-medium">AED {application.fee} &middot; {application.paymentStatus}</dd></div>
          </dl>
        </div>

        <div className="card p-8 mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Documents</h3>
          {application.documents?.length === 0 ? (
            <p className="text-gray-500 text-sm">No documents uploaded yet.</p>
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

        <div className="card p-8 mb-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Update Status</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field">
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
            </select>
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note to applicant (optional)" className="input-field" />
          </div>
          <button onClick={handleUpdate} disabled={saving} className="btn-brand mt-4">
            {saving ? "Saving..." : "Update Application"}
          </button>
        </div>

        <div className="card p-8">
          <h3 className="text-lg font-semibold text-primary mb-4">Status History</h3>
          <ol className="border-l-2 border-secondary/30 pl-4 space-y-4">
            {application.statusHistory?.slice().reverse().map((h, i) => (
              <li key={i}>
                <p className="text-sm font-semibold text-primary">{h.status.replace(/_/g, " ")}</p>
                <p className="text-xs text-gray-400">{new Date(h.changedAt).toLocaleString()} {h.changedBy?.name ? `by ${h.changedBy.name}` : ""}</p>
                {h.note && <p className="text-sm text-gray-600 mt-1">{h.note}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicationDetail;
