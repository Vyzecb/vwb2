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

  const services = [
    {
      icon: <Palette size={36} />,
      title: 'Webdesign',
      shortDescription: 'Luxe, op maat gemaakte designs die uw merk tot leven brengen',
      description:
        'Wij creëren visueel aantrekkelijke, gebruiksvriendelijke designs die perfect aansluiten bij uw merkidentiteit.',
      image: '/webde.png',
      highlightedPackage: 'Groei',
      highlightLabel: 'Meest gekozen',
      packages: [
        {
          name: 'Starter',
          price: '€695',
          features: ['1–3 pagina’s', 'Responsive design', 'Contactformulier', 'Basis SEO']
        },
        {
          name: 'Groei',
          price: '€1.195',
          features: ['Tot 6 pagina’s', 'Conversiegericht design', 'Animaties', 'SEO + performance']
        },
        {
          name: 'Pro',
          price: '€1.995',
          features: ['Volledig maatwerk', 'Design system', 'A/B testing', 'Premium support']
        }
      ]
    },

    {
      icon: <Code size={36} />,
      title: 'Webontwikkeling',
      shortDescription: 'Krachtige, schaalbare websites gebouwd met moderne technologieën',
      description:
        'Van eenvoudige websites tot complexe webapplicaties gebouwd voor groei.',
      image: '/webon.png',
      highlightedPackage: 'Pro',
      highlightLabel: 'Meest compleet',
      packages: [
        {
          name: 'Starter',
          price: '€1.250',
          features: ['Professionele website', 'Moderne tech stack', 'CMS integratie']
        },
        {
          name: 'Groei',
          price: '€2.250',
          features: ['API koppelingen', 'Database integratie', 'Performance optimalisatie']
        },
        {
          name: 'Pro',
          price: '€3.995',
          features: ['Custom webapp', 'Authenticatie', 'Langdurige support']
        }
      ]
    },

    {
      icon: <ShoppingCart size={36} />,
      title: 'E-commerce',
      shortDescription: 'Complete online winkels die verkopen stimuleren',
      description:
        'Webshops die niet alleen mooi zijn, maar ook converteren.',
      image: '/ecom.png',
      highlightedPackage: 'Groei',
      highlightLabel: 'Beste prijs / kwaliteit',
      packages: [
        {
          name: 'Starter',
          price: '€1.995',
          features: ['Tot 10 producten', 'iDEAL betalingen', 'Basis voorraadbeheer']
        },
        {
          name: 'Groei',
          price: '€3.495',
          features: ['Onbeperkt producten', 'Kortingen & coupons', 'Conversie optimalisatie']
        },
        {
          name: 'Pro',
          price: '€5.995',
          features: ['Maatwerk webshop', 'Automatiseringen', 'Analytics & funnels']
        }
      ]
    },

    {
      icon: <Search size={36} />,
      title: 'SEO & Marketing',
      shortDescription: 'Vergroot uw online zichtbaarheid',
      description:
        'Structurele groei in Google met een lange termijn strategie.',
      image: '/seo.png',
      highlightedPackage: 'Groei',
      highlightLabel: 'Populair',
      packages: [
        {
          name: 'Starter',
          price: '€249 / maand',
          features: ['Technische SEO', 'Basis optimalisatie', 'Rapportage']
        },
        {
          name: 'Groei',
          price: '€499 / maand',
          features: ['Content optimalisatie', 'Local SEO', 'Maandelijkse strategie']
        },
        {
          name: 'Pro',
          price: '€899 / maand',
          features: ['Linkbuilding', 'Concurrentie analyse', 'Doorlopende groei']
        }
      ]
    },

    {
      icon: <Zap size={36} />,
      title: 'Performance Optimalisatie',
      shortDescription: 'Snellere websites voor betere conversies',
      description:
        'Optimale snelheid en Core Web Vitals voor SEO en UX.',
      image: '/performance.png',
      highlightedPackage: 'Starter',
      highlightLabel: 'Snelle winst',
      packages: [
        {
          name: 'Starter',
          price: '€495',
          features: ['Speed audit', 'Afbeelding optimalisatie', 'Basis caching']
        },
        {
          name: 'Groei',
          price: '€895',
          features: ['Core Web Vitals', 'Lazy loading', 'Code optimalisatie']
        },
        {
          name: 'Pro',
          price: '€1.495',
          features: ['CDN setup', 'Monitoring', 'Doorlopende optimalisatie']
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Diensten – Vos Web Designs</title>
      </Helmet>

      <main className="pt-24 pb-20 bg-[#0a0a0a]">
        <section ref={ref} className="container mx-auto px-4 space-y-32">
          {services.map(service => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="space-y-16"
            >
              {/* INFO */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-16 h-16 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-xl text-gray-300 mb-4">{service.shortDescription}</p>
                  <p className="text-gray-400">{service.description}</p>
                </div>

                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-2xl border border-gray-800"
                />
              </div>

              {/* PACKAGES */}
              <div className="grid md:grid-cols-3 gap-8">
                {service.packages.map(pkg => {
                  const isHighlighted = pkg.name === service.highlightedPackage;

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

                      <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-[#D4AF37] text-3xl font-bold mb-6">
                        {pkg.price}
                      </p>

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
                          Start mijn project
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
      </main>
    </>
  );
};

export default ServicesPage;