import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Countries from "./pages/Countries.jsx";
import CountryDetail from "./pages/CountryDetail.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ApplyVisa from "./pages/ApplyVisa.jsx";
import NotFound from "./pages/NotFound.jsx";

import DashboardHome from "./pages/dashboard/DashboardHome.jsx";
import ApplicationDetail from "./pages/dashboard/ApplicationDetail.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminApplications from "./pages/admin/AdminApplications.jsx";
import AdminApplicationDetail from "./pages/admin/AdminApplicationDetail.jsx";
import AdminMessages from "./pages/admin/AdminMessages.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:slug" element={<CountryDetail />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/apply"
          element={
            <ProtectedRoute>
              <ApplyVisa />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/applications/:id"
          element={
            <ProtectedRoute>
              <ApplicationDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute adminOnly>
              <AdminApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applications/:id"
          element={
            <ProtectedRoute adminOnly>
              <AdminApplicationDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute adminOnly>
              <AdminMessages />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
