"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ state: "idle", message: "" });

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      company: form.company.value,
      service: form.service.value,
      timeline: form.timeline.value,
      budget: form.budget.value,
      details: form.details.value,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus({ state: "error", message: data.error || "Something went wrong. Please try again." });
      } else {
        setStatus({ state: "success", message: "Thanks — your project details were received. We'll get back to you within 1–2 business days." });
        form.reset();
      }
    } catch (err) {
      setStatus({ state: "error", message: "Could not reach the server. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="project-form reveal" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your full name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="you@company.com" required />
      </div>
      <div className="field">
        <label htmlFor="company">Company / Project</label>
        <input id="company" name="company" type="text" placeholder="Optional" />
      </div>
      <div className="field">
        <label htmlFor="service">What do you need?</label>
        <select id="service" name="service" defaultValue="Website / Web App">
          <option>Website / Web App</option>
          <option>Software / SaaS Product</option>
          <option>DevOps / Cloud / Security</option>
          <option>Digital Marketing / SEO</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="timeline">Timeline</label>
        <input id="timeline" name="timeline" type="text" placeholder="e.g. 2–3 months" />
      </div>
      <div className="field">
        <label htmlFor="budget">Budget Range</label>
        <input id="budget" name="budget" type="text" placeholder="Optional" />
      </div>
      <div className="field full">
        <label htmlFor="details">Tell us about the problem</label>
        <textarea id="details" name="details" placeholder="What are you trying to solve or build?"></textarea>
      </div>
      <button className="submit-btn" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send Project Details →"}
      </button>
      <div
        className={
          "form-note" +
          (status.state === "error" ? " error" : status.state === "success" ? " success" : "")
        }
      >
        {status.message || "We'll get back to you within 1–2 business days."}
      </div>
    </form>
  );
}
