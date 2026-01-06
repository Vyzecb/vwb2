import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1️⃣ Mail naar jou
    await resend.emails.send({
      from: "Vos Web Designs <noreply@voswebdesigns.nl>",
      to: ["info@voswebdesigns.nl"],
      subject: `Nieuw contactbericht van ${data.name}`,
      html: `
        <h2>Nieuw contactformulier</h2>
        <p><strong>Naam:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefoon:</strong> ${data.phone || "-"}</p>
        <p><strong>Bedrijf:</strong> ${data.company || "-"}</p>
        <p><strong>Dienst:</strong> ${data.service || "-"}</p>
        <p><strong>Pakket:</strong> ${data.package || "-"}</p>
        <p><strong>Bericht:</strong><br/>${data.message}</p>
      `
    });

    // 2️⃣ Bevestiging naar klant
    await resend.emails.send({
      from: "Vos Web Designs <info@voswebdesigns.nl>",
      to: [data.email],
      subject: "Wij hebben uw bericht ontvangen",
      html: `
        <p>Beste ${data.name},</p>
        <p>Bedankt voor uw bericht. Wij nemen binnen 24 uur contact met u op.</p>
        <p>Met vriendelijke groet,<br/>Vos Web Designs</p>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}