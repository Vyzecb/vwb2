
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Palette, 
  Code, 
  ShoppingCart, 
  Search, 
  Zap,
  CheckCircle
} from 'lucide-react';

const ServicesPage = () => {
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: '-100px' });

  const services = [
    {
      icon: <Palette size={40} />,
      title: 'Webdesign',
      shortDescription: 'Luxe, op maat gemaakte designs die uw merk tot leven brengen',
      description: 'Wij creëren visueel aantrekkelijke, gebruiksvriendelijke designs die perfect aansluiten bij uw merkidentiteit. Elk design is uniek en gericht op het verhogen van conversies en gebruikersengagement.',
      features: [
        'Custom UI/UX design',
        'Responsive design voor alle apparaten',
        'Merkidentiteit integratie',
        'Interactive prototypes',
        'A/B testing voor optimale conversie',
        'Design system en style guide'
      ],
      pricing: 'Vanaf €2.500',
      timeline: '2-4 weken',
      image: '/webde.png'
    },
    {
      icon: <Code size={40} />,
      title: 'Webontwikkeling',
      shortDescription: 'Krachtige, schaalbare websites gebouwd met moderne technologieën',
      description: 'Van eenvoudige brochure websites tot complexe webapplicaties - wij bouwen robuuste, snelle en veilige oplossingen die meegroeien met uw bedrijf. We gebruiken de nieuwste technologieën en best practices.',
      features: [
        'Frontend development (React, Next.js)',
        'Backend development en APIs',
        'Content Management Systemen (CMS)',
        'Database design en integratie',
        'Cloud hosting en deployment',
        'Onderhoud en support'
      ],
      pricing: 'Vanaf €4.000',
      timeline: '4-8 weken',
      image: '/webon.png'
    },
    {
      icon: <ShoppingCart size={40} />,
      title: 'E-commerce Oplossingen',
      shortDescription: 'Complete online winkels die verkopen stimuleren',
      description: 'Wij bouwen krachtige e-commerce platforms die niet alleen mooi zijn, maar ook optimaal converteren. Van productcatalogus tot betaalintegratie - wij regelen alles voor een succesvolle online winkel.',
      features: [
        'Custom webshop design',
        'Product management systeem',
        'Betaalintegraties (iDEAL, creditcard, etc.)',
        'Voorraad en order management',
        'Verzendintegraties',
        'Analytics en rapportages'
      ],
      pricing: 'Vanaf €6.000',
      timeline: '6-12 weken',
      image: '/ecom.png'
    },
    {
      icon: <Search size={40} />,
      title: 'SEO & Marketing',
      shortDescription: 'Vergroot uw online zichtbaarheid en trek meer klanten aan',
      description: 'Zichtbaar zijn in zoekmachines is essentieel voor succes. Wij optimaliseren uw website voor Google en andere zoekmachines, zodat potentiële klanten u gemakkelijk kunnen vinden.',
      features: [
        'Technische SEO optimalisatie',
        'Keyword research en strategie',
        'Content optimalisatie',
        'Link building',
        'Local SEO voor lokale zichtbaarheid',
        'Maandelijkse rapportages en analyses'
      ],
      pricing: 'Vanaf €750/maand',
      timeline: 'Doorlopend',
      image: '/seo.png'
    },
    {
      icon: <Zap size={40} />,
      title: 'Performance Optimalisatie',
      shortDescription: 'Bliksemsnelle websites voor betere gebruikerservaring en conversies',
      description: 'Langzame websites verliezen klanten. Wij optimaliseren uw website voor maximale snelheid en prestaties, wat resulteert in betere rankings, meer conversies en tevreden gebruikers.',
      features: [
        'Core Web Vitals optimalisatie',
        'Image en asset optimalisatie',
        'Code splitting en lazy loading',
        'Caching strategieën',
        'CDN implementatie',
        'Continuous monitoring en verbetering'
      ],
      pricing: 'Vanaf €1.500',
      timeline: '1-2 weken',
      image: '/performance.png'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Diensten - Vos Web Designs | Premium Webdesign & Ontwikkeling</title>
        <meta
          name="description"
          content="Ontdek onze diensten: van webdesign en ontwikkeling tot e-commerce en SEO. Wij bieden complete digitale oplossingen voor ambitieuze bedrijven."
        />
      </Helmet>

      <main className="pt-24 pb-16">
        <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Onze{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Diensten
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Complete digitale oplossingen voor ambitieuze bedrijven. Van concept tot lancering en daarna.
              </p>
            </motion.div>
          </div>
        </section>

        <section ref={servicesRef} className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="aspect-video rounded-2xl overflow-hidden border border-gray-800">
                     <img 
  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
  alt={service.title}
  src={service.image}
/>                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37]/10 to-[#F4E4C1]/10 rounded-xl flex items-center justify-center mb-6 text-[#D4AF37]">
                      {service.icon}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                    <p className="text-xl text-gray-300 mb-6">{service.shortDescription}</p>
                    <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>

                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle size={20} className="text-[#D4AF37] mt-0.5 shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-6 mb-6">
                      <div>
                        <span className="text-gray-400 text-sm">Prijs</span>
                        <p className="text-[#D4AF37] font-bold">{service.pricing}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Doorlooptijd</span>
                        <p className="text-white font-semibold">{service.timeline}</p>
                      </div>
                    </div>

                    <Link to="/contact">
                      <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black hover:opacity-90 transition-opacity">
                        Vraag Offerte Aan
                        <ArrowRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                  Niet Gevonden Wat U Zoekt?
                </h2>
                <p className="text-xl text-gray-300 text-center mb-8">
                  We bieden ook maatwerk oplossingen. Neem contact op en vertel ons over uw project.
                </p>
                <div className="flex justify-center">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black hover:opacity-90 transition-opacity"
                    >
                      Bespreek Uw Project
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ServicesPage;
