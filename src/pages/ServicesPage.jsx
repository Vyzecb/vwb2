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
        'Wij creëren visueel aantrekkelijke, gebruiksvriendelijke designs die perfect aansluiten bij uw merkidentiteit. Elk design is uniek en gericht op het verhogen van conversies en gebruikersengagement.',
      image: '/webde.png',
      packages: [
        {
          name: 'Starter',
          price: '€695',
          highlight: false,
          features: [
            '1–3 pagina’s',
            'Modern responsive design',
            'Contactformulier',
            'Basis SEO'
          ]
        },
        {
          name: 'Groei',
          price: '€1.195',
          highlight: true,
          features: [
            'Tot 6 pagina’s',
            'Conversiegericht design',
            'Animaties & interacties',
            'SEO + performance'
          ]
        },
        {
          name: 'Pro',
          price: '€1.995',
          highlight: false,
          features: [
            'Volledig maatwerk',
            'Design system',
            'A/B testing',
            'Premium support'
          ]
        }
      ]
    },
    {
      icon: <Code size={36} />,
      title: 'Webontwikkeling',
      shortDescription: 'Krachtige, schaalbare websites gebouwd met moderne technologieën',
      description:
        'Van eenvoudige websites tot complexe webapplicaties. Wij bouwen snelle, veilige en schaalbare oplossingen met moderne technologieën die meegroeien met uw bedrijf.',
      image: '/webon.png',
      packages: [
        {
          name: 'Starter',
          price: '€1.250',
          highlight: false,
          features: [
            'Professionele website',
            'Moderne tech stack',
            'CMS integratie'
          ]
        },
        {
          name: 'Groei',
          price: '€2.250',
          highlight: true,
          features: [
            'Next.js / API koppelingen',
            'Database integratie',
            'Performance optimalisatie'
          ]
        },
        {
          name: 'Pro',
          price: '€3.995',
          highlight: false,
          features: [
            'Custom webapp',
            'Authenticatie',
            'Langdurige support'
          ]
        }
      ]
    },
    {
      icon: <ShoppingCart size={36} />,
      title: 'E-commerce',
      shortDescription: 'Complete online winkels die verkopen stimuleren',
      description:
        'Wij bouwen krachtige webshops die niet alleen mooi zijn, maar ook converteren. Van productbeheer tot betaalintegraties – alles wordt voor u geregeld.',
      image: '/ecom.png',
      packages: [
        {
          name: 'Starter',
          price: '€1.995',
          highlight: false,
          features: [
            'Tot 10 producten',
            'iDEAL betalingen',
            'Basis voorraadbeheer'
          ]
        },
        {
          name: 'Groei',
          price: '€3.495',
          highlight: true,
          features: [
            'Onbeperkt producten',
            'Kortingen & coupons',
            'Conversie optimalisatie'
          ]
        },
        {
          name: 'Pro',
          price: '€5.995',
          highlight: false,
          features: [
            'Maatwerk webshop',
            'Automatiseringen',
            'Analytics & funnels'
          ]
        }
      ]
    },
    {
      icon: <Search size={36} />,
      title: 'SEO & Marketing',
      shortDescription: 'Vergroot uw online zichtbaarheid en trek meer klanten aan',
      description:
        'Zichtbaar zijn in Google is essentieel. Wij optimaliseren uw website technisch en inhoudelijk om structureel meer bezoekers en aanvragen te genereren.',
      image: '/seo.png',
      packages: [
        {
          name: 'Starter',
          price: '€249 / maand',
          highlight: false,
          features: [
            'Technische SEO',
            'Basis optimalisatie',
            'Rapportage'
          ]
        },
        {
          name: 'Groei',
          price: '€499 / maand',
          highlight: true,
          features: [
            'Content optimalisatie',
            'Local SEO',
            'Maandelijkse strategie'
          ]
        },
        {
          name: 'Pro',
          price: '€899 / maand',
          highlight: false,
          features: [
            'Linkbuilding',
            'Concurrentie analyse',
            'Doorlopende groei'
          ]
        }
      ]
    },
    {
      icon: <Zap size={36} />,
      title: 'Performance Optimalisatie',
      shortDescription: 'Snellere websites voor betere conversies',
      description:
        'Een trage website kost klanten. Wij optimaliseren snelheid, Core Web Vitals en technische prestaties voor maximale impact.',
      image: '/performance.png',
      packages: [
        {
          name: 'Starter',
          price: '€495',
          highlight: false,
          features: [
            'Speed audit',
            'Afbeelding optimalisatie',
            'Basis caching'
          ]
        },
        {
          name: 'Groei',
          price: '€895',
          highlight: true,
          features: [
            'Core Web Vitals',
            'Lazy loading',
            'Code optimalisatie'
          ]
        },
        {
          name: 'Pro',
          price: '€1.495',
          highlight: false,
          features: [
            'CDN setup',
            'Monitoring',
            'Doorlopende optimalisatie'
          ]
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
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="space-y-16"
            >
              {/* INFO + IMAGE */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-16 h-16 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-xl text-gray-300 mb-4">
                    {service.shortDescription}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-gray-800">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* PACKAGES */}
              <div className="grid md:grid-cols-3 gap-8">
                {service.packages.map((pkg, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-2xl border p-8 ${
                      pkg.highlight
                        ? 'border-[#D4AF37] bg-[#121212] scale-105'
                        : 'border-gray-800 bg-[#0f0f0f]'
                    }`}
                  >
                    {pkg.highlight && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black text-sm px-4 py-1 rounded-full flex items-center gap-1">
                        <Star size={14} /> Meest gekozen
                      </div>
                    )}

                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <p className="text-[#D4AF37] text-3xl font-bold mb-6">
                      {pkg.price}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((f, fi) => (
                        <li key={fi} className="flex gap-2 text-gray-300">
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
                ))}
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </>
  );
};

export default ServicesPage;