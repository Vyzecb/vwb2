
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
        const { data } = await supabase
            .from('projects')
            .select('*, categories(name)')
            .eq('id', projectId)
            .single();
        
        if (data) setProject(data);
        setLoading(false);
    };
    fetchProject();
  }, [projectId]);

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">Laden...</div>;
  if (!project) return <Navigate to="/404" replace />;

  return (
    <>
      <Helmet>
        <title>{project.title} - Portfolio | Vos Web Designs</title>
        <meta name="description" content={project.short_description} />
      </Helmet>

      <main className="pt-20">
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img className="w-full h-full object-cover" alt={project.title} src={project.hero_image || "https://images.unsplash.com/photo-1649215636705-1084bd6df97a"} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/80 to-[#0a0a0a]" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full text-[#D4AF37] text-sm font-medium mb-4">
                {project.categories?.name}
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
                  <p className="text-white font-semibold mt-1">{project.client || 'Niet beschikbaar'}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
                  <span className="text-gray-400 text-sm">Jaar</span>
                  <p className="text-white font-semibold mt-1">{project.year}</p>
                </div>
                <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
                  <span className="text-gray-400 text-sm">Duur</span>
                  <p className="text-white font-semibold mt-1">{project.duration || 'N/A'}</p>
                </div>
              </div>

              <div className="mb-12">
                 <h2 className="text-3xl font-bold mb-6">Project Beschrijving</h2>
                 <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">{project.description}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                <Link to="/portfolio">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]">
                    <ArrowLeft className="mr-2" size={20} /> Terug naar Portfolio
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black hover:opacity-90 transition-opacity">
                    Start Uw Project <ArrowRight className="ml-2" size={20} />
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
