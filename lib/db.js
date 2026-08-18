import { createClient } from "@supabase/supabase-js";

let cachedClient = null;

function getClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY " +
        "to your .env.local — see README.md for setup steps."
    );
  }

  if (!cachedClient) {
    // The service_role key is used here deliberately: this file only ever
    // runs on the server (inside API routes), never in the browser bundle,
    // so it's safe to use the key that bypasses Row Level Security.
    cachedClient = createClient(url, key, {
      auth: { persistSession: false },
    });
  }
  return cachedClient;
}

export async function addInquiry(entry) {
  const client = getClient();
  const { data, error } = await client.from("inquiries").insert([entry]).select().single();

  if (error) {
    throw new Error("Failed to save inquiry: " + error.message);
  }
  return data;
}

export async function getInquiries() {
  const client = getClient();
  const { data, error } = await client
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch inquiries: " + error.message);
  }
  return data;
}
