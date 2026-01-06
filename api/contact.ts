import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

/* =======================
   SMTP TRANSPORT (ZOHO)
======================= */

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu", // of smtp.zoho.com
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
});

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
        <table width="600" style="background:#111;border-radius:16px;border:1px solid #2a2a2a;">
          <tr>
            <td style="padding:32px;text-align:center">
              <h1 style="color:#D4AF37;margin:0">Nieuw contactbericht</h1>
              <p style="color:#aaa">Vos Web Designs</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px">
              <p><strong>Naam:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Telefoon:</strong> ${data.phone || "-"}</p>
              <p><strong>Bedrijf:</strong> ${data.company || "-"}</p>
              <p><strong>Dienst:</strong> ${data.service || "-"}</p>
              <p><strong>Pakket:</strong> ${data.package || "-"}</p>

              <p><strong>Bericht:</strong></p>
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
        <table width="600" style="background:#111;border-radius:16px;border:1px solid #2a2a2a;">
          <tr>
            <td style="padding:40px;text-align:center">
              <h1 style="color:#D4AF37;margin:0">Bedankt voor uw bericht</h1>
              <p style="color:#aaa">Vos Web Designs</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 32px;font-size:16px">
              <p>Beste <strong>${data.name}</strong>,</p>
              <p>
                Bedankt voor uw bericht. Wij hebben uw aanvraag ontvangen en nemen
                <strong>binnen 24 uur</strong> contact met u op.
              </p>

              <div style="background:#1a1a1a;padding:20px;border-radius:10px;margin:24px 0">
                <strong>Uw bericht:</strong><br/><br/>
                ${data.message}
              </div>

              <p>
                Met vriendelijke groet,<br/>
                <strong>Vos Web Designs</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;text-align:center;font-size:12px;color:#777">
              © Vos Web Designs
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
    await transporter.sendMail({
      from: `"Vos Web Designs" <info@voswebdesigns.nl>`,
      to: "info@voswebdesigns.nl",
      subject: `Nieuw contactbericht van ${data.name}`,
      html: adminTemplate(data),
    });

    // ✉️ Bevestiging naar klant
    await transporter.sendMail({
      from: `"Vos Web Designs" <info@voswebdesigns.nl>`,
      to: data.email,
      subject: "Wij hebben uw bericht ontvangen",
      html: customerTemplate(data),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("ZOHO CONTACT ERROR:", error);
    return res.status(500).json({ error: "Mail failed" });
  }
}