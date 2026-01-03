
import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('Alle');
  const projectsRef = useRef(null);
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });

  const filters = ['Alle', 'E-commerce', 'Vastgoed', 'Hospitality', 'Juridisch', 'Corporate'];

  const projects = [
    {
      id: 'luxe-vastgoed',
      title: 'Luxe Vastgoed Amsterdam',
      category: 'Vastgoed',
      image: 'Modern luxury real estate website with Amsterdam canal houses',
      description: 'Premium vastgoedplatform met 360° virtual tours en geavanceerde zoekfunctionaliteit.',
      tags: ['Webdesign', 'Development', 'CMS'],
    },
    {
      id: 'boutique-hotel',
      title: 'Boutique Hotel Den Haag',
      category: 'Hospitality',
      image: 'Elegant boutique hotel website with luxury interior design',
      description: 'Exclusief boekingsplatform met directe kamerreservering en concierge service.',
      tags: ['Webdesign', 'Booking System', 'Development'],
    },
    {
      id: 'advocatenkantoor',
      title: 'Elite Advocatenkantoor',
      category: 'Juridisch',
      image: 'Professional law firm website with modern office interior',
      description: 'Prestigieuze website voor een toonaangevend advocatenkantoor met cliëntportaal.',
      tags: ['Webdesign', 'Portal', 'SEO'],
    },
    {
      id: 'fashion-boutique',
      title: 'Premium Fashion E-commerce',
      category: 'E-commerce',
      image: 'Luxury fashion e-commerce website with elegant product displays',
      description: 'High-end e-commerce platform voor exclusieve modemerken met AR try-on functie.',
      tags: ['E-commerce', 'Webdesign', 'AR Integration'],
    },
    {
      id: 'consultancy-firm',
      title: 'Strategic Consultancy',
      category: 'Corporate',
      image: 'Professional consultancy website with business people in modern office',
      description: 'Corporate website voor een internationaal consultancy bureau met client portal.',
      tags: ['Corporate', 'Portal', 'Multi-language'],
    },
    {
      id: 'wellness-resort',
      title: 'Wellness & Spa Resort',
      category: 'Hospitality',
      image: 'Luxury spa and wellness resort website with serene atmosphere',
      description: 'Luxe wellness resort website met online behandelingen boeken en member area.',
      tags: ['Webdesign', 'Booking', 'Membership'],
    },
  ];

  const filteredProjects = activeFilter === 'Alle' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Portfolio - Vos Web Designs | Onze Beste Projecten</title>
        <meta
          name="description"
          content="Bekijk ons portfolio van premium websites. Van e-commerce tot corporate - ontdek hoe wij bedrijven helpen groeien met krachtige digitale oplossingen."
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
                Ons{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Portfolio
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ontdek onze beste projecten en laat u inspireren door wat mogelijk is
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-[#0f0f0f] sticky top-20 z-40 border-b border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  className={
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black'
                      : 'border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section ref={projectsRef} className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={projectsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
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
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
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
          </div>
        </section>

        <section className="py-16 bg-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Klaar Voor Een{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Eigen Project?
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Laten we samen iets moois creëren. Plan een vrijblijvend gesprek
              </p>
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
        </section>
      </main>
    </>
  );
};

export default PortfolioPage;
