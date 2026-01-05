import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Trash, Eye, EyeOff, Edit, Plus, X, Loader2, Image as ImageIcon, FolderKanban } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import ImageUpload from '@/components/admin/ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';

const initialFormState = {
  title: '',
  slug: '',
  category_id: '',
  short_description: '',
  description: '',       // ✅ nieuw (veilig)
  hero_image: '',
  client: '',
  year: '2026',
  duration: '',          // ✅ nieuw (veilig)
  is_featured: false,
  is_published: true,
};

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pRes, cRes] = await Promise.all([
        supabase.from('projects').select('*, categories(name)').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name'),
      ]);

      if (pRes.error) throw pRes.error;
      if (cRes.error) throw cRes.error;

      setProjects(pRes.data || []);
      setCategories(cRes.data || []);
    } catch (e) {
      toast({ variant: 'destructive', title: 'Fout', description: e.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (project) => {
    // 🛡️ merge zodat null-velden NIET je formulier slopen
    setFormData({ ...initialFormState, ...project });
    setIsEditing(project.id);
    setShowForm(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData };

    if (!dataToSend.slug) {
      dataToSend.slug = dataToSend.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
    }

    const { error } = isEditing
      ? await supabase.from('projects').update(dataToSend).eq('id', isEditing)
      : await supabase.from('projects').insert([dataToSend]);

    if (error) {
      toast({ variant: 'destructive', title: 'Fout', description: error.message });
      return;
    }

    toast({ title: 'Succes', description: isEditing ? 'Project bijgewerkt' : 'Project aangemaakt' });
    closeForm();
    fetchData();
  };

  const togglePublish = async (id, current) => {
    await supabase.from('projects').update({ is_published: !current }).eq('id', id);
    setProjects(projects.map(p => p.id === id ? { ...p, is_published: !current } : p));
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-400 text-sm">Beheer je projecten</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-[#D4AF37] text-black">
            <Plus size={18} className="mr-2" /> Nieuw project
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 space-y-4"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <ImageUpload
                value={formData.hero_image}
                onChange={(url) => setFormData({ ...formData, hero_image: url })}
              />

              <input className="input" placeholder="Titel"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                required
              />

              <input className="input" placeholder="Klant"
                value={formData.client || ''}
                onChange={e => setFormData({ ...formData, client: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <input className="input" placeholder="Jaar"
                  value={formData.year || ''}
                  onChange={e => setFormData({ ...formData, year: e.target.value })}
                />

                <input className="input" placeholder="Projectduur (bijv. 6 weken)"
                  value={formData.duration || ''}
                  onChange={e => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>

              <textarea className="input h-20" placeholder="Korte beschrijving"
                value={formData.short_description || ''}
                onChange={e => setFormData({ ...formData, short_description: e.target.value })}
              />

              <textarea className="input h-32" placeholder="Uitgebreide projectbeschrijving"
                value={formData.description || ''}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />

              <div className="flex gap-3">
                <Button type="submit" className="bg-[#D4AF37] text-black flex-1">Opslaan</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={closeForm}>Annuleren</Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;