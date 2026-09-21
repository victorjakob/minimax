// Contact form → Resend (https://resend.com/docs/api-reference/emails/send-email)
// Env vars (set in .env.local and in Vercel):
//   RESEND_API_KEY  – required
//   RESEND_FROM     – e.g. "MiniMax <form@minimax.is>" (domain must be verified in Resend)
//   CONTACT_TO      – where form messages are delivered

const FROM = process.env.RESEND_FROM || "MiniMax <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || "gunnar@minimax.is";

const escape = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const json = (body, status) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export async function POST(req) {
  try {
    const { name, email, message, phone, company } = await req.json();

    if (!email || !name || !message || !phone) {
      return json({ error: "Missing required fields." }, 400);
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `New Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n${company ? `Company: ${company}\n` : ""}\n${message}`,
        html: `
          <p><strong>Name:</strong> ${escape(name)}</p>
          <p><strong>Email:</strong> ${escape(email)}</p>
          <p><strong>Phone:</strong> ${escape(phone)}</p>
          ${company ? `<p><strong>Company:</strong> ${escape(company)}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escape(message)}</p>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return json({ error: "Failed to send email." }, 500);
    }

    return json({ message: "Email sent successfully!" }, 200);
  } catch (error) {
    console.error("Error sending email:", error);
    return json({ error: "Failed to send email." }, 500);
  }
}
