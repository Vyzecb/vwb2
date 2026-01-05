import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import {
  FolderKanban,
  MessageSquare,
  Layers,
  Eye,
  Plus,
  ArrowRight
} from 'lucide-react';

/* ================= HELPERS ================= */

const formatActivityText = (a) => {
  const typeMap = {
    project: 'Project',
    testimonial: 'Review',
    category: 'Categorie',
  };

  const actionMap = {
    created: 'toegevoegd',
    updated: 'bijgewerkt',
    deleted: 'verwijderd',
  };

  return `${typeMap[a.type] || 'Item'} "${a.title || ''}" ${actionMap[a.action] || ''}`;
};

const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 60000);
  if (diff < 1) return 'zojuist';
  if (diff < 60) return `${diff}m geleden`;
  const h = Math.floor(diff / 60);
  return `${h}u geleden`;
};

/* ================= PAGE ================= */

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    projects: 0,
    testimonials: 0,
    categories: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= DATA ================= */

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [
          projects,
          testimonials,
          categories,
          activityRes
        ] = await Promise.all([
          supabase.from('projects').select('*', { count: 'exact', head: true }),
          supabase.from('testimonials').select('*', { count: 'exact', head: true }),
          supabase.from('categories').select('*', { count: 'exact', head: true }),
          supabase
            .from('activity_log')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(6),
        ]);

        setStats({
          projects: projects.count || 0,
          testimonials: testimonials.count || 0,
          categories: categories.count || 0,
        });

        setActivities(activityRes.data || []);
      } catch (e) {
        console.error('Dashboard fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  /* ================= COMPONENTS ================= */

  const StatCard = ({ title, value, icon: Icon, color, href }) => (
    <Card className="bg-[#1a1a1a] border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">
          {loading ? '-' : value}
        </div>
        <Button
          variant="link"
          className="px-0 text-[#D4AF37] h-auto mt-2 text-xs flex items-center gap-1"
          onClick={() => navigate(href)}
        >
          Beheren <ArrowRight size={12} />
        </Button>
      </CardContent>
    </Card>
  );

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Welkom terug! Hier is een overzicht van je portfolio.
        </p>
      </div>

      {/* STATS */}
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

      {/* CONTENT */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* RECENTE ACTIVITEIT */}
        <Card className="col-span-4 bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Recente Activiteit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Nog geen recente activiteit.
                </p>
              )}

              {activities.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-4 text-sm border-b border-gray-800 pb-3 last:border-0"
                >
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                  <div className="flex-1">
                    <p className="text-gray-300">
                      {formatActivityText(a)}
                    </p>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {timeAgo(a.created_at)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SNELLE ACTIES */}
        <Card className="col-span-3 bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Snelle Acties</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button
              className="h-24 flex flex-col items-center justify-center gap-2 bg-black border border-gray-800 hover:border-[#D4AF37]"
              onClick={() => navigate('/admin/projects?new=true')}
            >
              <Plus size={24} className="text-[#D4AF37]" />
              <span>Nieuw Project</span>
            </Button>

            <Button
              className="h-24 flex flex-col items-center justify-center gap-2 bg-black border border-gray-800 hover:border-[#D4AF37]"
              onClick={() => navigate('/admin/testimonials?new=true')}
            >
              <Plus size={24} className="text-[#D4AF37]" />
              <span>Nieuwe Review</span>
            </Button>

            <Button
              className="h-24 flex flex-col items-center justify-center gap-2 bg-black border border-gray-800"
              onClick={() => navigate('/admin/settings')}
            >
              <Layers size={24} className="text-gray-400" />
              <span>Instellingen</span>
            </Button>

            <Button
              className="h-24 flex flex-col items-center justify-center gap-2 border border-[#D4AF37] text-[#D4AF37]"
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