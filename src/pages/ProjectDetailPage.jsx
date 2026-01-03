
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';

const ProjectDetailPage = () => {
  const { projectId } = useParams();

  const projectsData = {
    'luxe-vastgoed': {
      title: 'Luxe Vastgoed Amsterdam',
      category: 'Vastgoed',
      client: 'Luxe Vastgoed Amsterdam B.V.',
      year: '2025',
      duration: '12 weken',
      heroImage: 'Modern luxury real estate website with Amsterdam canal houses and search functionality',
      description: 'Een premium vastgoedplatform dat de luxe uitstraling van high-end Amsterdamse panden perfect weerspiegelt. De website combineert prachtig design met geavanceerde functionaliteit.',
      challenge: 'De uitdaging was om een platform te creëren dat de exclusiviteit van luxe vastgoed uitstraalt, terwijl het tegelijkertijd gebruiksvriendelijk blijft voor zowel kopers als makelaars. Het moest onderscheidend zijn in een competitieve markt.',
      solution: 'We ontwikkelden een visueel aantrekkelijk platform met 360° virtual tours, geavanceerde filteropties, en een intuïtief CMS systeem voor makelaars. De website maakt gebruik van hoogwaardige fotografie en videomateriaal om woningen optimaal te presenteren.',
      results: [
        '240% toename in online aanvragen',
        '3x meer tijd doorgebracht op de website',
        '85% reductie in administratieve taken voor makelaars',
        '4.9/5 gemiddelde klantwaardering'
      ],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Sanity CMS', '360° Tour Integration'],
      features: [
        'Interactieve 360° virtual tours',
        'Geavanceerde zoek- en filteropties',
        'Makelaarsportaal met CMS',
        'Geïntegreerde agenda voor bezichtigingen',
        'Multi-language ondersteuning',
        'SEO geoptimaliseerd'
      ],
      images: [
        'Luxury real estate homepage with featured properties',
        'Property detail page with 360 virtual tour',
        'Advanced search filters interface for real estate'
      ]
    },
    'boutique-hotel': {
      title: 'Boutique Hotel Den Haag',
      category: 'Hospitality',
      client: 'Boutique Hotel Den Haag',
      year: '2025',
      duration: '10 weken',
      heroImage: 'Elegant boutique hotel website showing luxury rooms and amenities',
      description: 'Een elegante website voor een exclusief boutique hotel in hartje Den Haag. Het platform combineert luxe uitstraling met directe boekingsmogelijkheden en concierge services.',
      challenge: 'Het hotel wilde directe boekingen verhogen en de afhankelijkheid van externe boekingsplatforms verminderen. De website moest de unieke sfeer en exclusiviteit van het hotel perfect overbrengen.',
      solution: 'We creëerden een visueel rijk platform met een geïntegreerd boekingssysteem, virtual room tours, en een digitale concierge service. De focus lag op het creëren van een emotionele connectie met potentiële gasten.',
      results: [
        '180% toename in directe boekingen',
        '€85.000 bespaard op commissies booking platforms',
        '92% klanttevredenheid score',
        '45% hogere gemiddelde verblijfsduur'
      ],
      technologies: ['React', 'Node.js', 'Booking Engine API', 'Payment Gateway', 'CRM Integration'],
      features: [
        'Real-time beschikbaarheid en boekingen',
        'Virtual room tours',
        'Digitale concierge service',
        'Multi-currency ondersteuning',
        'Loyalty programma integratie',
        'Review management systeem'
      ],
      images: [
        'Hotel booking interface with room selection',
        'Luxury hotel room interior photography',
        'Hotel amenities and services showcase'
      ]
    },
    'advocatenkantoor': {
      title: 'Elite Advocatenkantoor',
      category: 'Juridisch',
      client: 'Elite Advocaten Rotterdam',
      year: '2025',
      duration: '14 weken',
      heroImage: 'Professional law firm website with modern office and team photos',
      description: 'Een prestigieuze website voor een vooraanstaand advocatenkantoor met focus op professionele uitstraling en client service. Inclusief beveiligd cliëntportaal.',
      challenge: 'Het kantoor had behoefte aan een website die autoriteit en betrouwbaarheid uitstraalt, terwijl deze toegankelijk blijft voor cliënten. Een beveiligd portaal voor documenten was essentieel.',
      solution: 'We ontwikkelden een professionele website met heldere dienstverlening, teamprofielen, en een volledig beveiligd cliëntportaal. De website straalt expertise uit door middel van case studies en juridische inzichten.',
      results: [
        '165% toename in nieuwe cliënten',
        '70% reductie in administratieve emails',
        'Top 3 ranking voor relevante zoektermen',
        '4.8/5 cliënttevredenheid'
      ],
      technologies: ['React', 'Secure Portal', 'Document Management', 'Multi-factor Authentication'],
      features: [
        'Beveiligd cliëntportaal',
        'Document management systeem',
        'Online intake formulieren',
        'Team expertise profielen',
        'Case studies database',
        'Blog en juridische inzichten'
      ],
      images: [
        'Law firm homepage with professional team',
        'Secure client portal interface',
        'Legal services and expertise showcase'
      ]
    },
    'fashion-boutique': {
      title: 'Premium Fashion E-commerce',
      category: 'E-commerce',
      client: 'Maison Élégance',
      year: '2025',
      duration: '16 weken',
      heroImage: 'Luxury fashion e-commerce website with elegant product displays and AR features',
      description: 'Een high-end e-commerce platform voor exclusieve modemerken met AR try-on functionaliteit en VIP member programma.',
      challenge: 'Het creëren van een online winkelervaring die de luxe van een fysieke boutique evenaart, met innovatieve features die de conversie verhogen.',
      solution: 'We bouwden een visueel stunning platform met AR try-on technologie, personal styling service, en een exclusief VIP member programma met early access tot nieuwe collecties.',
      results: [
        '310% toename in online omzet',
        '89% terugkerende klanten',
        '4.7/5 gemiddelde product review',
        '€2.3M omzet eerste kwartaal'
      ],
      technologies: ['Next.js', 'Shopify', 'AR Technology', 'Payment Systems', 'CRM'],
      features: [
        'AR virtual try-on',
        'Personal styling advies',
        'VIP member programma',
        'Wishlists en favorites',
        'Gift cards en vouchers',
        'Multi-channel marketing integratie'
      ],
      images: [
        'Fashion e-commerce homepage with latest collections',
        'Product detail page with AR try-on feature',
        'Shopping cart and checkout experience'
      ]
    },
    'consultancy-firm': {
      title: 'Strategic Consultancy',
      category: 'Corporate',
      client: 'Strategic Partners International',
      year: '2025',
      duration: '12 weken',
      heroImage: 'Professional consultancy website with business people and data visualization',
      description: 'Een corporate website voor een internationaal consultancy bureau met multi-language support en client portal.',
      challenge: 'Het bureau wilde hun internationale expertise tonen en een platform bieden waar clients wereldwijd toegang hebben tot rapporten en analyses.',
      solution: 'We ontwikkelden een professionele multi-language website met geïntegreerd client portal, kennisbank, en case study database die hun expertise benadrukt.',
      results: [
        '195% toename in internationale klanten',
        'Aanwezigheid in 12 nieuwe markten',
        '4.9/5 client satisfaction score',
        '€1.8M nieuwe business eerste jaar'
      ],
      technologies: ['React', 'Multi-language CMS', 'Secure Portal', 'Analytics Dashboard'],
      features: [
        'Multi-language content (8 talen)',
        'Beveiligd client portal',
        'Kennisbank en resources',
        'Interactive case studies',
        'Team expertise profielen',
        'Contact en inquiry systeem'
      ],
      images: [
        'Corporate consultancy homepage with services',
        'Client portal dashboard and analytics',
        'Case studies and expertise showcase'
      ]
    },
    'wellness-resort': {
      title: 'Wellness & Spa Resort',
      category: 'Hospitality',
      client: 'Serenity Wellness Resort',
      year: '2025',
      duration: '14 weken',
      heroImage: 'Luxury spa and wellness resort website with serene nature and treatments',
      description: 'Een luxe wellness resort website met online behandelingen boeken, member area, en wellness programmas.',
      challenge: 'Het resort wilde online boekingen verbeteren en gasten inspireren om hun wellness journey al voor aankomst te beginnen.',
      solution: 'We creëerden een rustgevende, visueel aantrekkelijke website met integrated booking voor treatments, wellness packages, en een member area met persoonlijke wellness plannen.',
      results: [
        '225% toename in online boekingen',
        '€125.000 extra omzet via add-on services',
        '94% guest satisfaction score',
        '67% member retention rate'
      ],
      technologies: ['React', 'Booking System', 'Member Portal', 'Payment Integration', 'Email Automation'],
      features: [
        'Treatment booking systeem',
        'Wellness packages',
        'Member area met progress tracking',
        'Personal wellness plannen',
        'Gift vouchers',
        'Spa menu en pricing'
      ],
      images: [
        'Wellness resort homepage with serene atmosphere',
        'Treatment booking interface and spa menu',
        'Member area with wellness programs'
      ]
    }
  };

  const project = projectsData[projectId];

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - Portfolio | Vos Web Designs</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <main className="pt-20">
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              className="w-full h-full object-cover"
              alt={project.title}
             src="https://images.unsplash.com/photo-1649215636705-1084bd6df97a" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/80 to-[#0a0a0a]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] text-sm font-medium mb-4">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-gray-300">{project.client}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
                  <span className="text-gray-400 text-sm">Client</span>
                  <p className="text-white font-semibold mt-1">{project.client}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
                  <span className="text-gray-400 text-sm">Jaar</span>
                  <p className="text-white font-semibold mt-1">{project.year}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
                  <span className="text-gray-400 text-sm">Duur</span>
                  <p className="text-white font-semibold mt-1">{project.duration}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold mb-6">Project Overzicht</h2>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <h3 className="text-2xl font-bold mb-4">De Uitdaging</h3>
                  <p className="text-gray-300 leading-relaxed mb-8">
                    {project.challenge}
                  </p>

                  <h3 className="text-2xl font-bold mb-4">Onze Oplossing</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                <div>
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 sticky top-28">
                    <h3 className="text-xl font-bold mb-4">Technologieën</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold mb-4 mt-6">Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                          <CheckCircle size={16} className="text-[#D4AF37] mt-1 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-3xl font-bold mb-8">Resultaten</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {project.results.map((result, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-xl p-6 text-center"
                    >
                      <CheckCircle size={32} className="text-[#D4AF37] mx-auto mb-3" />
                      <p className="text-gray-300 text-sm leading-relaxed">{result}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h3 className="text-3xl font-bold mb-8">Project Impressies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.map((image, index) => (
                    <div key={index} className="aspect-video rounded-xl overflow-hidden border border-gray-800">
                      <img 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        alt={`${project.title} screenshot ${index + 1}`}
                       src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/portfolio">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  >
                    <ArrowLeft className="mr-2" size={20} />
                    Terug naar Portfolio
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black hover:opacity-90 transition-opacity">
                    Start Uw Project
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProjectDetailPage;
