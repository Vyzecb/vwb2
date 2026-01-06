import type { VercelRequest, VercelResponse } from "@vercel/node";

/* =======================
   CONFIG
======================= */

const LOGO_URL = "https://voswebdesigns.nl/logo.jpeg";
const FROM_EMAIL = "Vos Web Designs <no-reply@voswebdesigns.nl>";
const BCC_EMAIL = "info@voswebdesigns.nl";

/* =======================
   DIENST-SPECIFIEKE COPY
======================= */

const serviceCopy: Record<
  string,
  {
    title: string;
    introCustomer: string;
    introAdmin: string;
    deepText: string;
    expectations: string[];
  }
> = {
  webdesign: {
    title: "Uw nieuwe website begint hier",
    introCustomer:
      "Hartelijk dank voor uw bericht. Wij hebben uw aanvraag goed ontvangen en nemen binnen 24 uur persoonlijk contact met u op.",
    introAdmin:
      "Er is een nieuwe webdesign aanvraag binnengekomen via het contactformulier.",
    deepText:
      "Een professionele website is het fundament van uw online uitstraling. Wij zorgen ervoor dat design, gebruiksvriendelijkheid en conversie perfect samenkomen.",
    expectations: [
      "Bespreking van wensen en doelen",
      "Advies over structuur, design en content",
      "Planning en investering bespreken",
    ],
  },

  ecommerce: {
    title: "Samen bouwen aan een succesvolle webshop",
    introCustomer:
      "Hartelijk dank voor uw bericht. Wij hebben uw webshop-aanvraag goed ontvangen en nemen binnen 24 uur persoonlijk contact met u op.",
    introAdmin:
      "Er is een nieuwe e-commerce aanvraag binnengekomen via het contactformulier.",
    deepText:
      "Een goede webshop verkoopt. Daarom focussen wij op snelheid, vertrouwen en een soepele gebruikerservaring.",
    expectations: [
      "Product- en betaalstructuur bepalen",
      "Conversie- en schaalbaarheidsadvies",
      "Stappenplan richting livegang",
    ],
  },

  development: {
    title: "Maatwerk webontwikkeling",
    introCustomer:
      "Hartelijk dank voor uw bericht. Uw aanvraag voor maatwerk webontwikkeling is goed ontvangen.",
    introAdmin:
      "Er is een nieuwe aanvraag voor maatwerk webontwikkeling binnengekomen.",
    deepText:
      "Bij maatwerk webontwikkeling denken wij actief mee over techniek, schaalbaarheid en toekomstbestendigheid.",
    expectations: [
      "Inventarisatie functionaliteiten",
      "Technisch advies en haalbaarheid",
      "Schaalbare aanpak",
    ],
  },

  seo: {
    title: "Meer zichtbaarheid en online groei",
    introCustomer:
      "Hartelijk dank voor uw bericht. Wij hebben uw SEO-aanvraag goed ontvangen.",
    introAdmin:
      "Er is een nieuwe SEO & marketing aanvraag binnengekomen.",
    deepText:
      "Goede vindbaarheid begint bij een sterke technische basis en een duidelijke langetermijnstrategie.",
    expectations: [
      "SEO analyse",
      "Concrete verbeterpunten",
      "Transparant groeiplan",
    ],
  },

  other: {
    title: "Uw aanvraag is ontvangen",
    introCustomer:
      "Hartelijk dank voor uw bericht. Wij hebben uw aanvraag goed ontvangen en nemen contact met u op.",
    introAdmin:
      "Er is een nieuwe contactaanvraag binnengekomen.",
    deepText:
      "Elke aanvraag is uniek. Wij bekijken zorgvuldig wat de beste vervolgstap is.",
    expectations: [
      "Persoonlijke opvolging",
      "Meedenken in oplossingen",
      "Eerlijk advies",
    ],
  },
};

/* =======================
   PAKKET-SPECIFIEKE COPY
======================= */

