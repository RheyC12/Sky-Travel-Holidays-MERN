import React from "react";

const Loader = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-3">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-secondary" />
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default Loader;
