
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Target, Lightbulb, Users } from 'lucide-react';

const AboutPage = () => {
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

  const values = [
    {
      icon: <Heart size={32} />,
      title: 'Passie voor Kwaliteit',
      description: 'Elk project behandelen we met dezelfde toewijding en aandacht voor detail. Kwaliteit staat altijd voorop.'
    },
    {
      icon: <Target size={32} />,
      title: 'Resultaatgericht',
      description: 'Mooie designs zijn mooi, maar resultaten zijn wat telt. We bouwen websites die converteren en groeien.'
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Innovatie',
      description: 'We blijven voorop lopen met de nieuwste technologieën en trends om uw website toekomstbestendig te maken.'
    },
    {
      icon: <Users size={32} />,
      title: 'Persoonlijke Service',
      description: 'Bij ons bent u geen nummer. U werkt direct met uw dedicated designer en developer voor optimale communicatie.'
    }
  ];

  const team = [
    {
      name: 'Lars van der Vos',
      role: 'Founder & Lead Designer',
      image: 'Professional portrait of creative male designer in modern office',
      bio: 'Met 10+ jaar ervaring in webdesign breng ik merken tot leven door middel van krachtige visuele verhalen.'
    },
    {
      name: 'Emma de Jong',
      role: 'Senior Developer',
      image: 'Professional portrait of female software developer at workspace',
      bio: 'Gespecialiseerd in het bouwen van schaalbare, performante websites met de nieuwste technologieën.'
    },
    {
      name: 'Thomas Bakker',
      role: 'UX/UI Designer',
      image: 'Professional portrait of male UX designer reviewing interface designs',
      bio: 'Expert in het creëren van intuïtieve gebruikerservaringen die conversies verhogen en gebruikers blij maken.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Over Ons - Vos Web Designs | Ons Verhaal & Team</title>
        <meta
          name="description"
          content="Leer het team achter Vos Web Designs kennen. Gepassioneerd door design en development, gedreven door resultaten voor onze klanten."
        />
      </Helmet>

      <main className="pt-24 pb-16">
        <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Over{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Vos Web Designs
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Waar passie voor design en technologie samenkomen om digitale dromen werkelijkheid te maken
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Ons Verhaal</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Vos Web Designs is in 2020 opgericht vanuit een simpele overtuiging: elk bedrijf verdient een website die niet alleen mooi is, maar ook daadwerkelijk resultaten oplevert.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    We zagen te vaak dat bedrijven vast zaten met generieke templates en ondermaatse service. We wisten dat het beter kon, en besloten om zelf het verschil te maken.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Vandaag helpen we ambitieuze bedrijven in heel Nederland om hun digitale aanwezigheid naar een hoger niveau te tillen. Met een team van gepassioneerde designers en developers leveren we premium websites die converteren en groeien met uw bedrijf.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="aspect-square rounded-2xl overflow-hidden border border-gray-800"
                >
                  <img 
                    className="w-full h-full object-cover"
                    alt="Vos Web Designs team working together"
                   src="https://images.unsplash.com/photo-1531497258014-b5736f376b1b" />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                    50+
                  </span>
                  <p className="text-gray-400 mt-2">Tevreden Klanten</p>
                </div>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                    100+
                  </span>
                  <p className="text-gray-400 mt-2">Projecten Opgeleverd</p>
                </div>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
                  <span className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                    4.9/5
                  </span>
                  <p className="text-gray-400 mt-2">Gemiddelde Review</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={valuesRef} className="py-16 bg-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Onze{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Waarden
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                De principes die ons drijven en onze manier van werken bepalen
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 text-center hover:border-[#D4AF37] transition-colors"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37]/10 to-[#F4E4C1]/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={teamRef} className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ons{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Team
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Maak kennis met de mensen die uw digitale dromen werkelijkheid maken
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-colors group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={member.name}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <span className="text-[#D4AF37] text-sm font-medium mb-3 block">{member.role}</span>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Klaar Om Samen{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Te Werken?
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Laten we kennismaken en bespreken hoe we uw bedrijf kunnen helpen groeien
              </p>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black hover:opacity-90 transition-opacity"
                >
                  Plan een Gesprek
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
