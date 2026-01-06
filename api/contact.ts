import type { VercelRequest, VercelResponse } from "@vercel/node";

/* =======================
   ZOHO ACCESS TOKEN
======================= */
async function getAccessToken() {
  const res = await fetch("https://accounts.zoho.eu/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      grant_type: "refresh_token",
    }),
  });

  const json = await res.json();
  if (!json.access_token) throw new Error("No Zoho access token");
  return json.access_token;
}

/* =======================
   LUXE HTML TEMPLATES
======================= */

const adminTemplate = (data: any) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">
<table width="100%">
<tr>
<td align="center" style="padding:40px">
<table width="600" style="background:#111;border-radius:16px;border:1px solid #2a2a2a">
<tr>
<td style="padding:32px;text-align:center">
<h1 style="color:#D4AF37;margin:0">Nieuw contactbericht</h1>
<p style="color:#aaa">Vos Web Designs</p>
</td>
</tr>

<tr>
<td style="padding:0 32px 32px;font-size:15px">
<p><strong>Naam:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Telefoon:</strong> ${data.phone || "-"}</p>
<p><strong>Bedrijf:</strong> ${data.company || "-"}</p>
<p><strong>Dienst:</strong> ${data.service || "-"}</p>
<p><strong>Pakket:</strong> ${data.package || "-"}</p>

<p style="margin-top:20px"><strong>Bericht:</strong></p>
<div style="background:#1a1a1a;padding:16px;border-radius:8px">
${data.message}
</div>
</td>
</tr>

<tr>
<td style="padding:24px;text-align:center;font-size:12px;color:#777">
Automatisch verzonden via voswebdesigns.nl
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>
`;

const customerTemplate = (data: any) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">
<table width="100%">
<tr>
<td align="center" style="padding:40px">
<table width="600" style="background:#111;border-radius:16px;border:1px solid #2a2a2a">
<tr>
<td style="padding:40px;text-align:center">
<h1 style="color:#D4AF37;margin:0">Bedankt voor uw bericht</h1>
<p style="color:#aaa">Vos Web Designs</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 32px;font-size:16px;line-height:1.6">
<p>Beste <strong>${data.name}</strong>,</p>

<p>
Hartelijk dank voor uw bericht. Wij hebben uw aanvraag ontvangen en nemen
<strong>binnen 24 uur</strong> contact met u op.
</p>

<div style="background:#1a1a1a;padding:20px;border-radius:10px;margin:24px 0">
<strong>Uw bericht:</strong><br><br>
${data.message}
</div>

<p>
Heeft u vragen? Mail gerust naar
<a href="mailto:info@voswebdesigns.nl" style="color:#D4AF37;text-decoration:none">
info@voswebdesigns.nl
</a>
</p>

<p style="margin-top:32px">
Met vriendelijke groet,<br>
<strong>Vos Web Designs</strong>
</p>
</td>
</tr>

<tr>
<td style="padding:24px;text-align:center;font-size:12px;color:#777">
© Vos Web Designs – Luxe Webdesign & Development
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>
`;

/* =======================
   API HANDLER
======================= */

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!data?.name || !data?.email || !data?.message) {
      return res.status(400).json({ error: "Invalid form data" });
    }

    const token = await getAccessToken();

    const sendMail = async (to: string, subject: string, html: string) => {
      const res = await fetch(
        `https://mail.zoho.eu/api/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromAddress: "info@voswebdesigns.nl",
            toAddress: to,
            subject,
            content: html,
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
    };

    // 📩 Mail naar jou
    await sendMail(
      "info@voswebdesigns.nl",
      `Nieuw contactbericht van ${data.name}`,
      adminTemplate(data)
    );

    // ✉️ Bevestiging naar klant
    await sendMail(
      data.email,
      "Wij hebben uw bericht ontvangen",
      customerTemplate(data)
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("ZOHO MAIL API ERROR:", error);
    return res.status(500).json({ error: "Mail failed" });
  }
}