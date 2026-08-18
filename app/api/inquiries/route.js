import { NextResponse } from "next/server";
import { addInquiry, getInquiries } from "@/lib/db";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, email, company, service, timeline, budget, details } = body || {};

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  let record;
  try {
    record = await addInquiry({
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 200),
      company: company ? String(company).slice(0, 200) : "",
      service: service ? String(service).slice(0, 200) : "",
      timeline: timeline ? String(timeline).slice(0, 200) : "",
      budget: budget ? String(budget).slice(0, 200) : "",
      details: details ? String(details).slice(0, 4000) : "",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Could not save your submission. Please try again shortly." },
      { status: 500 }
    );
  }

  // NOTE: this is where you'd also trigger an email notification
  // (e.g. via Resend, SendGrid, or nodemailer) so the team is alerted
  // immediately instead of only relying on the admin dashboard.

  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}

export async function GET(request) {
  const adminSecret = process.env.ADMIN_SECRET || "";
  const provided = request.headers.get("x-admin-secret") || "";

  if (!adminSecret || provided !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let inquiries;
  try {
    inquiries = await getInquiries();
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Could not load inquiries." }, { status: 500 });
  }

  return NextResponse.json({ inquiries });
}
