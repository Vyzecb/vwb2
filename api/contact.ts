import type { VercelRequest, VercelResponse } from "@vercel/node";

/* =======================
   CONFIG
======================= */

const LOGO_URL = "https://voswebdesigns.nl/logo.jpeg";
const FROM_EMAIL = "Vos Web Designs <info@voswebdesigns.nl>";
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
   TEMPLATES
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

const customerTemplate = (data: any) => {
  const content = serviceCopy[data.service] || serviceCopy.other;

  return `
<h2>${content.title}</h2>

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

    /* ---------- ADMIN MAIL ---------- */
    const adminResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      reply_to: ADMIN_EMAIL, // 🔒 vast & veilig
      subject: `Nieuw contactbericht van ${data.name}`,
      html: adminTemplate(data),
    });

    if (!adminResult?.id) {
      throw new Error("Admin mail failed");
    }

    /* ---------- CUSTOMER MAIL ---------- */
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