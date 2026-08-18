"use client";

import { useState } from "react";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        headers: { "x-admin-secret": secret },
      });
      if (!res.ok) {
        setError("Incorrect admin key, or ADMIN_SECRET is not set on the server.");
        setLoading(false);
        return;
      }
      const data = await res.json();
      setInquiries(data.inquiries || []);
      setAuthed(true);
    } catch {
      setError("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <div className="admin-wrap">
        <div className="admin-login">
          <h2 style={{ fontFamily: "var(--display)" }}>6STANZA Admin</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10 }}>
            Enter the admin key (set as ADMIN_SECRET in your environment) to view project
            inquiries submitted through the website.
          </p>
          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Admin key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <button className="btn-primary" type="submit" style={{ width: "100%" }} disabled={loading}>
              {loading ? "Checking…" : "View Inquiries"}
            </button>
          </form>
          {error && <p style={{ color: "#ff8080", fontSize: 13, marginTop: 12 }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrap">
      <h2 style={{ fontFamily: "var(--display)" }}>Project Inquiries ({inquiries.length})</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Service</th>
            <th>Timeline</th>
            <th>Budget</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.length === 0 && (
            <tr>
              <td colSpan={8} style={{ color: "var(--muted-dim)" }}>
                No submissions yet.
              </td>
            </tr>
          )}
          {inquiries.map((inq) => (
            <tr key={inq.id}>
              <td>{new Date(inq.created_at).toLocaleString()}</td>
              <td>{inq.name}</td>
              <td>{inq.email}</td>
              <td>{inq.company}</td>
              <td>{inq.service}</td>
              <td>{inq.timeline}</td>
              <td>{inq.budget}</td>
              <td style={{ maxWidth: 300 }}>{inq.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
