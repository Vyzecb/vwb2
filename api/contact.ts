import type { VercelRequest, VercelResponse } from "@vercel/node";

/* =======================
   CONFIG
======================= */

const LOGO_URL = "https://voswebdesigns.nl/logo.jpeg";
const FROM_EMAIL = "Vos Web Designs <no-reply@voswebdesigns.nl>"; // ✔ veilig & groen
const ADMIN_EMAIL = "info@voswebdesigns.nl";

/* =======================
   DIENST-SPECIFIEKE COPY
======================= */

const serviceCopy: Record<
  string,
  {
    title: string;
    intro: string;
    deepText: string;
    expectations: string[];
  }
> = {
  ecommerce: {
    title: "Samen bouwen aan een succesvolle webshop",
    intro:
      "Hartelijk dank voor uw bericht. Wij hebben uw aanvraag goed ontvangen en nemen binnen 24 uur persoonlijk contact met u op.",
    deepText:
      "Een goede webshop verkoopt. Daarom focussen wij niet alleen op het uiterlijk, maar vooral op snelheid, vertrouwen en een soepele gebruikerservaring. Van productstructuur tot betalingen en conversie: alles wordt doordacht opgebouwd.",
    expectations: [
      "Bespreking van producten, betalingen en verzending",
      "Advies over conversie en schaalbaarheid",
      "Duidelijk stappenplan richting livegang",
    ],
  },

  webdesign: {
    title: "Uw nieuwe website begint hier",
    intro:
      "Hartelijk dank voor uw bericht. Wij hebben uw aanvraag goed ontvangen en nemen binnen 24 uur persoonlijk contact met u op.",
    deepText:
      "Een professionele website is het fundament van uw online uitstraling. Wij zorgen ervoor dat uw website vertrouwen uitstraalt en bezoekers omzet in klanten.",
    expectations: [
      "Bespreking van uw wensen en doelen",
      "Advies over structuur, design en content",
      "Heldere uitleg over planning en investering",
    ],
  },

  development: {
    title: "Maatwerk webontwikkeling",
    intro:
      "Hartelijk dank voor uw bericht. Wij hebben uw aanvraag goed ontvangen en nemen binnen 24 uur persoonlijk contact met u op.",
    deepText:
      "Bij maatwerk webontwikkeling kijken wij verder dan standaard oplossingen. We denken actief mee over techniek, schaalbaarheid en toekomstbestendigheid.",
    expectations: [
      "Inventarisatie van functionaliteiten",
      "Technisch advies en haalbaarheid",
      "Schaalbare en toekomstbestendige aanpak",
    ],
  },

  seo: {
    title: "Meer zichtbaarheid en online groei",
    intro:
      "Hartelijk dank voor uw bericht. Wij hebben uw aanvraag goed ontvangen en nemen binnen 24 uur persoonlijk contact met u op.",
    deepText:
      "Goede vindbaarheid begint bij een sterke technische basis en een duidelijke strategie. Wij focussen op duurzame groei in plaats van korte pieken.",
    expectations: [
      "Analyse van uw huidige website",
      "Concrete verbeterpunten",
      "Transparant en realistisch groeiplan",
    ],
  },

  other: {
    title: "Uw aanvraag is ontvangen",
    intro:
      "Hartelijk dank voor uw bericht. Wij hebben uw aanvraag goed ontvangen en nemen binnen 24 uur persoonlijk contact met u op.",
    deepText:
      "Elke aanvraag is uniek. Wij nemen de tijd om uw vraag goed te begrijpen en te kijken welke oplossing het beste bij u past.",
    expectations: [
      "Persoonlijke reactie",
      "Meedenken in oplossingen",
      "Eerlijk en duidelijk advies",
    ],
  },
};

/* =======================
   PAKKET-SPECIFIEKE COPY
======================= */

const packageCopy: Record<
  string,
  { title: string; text: string }
