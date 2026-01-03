
import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  MessageCircle, 
  Lightbulb, 
  Palette, 
  Code, 
  Rocket,
  CheckCircle 
} from 'lucide-react';

const ProcessPage = () => {
  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, margin: '-100px' });

  const processSteps = [
    {
      number: '01',
      icon: <MessageCircle size={40} />,
      title: 'Kennismaking & Strategie',
      duration: '1 week',
      description: 'We beginnen met een uitgebreid gesprek over uw bedrijf, doelen, en doelgroep. Hierbij analyseren we uw huidige situatie en concurrentie om een solide strategie te ontwikkelen.',
      activities: [
        'Intakegesprek en doelen bepalen',
        'Doelgroep en persona research',
        'Concurrentieanalyse',
        'Projectscope en planning opstellen',
        'Budget en timeline bespreken'
      ]
    },
    {
      number: '02',
      icon: <Lightbulb size={40} />,
      title: 'Concept & Wireframing',
      duration: '1-2 weken',
      description: 'Op basis van de strategie creëren we concepten en wireframes. Dit geeft u een duidelijk beeld van de structuur en functionaliteit voordat we beginnen met design.',
      activities: [
        'Sitemap en informatiearchitectuur',
        'Wireframes voor key pages',
        'User flow mapping',
        'Feedback sessies',
        'Concept presentatie en goedkeuring'
      ]
    },
    {
      number: '03',
      icon: <Palette size={40} />,
      title: 'Design & Prototyping',
      duration: '2-3 weken',
      description: 'Nu wordt het visueel! We ontwerpen hoogwaardige mockups van alle paginas, compleet met uw branding, kleuren, en beeldmateriaal. Interactive prototypes laten u de website al ervaren.',
      activities: [
        'Visual design alle paginas',
        'Responsive design (desktop, tablet, mobiel)',
        'Interactive prototype',
        'Design review sessies',
        'Finalisatie en goedkeuring'
      ]
    },
    {
      number: '04',
      icon: <Code size={40} />,
      title: 'Development & Integratie',
      duration: '3-6 weken',
      description: 'De goedgekeurde designs worden omgezet in een volledig functionele website. We bouwen met de nieuwste technologieën en integreren alle benodigde systemen en tools.',
      activities: [
        'Frontend development',
        'Backend development en database',
        'CMS implementatie',
        'Third-party integraties',
        'Testen en quality assurance'
      ]
    },
    {
      number: '05',
      icon: <Rocket size={40} />,
      title: 'Lancering & Optimalisatie',
      duration: '1 week',
      description: 'Voor de lancering voeren we uitgebreide tests uit. Na lancering monitoren we de prestaties nauwlettend en optimaliseren waar nodig voor maximale resultaten.',
      activities: [
        'Pre-launch testing en bugfixes',
        'Performance optimalisatie',
        'SEO setup en implementatie',
        'Analytics en tracking configuratie',
        'Live gang en support'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Werkwijze - Vos Web Designs | Ons Development Process</title>
        <meta
          name="description"
          content="Ontdek hoe we te werk gaan bij Vos Web Designs. Van strategie tot lancering - een transparant proces met gegarandeerde resultaten."
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
                  Werkwijze
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Een bewezen proces dat consistente, hoogwaardige resultaten oplevert voor elk project
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4">Transparantie & Communicatie</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Bij Vos Web Designs werken we met volledige transparantie. U bent altijd op de hoogte van de voortgang en heeft directe toegang tot uw dedicated team. We communiceren via uw voorkeurskanaal - email, telefoon, video calls, of persoonlijke meetings.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Elk project wordt begeleid door een vaste contactpersoon die uw wensen begrijpt en ervoor zorgt dat alles volgens planning verloopt. Geen verrassingen, alleen resultaten.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={processRef} className="py-16 bg-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-16">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={processInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative"
                >
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute left-[73px] top-[120px] w-0.5 h-[calc(100%+64px)] bg-gradient-to-b from-[#D4AF37] to-transparent" />
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
                      <div className="w-24 h-24 bg-gradient-to-r from-[#D4AF37]/10 to-[#F4E4C1]/10 rounded-2xl flex items-center justify-center border border-[#D4AF37]/30 text-[#D4AF37] mb-4 relative z-10">
                        {step.icon}
                      </div>
                      <span className="text-5xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </div>

                    <div className="lg:col-span-10">
                      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-8 hover:border-[#D4AF37] transition-colors">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
                          <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium rounded-full">
                            {step.duration}
                          </span>
                        </div>

                        <p className="text-gray-300 leading-relaxed mb-6">
                          {step.description}
                        </p>

                        <div className="space-y-2">
                          <span className="text-white font-semibold mb-3 block">Belangrijkste Activiteiten:</span>
                          {step.activities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle size={20} className="text-[#D4AF37] mt-0.5 shrink-0" />
                              <span className="text-gray-400">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Na De{' '}
                  <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                    Lancering
                  </span>
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Onze betrokkenheid stopt niet bij de lancering. We bieden continue support, monitoren de prestaties, en staan klaar om uw website te laten groeien met uw bedrijf.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
                    <h3 className="font-bold mb-2 text-[#D4AF37]">Onderhoud & Support</h3>
                    <p className="text-gray-400 text-sm">Technische updates, bugfixes, en content aanpassingen</p>
                  </div>
                  <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
                    <h3 className="font-bold mb-2 text-[#D4AF37]">Performance Monitoring</h3>
                    <p className="text-gray-400 text-sm">Continue monitoring en optimalisatie voor beste resultaten</p>
                  </div>
                  <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
                    <h3 className="font-bold mb-2 text-[#D4AF37]">SEO & Marketing</h3>
                    <p className="text-gray-400 text-sm">Doorlopende SEO optimalisatie en marketing support</p>
                  </div>
                  <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
                    <h3 className="font-bold mb-2 text-[#D4AF37]">Groei & Uitbreidingen</h3>
                    <p className="text-gray-400 text-sm">Nieuwe features en functionaliteiten wanneer u deze nodig heeft</p>
                  </div>
                </div>
                <div className="text-center">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black hover:opacity-90 transition-opacity"
                    >
                      Start Uw Project
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

export default ProcessPage;
