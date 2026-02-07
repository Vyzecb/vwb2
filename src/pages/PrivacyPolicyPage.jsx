
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Helmet>
        <title>Privacybeleid - Vos Web Designs</title>
        <meta name="description" content="Privacybeleid van Vos Web Designs. Lees hoe wij omgaan met uw gegevens volgens de AVG/GDPR richtlijnen." />
      </Helmet>

      <main className="pt-24 pb-16 bg-[#0f172a] min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#38bdf8] to-[#60a5fa] bg-clip-text text-transparent">
              Privacybeleid
            </h1>
            
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Inleiding</h2>
                <p>Vos Web Designs respecteert de privacy van alle gebruikers van haar site en draagt er zorg voor dat de persoonlijke informatie die u ons verschaft vertrouwelijk wordt behandeld. Wij gebruiken uw gegevens om de dienstverlening zo snel en gemakkelijk mogelijk te laten verlopen. Dit privacybeleid is van toepassing op alle diensten van Vos Web Designs.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Gegevensverwerking</h2>
                <p>Wanneer u zich aanmeldt voor een van onze diensten of contact met ons opneemt, vragen we u om persoonsgegevens te verstrekken. Deze gegevens worden gebruikt om de dienst uit te kunnen voeren. De gegevens worden opgeslagen op eigen beveiligde servers van Vos Web Designs of die van een derde partij.</p>
                <ul className="list-disc pl-6 mt-4 space-y-2">
                  <li>NAW-gegevens</li>
                  <li>Telefoonnummer</li>
                  <li>E-mailadres</li>
                  <li>Bedrijfsgegevens</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Doeleinden</h2>
                <p>Wij verzamelen of gebruiken geen informatie voor andere doeleinden dan de doeleinden die worden beschreven in dit privacybeleid tenzij we van tevoren uw toestemming hiervoor hebben verkregen.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Bewaartermijn</h2>
                <p>Wij bewaren uw gegevens niet langer dan noodzakelijk is voor de doeleinden waarvoor ze zijn verzameld, tenzij een langere bewaartermijn wettelijk verplicht is.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Uw Rechten</h2>
                <p>U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door Vos Web Designs.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Contact</h2>
                <p>Als u vragen heeft over dit privacybeleid, kunt u contact met ons opnemen via info@voswebdesigns.nl.</p>
              </section>
              
              <div className="pt-8 text-sm text-gray-500">
                Laatst bijgewerkt: 4 januari 2026
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicyPage;
