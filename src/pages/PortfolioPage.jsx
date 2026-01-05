
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('Alle');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const projectsRef = useRef(null);
  const projectsInView = useInView(projectsRef, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchPortfolio = async () => {
        const [projRes, catRes] = await Promise.all([
            supabase.from('projects').select('*, categories(name)').eq('is_published', true).order('created_at', { ascending: false }),
            supabase.from('categories').select('*').order('name', { ascending: true })
        ]);
        
        if (projRes.data) setProjects(projRes.data);
        if (catRes.data) setCategories(catRes.data);
        setLoading(false);
    };
    fetchPortfolio();
  }, []);

  const filteredProjects = activeFilter === 'Alle' 
    ? projects 
    : projects.filter(project => project.categories?.name === activeFilter);

  return (
    <>
      <Helmet>
        <title>Portfolio - Vos Web Designs</title>
        <meta name="description" content="Ons werk en recente projecten." />
      </Helmet>

      <main className="pt-24 pb-16">
        <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Ons <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">Portfolio</span></h1>
          </div>
        </section>

        <section className="py-12 bg-[#0f0f0f] sticky top-20 z-40 border-b border-gray-800">
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-3">
             <Button 
                onClick={() => setActiveFilter('Alle')}
                variant={activeFilter === 'Alle' ? 'default' : 'outline'}
                className={activeFilter === 'Alle' ? 'bg-[#D4AF37] text-black' : 'border-gray-700 text-gray-300'}
             >
                Alle
             </Button>
             {categories.map((cat) => (
                <Button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.name)}
                  variant={activeFilter === cat.name ? 'default' : 'outline'}
                  className={activeFilter === cat.name ? 'bg-[#D4AF37] text-black' : 'border-gray-700 text-gray-300'}
                >
                  {cat.name}
                </Button>
             ))}
          </div>
        </section>

        <section ref={projectsRef} className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            {loading ? <p className="text-center">Laden...</p> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={projectsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }}>
                    <Link to={`/portfolio/${project.id}`}>
                      <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-gray-800 hover:border-[#D4AF37] transition-all duration-300">
                        <div className="aspect-[4/3] overflow-hidden">
                         <img 
  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
  alt={service.title}
  src={service.image}
/>                        </div>
                        <div className="p-6">
                          <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-medium rounded-full mb-3">{project.categories?.name}</span>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">{project.title}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{project.short_description}</p>
                          <div className="flex items-center text-[#D4AF37] text-sm font-medium">Bekijk Project <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={16} /></div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default PortfolioPage;
