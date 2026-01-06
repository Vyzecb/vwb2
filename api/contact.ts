import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* =======================
   LUXE HTML TEMPLATES
======================= */

const adminTemplate = (data: any) => `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" style="background:#111;border-radius:16px;border:1px solid #2a2a2a;">
          <tr>
            <td style="padding:32px;text-align:center;">
              <h1 style="margin:0;font-size:28px;color:#D4AF37;">Nieuw Contactbericht</h1>
              <p style="margin-top:8px;color:#aaa;">Vos Web Designs</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 32px;font-size:15px;">
              <p><strong>Naam:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Telefoon:</strong> ${data.phone || "-"}</p>
              <p><strong>Bedrijf:</strong> ${data.company || "-"}</p>
              <p><strong>Dienst:</strong> ${data.service || "-"}</p>
              <p><strong>Pakket:</strong> ${data.package || "-"}</p>

              <p style="margin-top:24px;"><strong>Bericht:</strong></p>
              <div style="margin-top:8px;padding:16px;background:#1a1a1a;border-radius:8px;border:1px solid #2a2a2a;">
                ${data.message}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:24px;text-align:center;font-size:12px;color:#777;">
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
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" style="background:#111;border-radius:16px;border:1px solid #2a2a2a;">
          <tr>
            <td style="padding:40px;text-align:center;">
              <h1 style="margin:0;font-size:30px;color:#D4AF37;">Bedankt voor uw bericht</h1>
              <p style="margin-top:12px;color:#aaa;">Vos Web Designs</p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 32px;font-size:16px;line-height:1.6;">
              <p>Beste <strong>${data.name}</strong>,</p>

              <p>
                Hartelijk dank voor uw bericht. Wij hebben uw aanvraag ontvangen en nemen
                <strong>binnen 24 uur</strong> contact met u op.
              </p>

              <div style="margin:24px 0;padding:20px;background:#1a1a1a;border-radius:10px;border:1px solid #2a2a2a;">
                <strong>Uw bericht:</strong><br /><br />
                ${data.message}
              </div>

              <p>
                Heeft u vragen? Mail gerust naar
                <a href="mailto:info@voswebdesigns.nl" style="color:#D4AF37;text-decoration:none;">
                  info@voswebdesigns.nl
                </a>.
              </p>

              <p style="margin-top:32px;">
                Met vriendelijke groet,<br />
                <strong>Vos Web Designs</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px;text-align:center;font-size:12px;color:#777;">
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

    if (!data?.email || !data?.name || !data?.message) {
      return res.status(400).json({ error: "Invalid form data" });
    }

    // 📩 Mail naar jou
    await resend.emails.send({
      from: "Vos Web Designs <onboarding@resend.dev>",
      to: ["info@voswebdesigns.nl"],
      subject: `Nieuw contactbericht van ${data.name}`,
      html: adminTemplate(data),
    });

    // ✉️ Bevestiging naar klant
    await resend.emails.send({
      from: "Vos Web Designs <onboarding@resend.dev>",
      to: [data.email],
      subject: "Wij hebben uw bericht ontvangen",
      html: customerTemplate(data),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("RESEND CONTACT ERROR:", error);
    return res.status(500).json({ error: "Mail failed" });
  }
}