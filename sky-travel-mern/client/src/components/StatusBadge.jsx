import React from "react";

const STYLES = {
  submitted: "bg-blue-100 text-blue-700",
  under_review: "bg-amber-100 text-amber-700",
  additional_docs_required: "bg-orange-100 text-orange-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  cancelled: "bg-gray-200 text-gray-600",
};

const StatusBadge = ({ status }) => (
  <span className={`status-badge ${STYLES[status] || "bg-gray-100 text-gray-600"}`}>
    {status?.replace(/_/g, " ")}
  </span>
);

export default StatusBadge;
