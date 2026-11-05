import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="py-32 text-center">
    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
    <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn-brand">Back to Home</Link>
  </div>
);

export default NotFound;
