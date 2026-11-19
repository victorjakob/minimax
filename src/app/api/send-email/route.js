// Contact form → Resend (https://resend.com/docs/api-reference/emails/send-email)
// Env vars (set in .env.local and in Vercel):
//   RESEND_API_KEY  – required
//   RESEND_FROM     – e.g. "MiniMax <form@minimax.is>" (domain must be verified in Resend)
//   CONTACT_TO      – where form messages are delivered
//   NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY – every message is also saved
//     to minimax_contact_submissions (insert-only for the site), so nothing is lost if email fails

import { EMAIL, PHONES } from "../../lib/contact";

const FROM = process.env.RESEND_FROM || "MiniMax <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || EMAIL;

const escape = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const json = (body, status) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

// Light per-instance rate limit: 5 messages per IP per 10 minutes.
const hits = new Map();
const limited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

// Saves the message in Supabase. Returns true when stored.
async function store(row) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return false;
  try {
    const res = await fetch(`${url}/rest/v1/minimax_contact_submissions`, {
      method: "POST",
      headers: { apikey: key, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
    if (!res.ok) console.error("Supabase insert failed:", res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error("Supabase insert failed:", e);
    return false;
  }
}

const send = (payload) =>
  fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

const shell = (inner) => `
  <div style="background:#f4f2ee;padding:32px 16px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#2a2829">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;border-top:4px solid #00aa63">
      <img src="https://www.minimax.is/brand/minimax-larett-litur-email.png" width="160" height="34" alt="MiniMax" style="display:block;border:0;margin-bottom:28px" />
      ${inner}
    </div>
  </div>`;

export async function POST(req) {
  try {
    const { name = "", email = "", message = "", phone = "", company = "", website = "", page = "" } =
      await req.json();

    // Honeypot filled → pretend success so bots learn nothing.
    if (website) return json({ ok: true }, 200);

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (limited(ip)) return json({ error: "Of margar beiðnir. Reyndu aftur eftir smá stund." }, 429);

    if (!name.trim() || !message.trim() || !phone.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return json({ error: "Vantar upplýsingar." }, 400);
    }
    if (message.length > 5000 || name.length > 200) return json({ error: "Of langt." }, 400);

    const stored = await store({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim() || null,
      message: message.trim(),
      page: page || null,
    });

    const firstName = name.trim().split(/\s+/)[0];
    const rows = [
      ["Nafn", name],
      ["Netfang", email],
      ["Sími", phone],
      company && ["Fyrirtæki", company],
      page && ["Síða", page],
    ].filter(Boolean);

    // 1) Message to MiniMax
    const res = await send({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Ný fyrirspurn frá ${name}${company ? ` (${company})` : ""}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
      html: shell(`
        <table style="font-size:14px;border-collapse:collapse;margin-bottom:20px">
          ${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#888">${k}</td><td style="padding:4px 0">${escape(v)}</td></tr>`).join("")}
        </table>
        <div style="font-size:15px;line-height:1.6;white-space:pre-wrap;border-top:1px solid #eee;padding-top:20px">${escape(message)}</div>
        <p style="font-size:12px;color:#999;margin-top:24px">Svaraðu þessum pósti til að svara ${escape(firstName)} beint.</p>
      `),
    });

    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      // Saved in the database, so Gunnar still gets it; only fail if it's lost entirely.
      if (!stored) return json({ error: "Failed to send email." }, 500);
    }

    // 2) Confirmation to the visitor (best effort — never fails the request).
    // Awaited so serverless doesn't cut it off after the response.
    await send({
      from: FROM,
      to: [email],
      reply_to: TO,
      subject: "Takk fyrir skilaboðin · MiniMax",
      text: `Sæl/l ${firstName},\n\nTakk fyrir að hafa samband. Við höfum móttekið skilaboðin og svörum yfirleitt innan eins virks dags.\n\nSkilaboðin þín:\n${message}\n\nKveðja,\nMiniMax\n${PHONES.map((p) => `${p.label}: ${p.number}`).join("\n")}\n${EMAIL}`,
      html: shell(`
        <p style="font-size:16px;line-height:1.6;margin:0 0 16px">Sæl/l ${escape(firstName)},</p>
        <p style="font-size:16px;line-height:1.6;margin:0 0 24px">Takk fyrir að hafa samband. Við höfum móttekið skilaboðin og svörum yfirleitt innan eins virks dags.</p>
        <div style="font-size:14px;line-height:1.6;color:#555;white-space:pre-wrap;background:#f6f6f3;border-radius:12px;padding:16px">${escape(message)}</div>
        <p style="font-size:15px;line-height:1.6;margin:24px 0 4px">Kveðja,<br/>MiniMax</p>
        <p style="font-size:12px;line-height:1.7;color:#999;margin:16px 0 0">
          ${PHONES.map((p) => `${p.label}: ${p.number}`).join("<br/>")}<br/>
          ${EMAIL} · Engihjalli 8, 200 Kópavogur
        </p>
      `),
    }).catch((e) => console.error("Confirmation email failed:", e));

    return json({ ok: true }, 200);
  } catch (error) {
    console.error("Error sending email:", error);
    return json({ error: "Failed to send email." }, 500);
  }
}