> = {
  Starter: {
    title: "Een sterke start",
    text:
      "Het Starter-pakket is ideaal wanneer u een professionele basis wilt leggen. We focussen op overzicht, betrouwbaarheid en een solide fundament om goed te beginnen.",
  },
  Groei: {
    title: "Klaar om door te groeien",
    text:
      "Het Groei-pakket is geschikt voor bedrijven die willen opschalen. We denken strategisch mee over conversie, structuur en schaalbaarheid.",
  },
  Pro: {
    title: "Volledig maatwerk & maximale impact",
    text:
      "Met het Pro-pakket kiest u voor maatwerk op hoog niveau. We werken nauw samen en bouwen een oplossing die perfect aansluit bij uw ambities.",
  },
};

/* =======================
   ADMIN TEMPLATE
======================= */

const adminTemplate = (data: any) => `
<h2>Nieuw contactbericht</h2>
<p><strong>Naam:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Telefoon:</strong> ${data.phone || "-"}</p>
<p><strong>Bedrijf:</strong> ${data.company || "-"}</p>
<p><strong>Dienst:</strong> ${data.service || "-"}</p>
<p><strong>Pakket:</strong> ${data.package || "-"}</p>
<p><strong>Bericht:</strong></p>
<p>${data.message}</p>
`;

/* =======================
   CUSTOMER TEMPLATE
======================= */

const customerTemplate = (data: any) => {
  const service = serviceCopy[data.service] || serviceCopy.other;
  const pkg = packageCopy[data.package];

  return `
<!DOCTYPE html>
<html lang="nl">
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center" style="padding:40px 16px;">
<table width="600" style="background:#111;border-radius:16px;border:1px solid #2a2a2a;">

<tr>
<td style="padding:32px;text-align:center;">
<img src="${LOGO_URL}" width="160" style="margin-bottom:20px;" />
<h1 style="margin:0;font-size:26px;color:#D4AF37;">
${service.title}
</h1>
<p style="color:#aaa;">Vos Web Designs</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 32px;font-size:16px;line-height:1.7;">
<p>Beste <strong>${data.name}</strong>,</p>

<p>${service.intro}</p>

<p>${service.deepText}</p>

${
  pkg
    ? `
<hr style="border:none;border-top:1px solid #2a2a2a;margin:28px 0;" />
<h3 style="color:#D4AF37;">${pkg.title}</h3>
<p>${pkg.text}</p>
`
    : ""
}

<div style="margin:28px 0;padding:22px;background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;">
<strong style="color:#D4AF37;">Samenvatting van uw aanvraag</strong><br /><br />
<strong>Dienst:</strong> ${data.service || "-"}<br />
<strong>Pakket:</strong> ${data.package || "-"}<br />
<strong>Bedrijf:</strong> ${data.company || "-"}<br /><br />
<strong>Uw bericht:</strong><br />
${data.message}
</div>

<p><strong>Wat kunt u van ons verwachten?</strong></p>
<ul style="padding-left:18px;color:#ccc;">
${service.expectations.map(e => `<li>${e}</li>`).join("")}
</ul>

<p style="margin-top:24px;">
Wij nemen contact met u op via e-mail of telefoon. Wilt u alvast extra informatie
delen? U kunt eenvoudig reageren op deze e-mail.
</p>

<p style="margin-top:32px;">
Met vriendelijke groet,<br />
<strong>Melvin Vos</strong><br />
Vos Web Designs
</p>
</td>
</tr>

<tr>
<td style="padding:20px;text-align:center;font-size:12px;color:#777;">
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
    const resend = new Resend(process.env.RESEND_API_KEY!);

    const data =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!data?.email || !data?.name || !data?.message) {
      return res.status(400).json({ error: "Invalid form data" });
    }

    // ADMIN MAIL
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      reply_to: data.email,
      subject: `Nieuw contactbericht van ${data.name}`,
      html: adminTemplate(data),
    });

    // CUSTOMER MAIL
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email],
      reply_to: ADMIN_EMAIL,
      subject: "Wij hebben uw bericht ontvangen",
      html: customerTemplate(data),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("CONTACT MAIL ERROR:", error);
    return res.status(500).json({ error: "Mail failed" });
  }
}