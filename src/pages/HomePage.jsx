
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Award, Users, TrendingUp, Star, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const heroRef = useRef(null);
  const uspRef = useRef(null);
  const projectsRef = useRef(null);
  const testimonialsRef = useRef(null);

  const uspInView = useInView(uspRef, { once: true, margin: '-100px' });
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const handleSmoothScroll = (e) => {
      if (e.target.hash) {
        e.preventDefault();
        const element = document.querySelector(e.target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  const usps = [
    {
      icon: <Zap size={32} />,
      title: 'Razendsnelle Websites',
      description: 'Geoptimaliseerd voor snelheid en prestaties. Onze websites laden in minder dan 2 seconden.',
    },
    {
      icon: <Award size={32} />,
      title: 'Premium Design',
      description: 'Luxe, moderne designs die uw merk naar een hoger niveau tillen en conversies verhogen.',
    },
    {
      icon: <Users size={32} />,
      title: 'Persoonlijke Service',
      description: 'Directe communicatie met uw dedicated designer. Geen tussenpersonen, alleen resultaten.',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Bewezen ROI',
      description: 'Onze websites genereren gemiddeld 3x meer conversies dan standaard websites.',
    },
  ];

  const featuredProjects = [
    {
      id: 'luxe-vastgoed',
      title: 'Luxe Vastgoed Amsterdam',
      category: 'Vastgoed',
      image: 'Modern luxury real estate website with Amsterdam canal houses',
      description: 'Premium vastgoedplatform met 360° virtual tours en geavanceerde zoekfunctionaliteit.',
    },
    {
      id: 'boutique-hotel',
      title: 'Boutique Hotel Den Haag',
      category: 'Hospitality',
      image: 'Elegant boutique hotel website with luxury interior design',
      description: 'Exclusief boekingsplatform met directe kamerreservering en concierge service.',
    },
    {
      id: 'advocatenkantoor',
      title: 'Elite Advocatenkantoor',
      category: 'Juridisch',
      image: 'Professional law firm website with modern office interior',
      description: 'Prestigieuze website voor een toonaangevend advocatenkantoor met cliëntportaal.',
    },
  ];

  const testimonials = [
    {
      name: 'Martijn van der Berg',
      company: 'CEO, Luxe Vastgoed Amsterdam',
      text: 'Vos Web Designs heeft onze online aanwezigheid compleet getransformeerd. Sinds de lancering van onze nieuwe website zijn onze aanvragen met 240% gestegen. Het team denkt echt mee en levert premium kwaliteit.',
      rating: 5,
    },
    {
      name: 'Sophie Janssen',
      company: 'Eigenaar, Boutique Hotel Den Haag',
      text: 'Absoluut fantastisch werk! De website is niet alleen prachtig, maar ook ongelofelijk functioneel. Onze directe boekingen zijn met 180% toegenomen. Een investering die zichzelf dubbel en dwars terugbetaalt.',
      rating: 5,
    },
    {
      name: 'Robert de Vries',
      company: 'Managing Partner, Elite Advocaten',
      text: 'Professioneel, betrouwbaar en resultaatgericht. Vos Web Designs begrijpt precies wat nodig is voor een high-end professionele website. Onze cliënten zijn onder de indruk en dat vertaalt zich in meer opdrachten.',
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Vos Web Designs - Premium Webdesign & Ontwikkeling in Nederland</title>
        <meta
          name="description"
          content="Luxe webdesign voor ambitieuze bedrijven. Wij creëren websites die converteren en uw merk laten groeien. Van concept tot lancering - alles onder één dak."
        />
      </Helmet>

      <main className="overflow-x-hidden">
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]" />
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4AF37] rounded-full filter blur-[128px]" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-[128px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-medium mb-6">
                  Premium Webdesign Bureau
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              >
                Websites Die Uw{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Bedrijf Laten Groeien
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto"
              >
                Wij ontwikkelen luxe, conversie-gerichte websites voor ambitieuze bedrijven in Nederland. 
                Van stijlvol design tot geavanceerde functionaliteit - alles onder één dak.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link to="/portfolio">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black hover:opacity-90 transition-opacity text-lg px-8 py-6"
                  >
                    Bekijk Ons Portfolio
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-lg px-8 py-6"
                  >
                    Plan een Gesprek
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-[#D4AF37]" />
                  <span>50+ Tevreden Klanten</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-[#D4AF37]" />
                  <span>3x Gemiddelde ROI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-[#D4AF37]" />
                  <span>100% Tevreden Garantie</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={uspRef} className="py-24 bg-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={uspInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Waarom Kiezen Voor{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Vos Web Designs?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Wij combineren strategisch denken met prachtig design voor meetbare resultaten
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {usps.map((usp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={uspInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 hover:border-[#D4AF37] transition-colors group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37]/10 to-[#F4E4C1]/10 rounded-xl flex items-center justify-center mb-6 text-[#D4AF37] group-hover:scale-110 transition-transform">
                    {usp.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{usp.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{usp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={projectsRef} className="py-24 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Onze{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Uitgelichte Projecten
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Ontdek hoe we bedrijven helpen groeien met krachtige digitale oplossingen
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Link to={`/portfolio/${project.id}`}>
                    <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-gray-800 hover:border-[#D4AF37] transition-all duration-300">
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt={project.title}
                         src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
                      </div>
                      <div className="p-6">
                        <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-medium rounded-full mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex items-center text-[#D4AF37] text-sm font-medium">
                          Bekijk Project
                          <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={projectsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <Link to="/portfolio">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black hover:opacity-90 transition-opacity"
                >
                  Bekijk Alle Projecten
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section ref={testimonialsRef} className="py-24 bg-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Wat Onze{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Klanten Zeggen
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Echte resultaten van tevreden klanten in heel Nederland
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 hover:border-[#D4AF37] transition-colors"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="#D4AF37" className="text-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <span className="font-bold text-white">{testimonial.name}</span>
                    <p className="text-sm text-gray-400">{testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-[128px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Klaar Om Uw Bedrijf{' '}
                  <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                    Te Laten Groeien?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Plan een vrijblijvend gesprek en ontdek hoe wij uw online aanwezigheid kunnen transformeren
                </p>
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black hover:opacity-90 transition-opacity text-lg px-8 py-6"
                  >
                    Start Uw Project
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