const packageCopy: Record<string, { title: string; text: string }> = {
  Starter: {
    title: "Gekozen pakket: Starter",
    text:
      "De klant kiest voor een solide basis met een professionele en overzichtelijke aanpak.",
  },
  Groei: {
    title: "Gekozen pakket: Groei",
    text:
      "De klant wil doorgroeien en verwacht strategisch meedenken en schaalbaarheid.",
  },
  Pro: {
    title: "Gekozen pakket: Pro",
    text:
      "De klant kiest voor volledig maatwerk en maximale impact.",
  },
};

/* =======================
   FOOTER (EMAIL SAFE)
======================= */

const emailFooter = `
<hr style="border:none;border-top:1px solid #2a2a2a;margin:32px 0;" />

<p style="font-size:14px;color:#aaa;line-height:1.6;">
<strong>Vos Web Designs</strong><br />
Premium webdesign & ontwikkeling<br /><br />

📧 <a href="mailto:info@voswebdesigns.nl" style="color:#D4AF37;text-decoration:none;">info@voswebdesigns.nl</a><br />
📍 Lelystad, Nederland
</p>

<p style="font-size:12px;color:#666;">
© ${new Date().getFullYear()} Vos Web Designs · Alle rechten voorbehouden<br />
<a href="https://voswebdesigns.nl/privacy" style="color:#666;">Privacybeleid</a> ·
<a href="https://voswebdesigns.nl/voorwaarden" style="color:#666;">Algemene voorwaarden</a>
</p>
`;

/* =======================
   SHARED TEMPLATE
======================= */

const sharedTemplate = (data: any, isAdmin = false) => {
  const service = serviceCopy[data.service] || serviceCopy.other;
  const pkg = packageCopy[data.package];

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
<h1 style="color:#D4AF37;">${service.title}</h1>
<p style="color:#aaa;">Vos Web Designs</p>
</td>
</tr>

<tr>
<td style="padding:0 40px 32px;font-size:16px;line-height:1.7;">

${isAdmin ? "<p><strong>Nieuwe aanvraag ontvangen</strong></p>" : `<p>Beste <strong>${data.name}</strong>,</p>`}

<p>${isAdmin ? service.introAdmin : service.introCustomer}</p>
<p>${service.deepText}</p>

${pkg ? `<h3 style="color:#D4AF37;">${pkg.title}</h3><p>${pkg.text}</p>` : ""}

<div style="margin:28px 0;padding:22px;background:#1a1a1a;border-radius:12px;border:1px solid #2a2a2a;">
<strong style="color:#D4AF37;">${isAdmin ? "Aanvraaggegevens" : "Samenvatting van uw aanvraag"}</strong><br /><br />
<strong>Naam:</strong> ${data.name}<br />
<strong>Email:</strong> ${data.email}<br />
<strong>Telefoon:</strong> ${data.phone || "-"}<br />
<strong>Bedrijf:</strong> ${data.company || "-"}<br />
<strong>Dienst:</strong> ${data.service || "-"}<br />
<strong>Pakket:</strong> ${data.package || "-"}<br /><br />
<strong>Bericht:</strong><br />
${data.message}
</div>

<p><strong>Wat kunt u verwachten?</strong></p>
<ul>
${service.expectations.map(e => `<li>${e}</li>`).join("")}
</ul>

<p>
Met vriendelijke groet,<br />
<strong>Melvin Vos</strong><br />
Vos Web Designs
</p>

${emailFooter}

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

    // ADMIN MAIL (zelfde layout)
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [BCC_EMAIL],
      subject: `Nieuwe aanvraag: ${data.name}`,
      html: sharedTemplate(data, true),
    });

    // CUSTOMER MAIL + BCC
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email],
      bcc: [BCC_EMAIL],
      reply_to: BCC_EMAIL,
      subject: "Wij hebben uw bericht ontvangen",
      html: sharedTemplate(data, false),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("CONTACT MAIL ERROR:", error);
    return res.status(500).json({ error: "Mail failed" });
  }
}