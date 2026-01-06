import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Palette,
  Code,
  ShoppingCart,
  Search,
  Zap,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';

const ServicesPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const getCTA = (name) => {
    if (name === 'Starter') return 'Start eenvoudig';
    if (name === 'Groei') return 'Beste keuze – start nu';
    return 'Plan een kennismaking';
  };

  const getDelivery = (name) => {
    if (name === 'Starter') return 'Meestal binnen 1–2 weken opgeleverd';
    if (name === 'Groei') return 'Meestal binnen 2–4 weken opgeleverd';
    return 'Planning in overleg';
  };

  /* =========================
     SERVICES (ONGEWIJZIGD)
  ========================= */
  const services = [
    {
      icon: <Palette size={36} />,
      title: 'Webdesign',
      shortDescription: 'Professioneel design voor starters & kleine bedrijven',
      description:
        'Perfect voor ondernemers die nét beginnen en een sterke, betrouwbare online uitstraling willen zonder hoge instapkosten.',
      image: '/webde.png',
      highlightedPackage: 'Groei',
      highlightLabel: 'Meest gekozen',
      packages: [
        { name: 'Starter', price: '€349', features: ['1–2 pagina’s','Modern & responsive design','Contactformulier','Basis SEO'] },
        { name: 'Groei', price: '€649', features: ['Tot 5 pagina’s','Conversiegericht ontwerp','Subtiele animaties','SEO & performance basis'] },
        { name: 'Pro', price: '€995', features: ['Volledig maatwerk design','Unieke branding look','Uitbreidbaar voor groei','Persoonlijke begeleiding'] }
      ]
    },
    {
      icon: <Code size={36} />,
      title: 'Webontwikkeling',
      shortDescription: 'Betrouwbare techniek zonder onnodige complexiteit',
      description:
        'Voor websites en webapplicaties die stabiel moeten werken en later eenvoudig uit te breiden zijn.',
      image: '/webon.png',
      highlightedPackage: 'Groei',
      highlightLabel: 'Beste balans',
      packages: [
        { name: 'Starter', price: '€595', features: ['Professionele website','Snelle laadtijden','Eenvoudig beheerbaar'] },
        { name: 'Groei', price: '€995', features: ['Uitgebreide pagina’s','Formulieren & koppelingen','Performance optimalisatie'] },
        { name: 'Pro', price: '€1.495', features: ['Custom functionaliteit','Database of login systeem','Doorontwikkelbaar platform'] }
      ]
    },
    {
      icon: <ShoppingCart size={36} />,
      title: 'E-commerce',
      shortDescription: 'Start eenvoudig met online verkopen',
      description:
        'Ideaal voor ondernemers die hun eerste webshop willen starten zonder direct grote investeringen.',
      image: '/ecom.png',
      highlightedPackage: 'Starter',
      highlightLabel: 'Ideaal voor starters',
      packages: [
        { name: 'Starter', price: '€895', features: ['Tot 10 producten','iDEAL betalingen','Gebruiksvriendelijk beheer'] },
        { name: 'Groei', price: '€1.495', features: ['Onbeperkt producten','Kortingen & acties','Conversiegericht design'] },
        { name: 'Pro', price: '€2.495', features: ['Maatwerk webshop','Automatiseringen','Analytics & optimalisatie'] }
      ]
    },
    {
      icon: <Search size={36} />,
      title: 'SEO & Marketing',
      shortDescription: 'Gevonden worden in Google, stap voor stap',
      description:
        'Geen dure contracten, maar duidelijke maandelijkse optimalisatie gericht op zichtbaarheid en groei.',
      image: '/seo.png',
      highlightedPackage: 'Starter',
      highlightLabel: 'Laagdrempelig',
      packages: [
        { name: 'Starter', price: '€149 / maand', features: ['Technische SEO check','Basis optimalisatie','Maandelijkse rapportage'] },
        { name: 'Groei', price: '€299 / maand', features: ['Content optimalisatie','Lokale SEO','Actieplan per maand'] },
        { name: 'Pro', price: '€499 / maand', features: ['Concurrentie analyse','Doorlopende optimalisatie','Structurele groei'] }
      ]
    },
    {
      icon: <Zap size={36} />,
      title: 'Performance Optimalisatie',
      shortDescription: 'Snelle winst voor je website',
      description:
        'Een snellere website zorgt direct voor betere gebruikservaring en hogere conversies.',
      image: '/performance.png',
      highlightedPackage: 'Starter',
      highlightLabel: 'Quick win',
      packages: [
        { name: 'Starter', price: '€295', features: ['Snelheidsanalyse','Afbeelding optimalisatie','Basis caching'] },
        { name: 'Groei', price: '€495', features: ['Core Web Vitals','Lazy loading','Code optimalisatie'] },
        { name: 'Pro', price: '€795', features: ['Geavanceerde optimalisatie','Monitoring','Advies voor groei'] }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Diensten – Vos Web Designs</title>
      </Helmet>

      <main className="pt-24 pb-24 bg-[#0a0a0a] space-y-32">

        {/* HERO */}
        <section className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6">
            Professionele websites die écht voor je werken
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Van eerste website tot schaalbare online oplossing. Transparant, betaalbaar
            en zonder technische zorgen.
          </p>
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black px-8 py-4 text-lg">
              Gratis kennismaking
            </Button>
          </Link>
        </section>

        {/* USP */}
        <section className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          {['Transparante prijzen','Geen aanbetaling','Snelle oplevering','Persoonlijk contact'].map(item => (
            <div key={item} className="border border-gray-800 rounded-xl p-6 bg-[#0f0f0f]">
              <CheckCircle className="mx-auto mb-4 text-[#D4AF37]" />
              <p className="text-gray-300">{item}</p>
            </div>
          ))}
        </section>

        {/* SERVICES */}
        <section ref={ref} className="container mx-auto px-4 space-y-32">
          {services.map(service => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="space-y-16"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-16 h-16 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-xl text-gray-300 mb-4">{service.shortDescription}</p>
                  <p className="text-gray-400">{service.description}</p>
                </div>
                <img src={service.image} alt={service.title} className="rounded-2xl border border-gray-800" />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {service.packages.map(pkg => {
                  const isHighlighted = pkg.name === service.highlightedPackage;
                  const isStarter = pkg.name === 'Starter';

                  return (
                    <div
                      key={pkg.name}
                      className={`relative rounded-2xl border p-8 ${
                        isHighlighted
                          ? 'border-[#D4AF37] bg-[#121212] scale-105'
                          : 'border-gray-800 bg-[#0f0f0f]'
                      }`}
                    >
                      {isHighlighted && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black text-sm px-4 py-1 rounded-full flex items-center gap-1">
                          <Star size={14} /> {service.highlightLabel}
                        </div>
                      )}

                      {isStarter && (
                        <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] border border-[#D4AF37]/30">
                          Perfect voor starters
                        </div>
                      )}

                      <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-[#D4AF37] text-3xl font-bold">
                        {isStarter && <span className="text-base text-gray-400 mr-1">Vanaf</span>}
                        {pkg.price}
                      </p>

                      <p className="text-sm text-gray-400 mt-1">{getDelivery(pkg.name)}</p>
                      <p className="text-xs text-gray-500 mb-4">Geen aanbetaling nodig • Persoonlijk contact</p>

                      <ul className="space-y-3 mb-8">
                        {pkg.features.map(f => (
                          <li key={f} className="flex gap-2 text-gray-300">
                            <CheckCircle size={18} className="text-[#D4AF37]" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <Link to="/contact">
                        <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black">
                          {getCTA(pkg.name)}
                          <ArrowRight className="ml-2" size={18} />
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-10">Veelgestelde vragen</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Moet ik vooraf betalen?',
                a: 'Nee. Wij werken zonder aanbetaling. We starten pas nadat alles duidelijk is afgestemd.'
              },
              {
                q: 'Hoe lang duurt een project gemiddeld?',
                a: 'Starter-projecten zijn vaak binnen 1–2 weken klaar. Grotere projecten worden vooraf ingepland.'
              },
              {
                q: 'Kan ik later uitbreiden?',
                a: 'Ja. Alle websites en webshops zijn zo opgebouwd dat uitbreiden altijd mogelijk is.'
              },
              {
                q: 'Is support inbegrepen?',
                a: 'Ja. Na oplevering kun je altijd bij ons terecht voor vragen of kleine aanpassingen.'
              },
              {
                q: 'Blijft de website mijn eigendom?',
                a: 'Ja. Na oplevering is de website volledig van jou.'
              }
            ].map(item => (
              <div key={item.q} className="border border-gray-800 rounded-xl p-6 bg-[#0f0f0f]">
                <h3 className="font-semibold mb-2">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EINDE CTA */}
        <section className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Klaar om professioneel te groeien?
          </h2>
          <p className="text-gray-400 mb-8">
            Plan vrijblijvend een kennismaking en ontdek welke oplossing het beste past bij jouw situatie.
          </p>
          <Link to="/contact">
            <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black px-10 py-4 text-lg">
              Start vandaag nog
            </Button>
          </Link>
        </section>

      </main>
    </>
  );
};

export default ServicesPage;