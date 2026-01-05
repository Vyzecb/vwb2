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
      subtitle: 'Professioneel design voor starters & groeiende bedrijven',
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
            'Basis SEO setup',
            'Snelle oplevering'
          ]
        },
        {
          name: 'Groei',
          price: '€1.195',
          highlight: true,
          features: [
            'Tot 6 pagina’s',
            'Uniek UI/UX design',
            'Conversiegericht ontwerp',
            'Animaties & interacties',
            'SEO basis + performance'
          ]
        },
        {
          name: 'Pro',
          price: '€1.995',
          highlight: false,
          features: [
            'Volledig maatwerk',
            'Design system',
            'A/B conversie focus',
            'Geavanceerde animaties',
            'Premium support'
          ]
        }
      ]
    },
    {
      icon: <Code size={36} />,
      title: 'Webontwikkeling',
      subtitle: 'Snelle, schaalbare websites & webapps',
      image: '/webon.png',
      packages: [
        {
          name: 'Starter',
          price: '€1.250',
          highlight: false,
          features: [
            'Professionele website',
            'React / moderne stack',
            'CMS integratie',
            'Basis beveiliging'
          ]
        },
        {
          name: 'Groei',
          price: '€2.250',
          highlight: true,
          features: [
            'Next.js / API koppelingen',
            'Database integratie',
            'Snelle performance',
            'Uitbreidbaar systeem'
          ]
        },
        {
          name: 'Pro',
          price: '€3.995',
          highlight: false,
          features: [
            'Complexe webapp',
            'Custom backend',
            'Authenticatie',
            'Langdurige support'
          ]
        }
      ]
    },
    {
      icon: <ShoppingCart size={36} />,
      title: 'E-commerce',
      subtitle: 'Webshops die verkopen',
      image: '/ecom.png',
      packages: [
        {
          name: 'Starter',
          price: '€1.995',
          highlight: false,
          features: [
            'Tot 10 producten',
            'iDEAL / betaling',
            'Responsive webshop',
            'Basis voorraad'
          ]
        },
        {
          name: 'Groei',
          price: '€3.495',
          highlight: true,
          features: [
            'Onbeperkt producten',
            'Kortingen & coupons',
            'Conversie optimalisatie',
            'Orderbeheer'
          ]
        },
        {
          name: 'Pro',
          price: '€5.995',
          highlight: false,
          features: [
            'Custom e-commerce',
            'Automatiseringen',
            'Analytics & funnels',
            'Premium support'
          ]
        }
      ]
    },
    {
      icon: <Search size={36} />,
      title: 'SEO & Marketing',
      subtitle: 'Meer zichtbaarheid, meer klanten',
      image: '/seo.png',
      packages: [
        {
          name: 'Starter',
          price: '€249 / mnd',
          highlight: false,
          features: [
            'Technische SEO',
            'Keyword optimalisatie',
            'Basis rapportage'
          ]
        },
        {
          name: 'Groei',
          price: '€499 / mnd',
          highlight: true,
          features: [
            'Content optimalisatie',
            'Local SEO',
            'Maandelijkse strategie'
          ]
        },
        {
          name: 'Pro',
          price: '€899 / mnd',
          highlight: false,
          features: [
            'Linkbuilding',
            'Concurrentie analyse',
            'Doorlopende optimalisatie'
          ]
        }
      ]
    },
    {
      icon: <Zap size={36} />,
      title: 'Performance',
      subtitle: 'Snellere websites = meer conversies',
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
            'Advanced caching',
            'Monitoring'
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
        <section className="container mx-auto px-4 text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">
            Transparante{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
              Pakketten
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Betaalbaar voor starters. Schaalbaar voor groei.
          </p>
        </section>

        <section ref={ref} className="container mx-auto px-4 space-y-32">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <div className="mx-auto mb-4 w-16 h-16 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  {service.icon}
                </div>
                <h2 className="text-4xl font-bold">{service.title}</h2>
                <p className="text-gray-400 mt-3">{service.subtitle}</p>
              </div>

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