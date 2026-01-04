
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const TermsPage = () => {
  return (
    <>
      <Helmet>
        <title>Algemene Voorwaarden - Vos Web Designs</title>
        <meta name="description" content="Algemene Voorwaarden van Vos Web Designs. Lees hier onze leveringsvoorwaarden en condities." />
      </Helmet>

      <main className="pt-24 pb-16 bg-[#0a0a0a] min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
              Algemene Voorwaarden
            </h1>
            
            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artikel 1. Definities</h2>
                <p>In deze algemene voorwaarden wordt verstaan onder: Vos Web Designs: de gebruiker van deze algemene voorwaarden. Opdrachtgever: de wederpartij van Vos Web Designs.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artikel 2. Toepasselijkheid</h2>
                <p>Deze voorwaarden zijn van toepassing op alle aanbiedingen en overeenkomsten tussen Vos Web Designs en Opdrachtgever, tenzij schriftelijk anders is overeengekomen.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artikel 3. Offertes</h2>
                <p>Alle offertes en aanbiedingen van Vos Web Designs zijn vrijblijvend, tenzij in de offerte een termijn voor aanvaarding is gesteld. Een offerte vervalt indien het product waarop de offerte betrekking heeft in de tussentijd niet meer beschikbaar is.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artikel 4. Uitvoering van de overeenkomst</h2>
                <p>Vos Web Designs zal de overeenkomst naar beste inzicht en vermogen en overeenkomstig de eisen van goed vakmanschap uitvoeren. Indien en voor zover een goede uitvoering van de overeenkomst dit vereist, heeft Vos Web Designs het recht bepaalde werkzaamheden te laten verrichten door derden.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artikel 5. Betaling</h2>
                <p>Betaling dient te geschieden binnen 14 dagen na factuurdatum, op een door Vos Web Designs aan te geven wijze in de valuta waarin is gefactureerd.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artikel 6. Aansprakelijkheid</h2>
                <p>Vos Web Designs is niet aansprakelijk voor schade, van welke aard ook, ontstaan doordat Vos Web Designs is uitgegaan van door of namens de Opdrachtgever verstrekte onjuiste en/of onvolledige gegevens.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Artikel 7. Intellectueel eigendom</h2>
                <p>Vos Web Designs behoudt zich de rechten en bevoegdheden voor die hem toekomen op grond van de Auteurswet en andere intellectuele wet- en regelgeving.</p>
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

export default TermsPage;
