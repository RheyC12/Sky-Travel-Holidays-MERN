import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios.js";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/contact", form);
      toast.success("Message sent! We'll get back to you shortly.");
      setForm(initialForm);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-primary text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="section-title">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have a question about a destination or an existing application? Send us a message and our team
              will respond within one business day.
            </p>
            <div className="space-y-4 text-gray-600">
              <p><i className="fa fa-map-marker-alt text-secondary mr-2" /> Beside Megamall, 2XL Building, 4th Floor, Room 4040, Sharjah, UAE</p>
              <p><i className="fas fa-envelope text-secondary mr-2" /> info@skytravelholidaysfz.com</p>
              <p><i className="fas fa-phone text-secondary mr-2" /> +971 50 101 8277</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card p-8 space-y-4">
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Your Name" className="input-field" />
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Your Email" className="input-field" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className="input-field" />
            <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" className="input-field" />
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Your Message" className="input-field" />
            <button type="submit" disabled={submitting} className="btn-brand w-full">
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
