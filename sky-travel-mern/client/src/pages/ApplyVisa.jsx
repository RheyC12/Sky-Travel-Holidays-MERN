import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/Loader.jsx";

const STEPS = ["Destination", "Traveler Details", "Travel Info", "Review & Submit"];

const emptyForm = {
  country: "",
  visaType: "",
  fullName: "",
  passportNumber: "",
  passportExpiry: "",
  dateOfBirth: "",
  nationality: "",
  email: "",
  phone: "",
  intendedTravelDate: "",
  durationOfStayDays: "",
  purposeOfTravel: "",
};

const ApplyVisa = () => {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    ...emptyForm,
    country: params.get("country") || "",
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    nationality: user?.nationality || "",
  });
  const [files, setFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get("/countries").then(({ data }) => setCountries(data.data)).finally(() => setLoadingCountries(false));
  }, []);

  const selectedCountry = countries.find((c) => c._id === form.country);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const canProceed = () => {
    if (step === 0) return !!form.country && !!form.visaType;
    if (step === 1) return form.fullName && form.passportNumber && form.passportExpiry && form.dateOfBirth && form.nationality;
    if (step === 2) return form.email && form.phone;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data } = await api.post("/visa-applications", form);
      const applicationId = data.data._id;

      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((f) => formData.append("documents", f));
        await api.post(`/visa-applications/${applicationId}/documents`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success(`Application submitted! Reference: ${data.data.referenceNumber}`);
      navigate(`/dashboard/applications/${applicationId}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingCountries) return <Loader />;

  return (
    <div className="py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="section-title text-center">Visa Application</h1>

        {/* Step indicator */}
        <div className="flex justify-between mb-10 mt-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex-1 text-center">
              <div className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${i <= step ? "bg-secondary text-white" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              <span className={`text-xs ${i <= step ? "text-primary font-medium" : "text-gray-400"}`}>{s}</span>
            </div>
          ))}
        </div>

        <div className="card p-8">
          {step === 0 && (
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-600">Destination Country</span>
                <select name="country" value={form.country} onChange={handleChange} className="input-field mt-1">
                  <option value="">Select a country...</option>
                  {countries.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
              </label>
              {selectedCountry && (
                <label className="block">
                  <span className="text-sm font-medium text-gray-600">Visa Type</span>
                  <select name="visaType" value={form.visaType} onChange={handleChange} className="input-field mt-1">
                    <option value="">Select a visa type...</option>
                    {selectedCountry.visaTypesOffered.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </label>
              )}
              {selectedCountry && (
                <div className="rounded-lg bg-primary/5 p-4 text-sm text-gray-600">
                  Processing time: ~{selectedCountry.processingTimeDays} days &middot; Base fee: {selectedCountry.currency} {selectedCountry.baseFee}
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name (as in passport)" className="input-field sm:col-span-2" />
              <input name="passportNumber" value={form.passportNumber} onChange={handleChange} placeholder="Passport Number" className="input-field" />
              <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="Nationality" className="input-field" />
              <label className="block">
                <span className="text-xs text-gray-500">Date of Birth</span>
                <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="input-field mt-1" />
              </label>
              <label className="block">
                <span className="text-xs text-gray-500">Passport Expiry</span>
                <input type="date" name="passportExpiry" value={form.passportExpiry} onChange={handleChange} className="input-field mt-1" />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="input-field" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input-field" />
                <label className="block">
                  <span className="text-xs text-gray-500">Intended Travel Date</span>
                  <input type="date" name="intendedTravelDate" value={form.intendedTravelDate} onChange={handleChange} className="input-field mt-1" />
                </label>
                <input name="durationOfStayDays" type="number" min="1" value={form.durationOfStayDays} onChange={handleChange} placeholder="Duration of Stay (days)" className="input-field" />
              </div>
              <textarea name="purposeOfTravel" value={form.purposeOfTravel} onChange={handleChange} rows={3} placeholder="Purpose of Travel" className="input-field" />

              <div>
                <span className="text-sm font-medium text-gray-600 block mb-2">Supporting Documents (passport copy, photo, etc.)</span>
                <input
                  type="file" multiple accept="image/*,application/pdf"
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-white"
                />
                {files.length > 0 && <p className="text-xs text-gray-500 mt-2">{files.length} file(s) selected</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 text-sm text-gray-600">
              <h3 className="text-lg font-semibold text-primary mb-2">Review Your Application</h3>
              <p><b>Destination:</b> {selectedCountry?.name} &middot; {form.visaType}</p>
              <p><b>Traveler:</b> {form.fullName} ({form.nationality})</p>
              <p><b>Passport:</b> {form.passportNumber}, expires {form.passportExpiry}</p>
              <p><b>Contact:</b> {form.email} / {form.phone}</p>
              <p><b>Travel Date:</b> {form.intendedTravelDate || "Not specified"}</p>
              <p><b>Documents:</b> {files.length} file(s) attached</p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="btn-brand-outline disabled:opacity-40"
            >
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} className="btn-brand">
                Next
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={submitting} className="btn-brand">
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyVisa;
