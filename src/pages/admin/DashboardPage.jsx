
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { FolderKanban, MessageSquare, Layers, Eye, Plus, ArrowRight } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    projects: 0,
    testimonials: 0,
    categories: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, testimonials, categories] = await Promise.all([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase.from('categories').select('*', { count: 'exact', head: true })
        ]);

        setStats({
          projects: projects.count || 0,
          testimonials: testimonials.count || 0,
          categories: categories.count || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, href }) => (
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{loading ? "-" : value}</div>
        <Button 
          variant="link" 
          className="px-0 text-[#D4AF37] h-auto mt-2 text-xs flex items-center gap-1 hover:text-[#b8962e]"
          onClick={() => navigate(href)}
        >
          Beheren <ArrowRight size={12} />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">Welkom terug! Hier is een overzicht van je portfolio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard 
          title="Totaal Projecten" 
          value={stats.projects} 
          icon={FolderKanban} 
          color="text-blue-500"
          href="/admin/projects"
        />
        <StatCard 
          title="Reviews" 
          value={stats.testimonials} 
          icon={MessageSquare} 
          color="text-green-500"
          href="/admin/testimonials"
        />
        <StatCard 
          title="Categorieën" 
          value={stats.categories} 
          icon={Layers} 
          color="text-purple-500"
          href="/admin/categories"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity - Placeholder for now */}
        <Card className="col-span-4 bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recente Activiteit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
               {/* Static placeholder data to match the screenshot look */}
               <div className="flex items-center gap-4 text-sm border-b border-gray-800 pb-3">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                  <div className="flex-1">
                    <p className="text-gray-300">Nieuw project "Villa Amsterdam" toegevoegd</p>
                  </div>
                  <span className="text-gray-500 text-xs">2u geleden</span>
               </div>
               <div className="flex items-center gap-4 text-sm border-b border-gray-800 pb-3">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                  <div className="flex-1">
                    <p className="text-gray-300">Nieuw project "Villa Amsterdam" toegevoegd</p>
                  </div>
                  <span className="text-gray-500 text-xs">2u geleden</span>
               </div>
               <div className="flex items-center gap-4 text-sm">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                  <div className="flex-1">
                    <p className="text-gray-300">Nieuw project "Villa Amsterdam" toegevoegd</p>
                  </div>
                  <span className="text-gray-500 text-xs">2u geleden</span>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3 bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Snelle Acties</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button 
              className="h-24 flex flex-col items-center justify-center gap-2 bg-black border border-gray-800 hover:border-[#D4AF37] hover:bg-[#111] transition-all"
              onClick={() => navigate('/admin/projects?new=true')}
            >
              <Plus size={24} className="text-[#D4AF37]" />
              <span>+ Nieuw Project</span>
            </Button>
            
            <Button 
              className="h-24 flex flex-col items-center justify-center gap-2 bg-black border border-gray-800 hover:border-[#D4AF37] hover:bg-[#111] transition-all"
              onClick={() => navigate('/admin/testimonials?new=true')}
            >
              <Plus size={24} className="text-[#D4AF37]" />
              <span className="text-center">+ Nieuwe Review</span>
            </Button>
            
            <Button 
              className="h-24 flex flex-col items-center justify-center gap-2 bg-black border border-gray-800 hover:border-[#D4AF37] hover:bg-[#111] transition-all"
              onClick={() => navigate('/admin/settings')}
            >
              <Layers size={24} className="text-gray-400" />
              <span>Instellingen</span>
            </Button>
            
            <Button 
              className="h-24 flex flex-col items-center justify-center gap-2 border border-[#D4AF37] bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
              onClick={() => window.open('/', '_blank')}
            >
              <Eye size={24} />
              <span>Bekijk Site</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
