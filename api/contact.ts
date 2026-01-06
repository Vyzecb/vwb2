import type { VercelRequest, VercelResponse } from "@vercel/node";

/* =======================
   CONFIG
======================= */

const LOGO_URL = "https://voswebdesigns.nl/logo.jpeg";
const FROM_EMAIL = "Vos Web Designs <info@voswebdesigns.nl>"; // ✔ verified domain
const ADMIN_EMAIL = "info@voswebdesigns.nl";

/* =======================
   DIENST-SPECIFIEKE COPY
======================= */

const serviceCopy: Record<
  string,
  { title: string; intro: string; expectations: string[] }
> = {
  webdesign: {
    title: "Uw nieuwe website begint hier",
    intro:
      "Een professionele website is de basis van uw online uitstraling. Wij kijken niet alleen naar design, maar ook naar gebruiksvriendelijkheid en conversie.",
    expectations: [
      "Bespreking van uw wensen en doelen",
      "Advies over structuur, design en content",
      "Heldere uitleg over planning en investering",
    ],
  },
  ecommerce: {
    title: "Samen bouwen aan een succesvolle webshop",
    intro:
      "Een goede webshop verkoopt. Wij focussen op snelheid, vertrouwen en een soepele gebruikerservaring.",
    expectations: [
      "Bespreking van producten en betalingen",
      "Conversie- en schaalbaarheidsadvies",
      "Duidelijk stappenplan",
    ],
  },
  development: {
    title: "Maatwerk webontwikkeling",
    intro:
      "Voor technische of complexe projecten denken wij actief mee in oplossingen en architectuur.",
    expectations: [
      "Inventarisatie functionaliteiten",
      "Technisch advies",
      "Toekomstbestendige aanpak",
    ],
  },
  seo: {
    title: "Meer zichtbaarheid en online groei",
    intro:
      "Goede vindbaarheid begint bij een sterke basis en een lange termijn strategie.",
    expectations: [
      "SEO analyse",
      "Concrete verbeterpunten",
      "Transparant groeiplan",
    ],
  },
  other: {
    title: "Uw aanvraag is ontvangen",
    intro:
      "Elke aanvraag is uniek. Wij nemen de tijd om uw vraag goed te begrijpen.",
    expectations: [
      "Persoonlijke reactie",
      "Meedenken in oplossingen",
      "Eerlijk advies",
    ],
  },
};

/* =======================
   ADMIN TEMPLATE
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
<td style="padding:24px;text-align:center;">
<img src="${LOGO_URL}" width="140" style="margin-bottom:16px;" />
<h1 style="color:#D4AF37;">Nieuw contactbericht</h1>
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
<div style="padding:16px;background:#1a1a1a;border-radius:8px;">
${data.message}
</div>
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
   CUSTOMER TEMPLATE
======================= */

const customerTemplate = (data: any) => {
  const content = serviceCopy[data.service] || serviceCopy.other;

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 16px;">
<table width="600" style="background:#111;border-radius:16px;border:1px solid #2a2a2a;">

<tr>
<td style="padding:32px;text-align:center;">
<img src="${LOGO_URL}" width="160" style="margin-bottom:20px;" />
<h1 style="color:#D4AF37;">${content.title}</h1>
</td>
</tr>

<tr>
<td style="padding:0 40px 32px;font-size:16px;">
<p>Beste <strong>${data.name}</strong>,</p>

<p>
Hartelijk dank voor uw bericht. Wij nemen
<strong>binnen 24 uur</strong> persoonlijk contact met u op.
</p>

<p>${content.intro}</p>

<p><strong>Wat kunt u verwachten?</strong></p>
<ul>
${content.expectations.map(e => `<li>${e}</li>`).join("")}
</ul>

<p>
Met vriendelijke groet,<br />
<strong>Melvin Vos</strong><br />
Vos Web Designs
</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>
`;
};

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
    const { Resend } = await import("resend");

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY ontbreekt");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!data?.email || !data?.name || !data?.message) {
      return res.status(400).json({ error: "Invalid form data" });
    }

    /* -------- ADMIN MAIL -------- */
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      reply_to: data.email, // ✔ direct kunnen antwoorden
      subject: `Nieuw contactbericht van ${data.name}`,
      html: adminTemplate(data),
    });

    /* -------- CUSTOMER MAIL -------- */
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email],
      reply_to: ADMIN_EMAIL,
      subject: "Wij hebben uw bericht ontvangen",
      html: customerTemplate(data),
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("❌ CONTACT MAIL ERROR:", error);
    return res.status(500).json({
      error: "Mail failed",
      message: error.message,
    });
  }
}