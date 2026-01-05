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

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);

        const [{ data: projectsData }, { data: categoriesData }] =
          await Promise.all([
            supabase
              .from('projects')
              .select(`
                id,
                title,
                short_description,
                hero_image,
                created_at,
                categories (
                  name
                )
              `)
              .eq('is_published', true)
              .order('created_at', { ascending: false }),

            supabase
              .from('categories')
              .select('id, name')
              .order('name', { ascending: true }),
          ]);

        setProjects(projectsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Portfolio fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  /* ================= FILTER ================= */

  const filteredProjects =
    activeFilter === 'Alle'
      ? projects
      : projects.filter(
          (project) => project.categories?.name === activeFilter
        );

  /* ================= UI ================= */

  return (
    <>
      <Helmet>
        <title>Portfolio - Vos Web Designs</title>
        <meta
          name="description"
          content="Bekijk ons portfolio met recente webdesign-, development- en e-commerce projecten."
        />
      </Helmet>

      <main className="pt-24 pb-16 bg-[#0a0a0a]">
        {/* HERO */}
        <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ons{' '}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Een selectie van projecten waar we trots op zijn.
            </p>
          </div>
        </section>

        {/* FILTERS */}
        <section className="py-8 bg-[#0f0f0f] sticky top-20 z-40 border-b border-gray-800">
          <div className="container mx-auto px-4 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => setActiveFilter('Alle')}
              className={
                activeFilter === 'Alle'
                  ? 'bg-[#D4AF37] text-black'
                  : 'border border-gray-700 text-gray-300 bg-transparent'
              }
            >
              Alle
            </Button>

            {categories.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setActiveFilter(cat.name)}
                className={
                  activeFilter === cat.name
                    ? 'bg-[#D4AF37] text-black'
                    : 'border border-gray-700 text-gray-300 bg-transparent'
                }
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </section>

        {/* PROJECT GRID */}
        <section ref={projectsRef} className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            {loading ? (
              <p className="text-center text-gray-400">Projecten laden…</p>
            ) : filteredProjects.length === 0 ? (
              <p className="text-center text-gray-500">
                Geen projecten gevonden.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      projectsInView ? { opacity: 1, y: 0 } : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                  >
                    <Link to={`/portfolio/${project.id}`}>
                      <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-gray-800 hover:border-[#D4AF37] transition-all duration-300">
                        {/* IMAGE */}
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={
                              project.hero_image ||
                              '/placeholder-project.jpg'
                            }
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* CONTENT */}
                        <div className="p-6">
                          {project.categories?.name && (
                            <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-medium rounded-full mb-3">
                              {project.categories.name}
                            </span>
                          )}

                          <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                            {project.short_description}
                          </p>

                          <div className="flex items-center text-[#D4AF37] text-sm font-medium">
                            Bekijk project
                            <ArrowRight
                              className="ml-2 group-hover:translate-x-2 transition-transform"
                              size={16}
                            />
                          </div>
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