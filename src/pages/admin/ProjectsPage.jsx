import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Trash, Eye, EyeOff, Edit, Plus, X, Loader2, Image as ImageIcon, FolderKanban } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import ImageUpload from '@/components/admin/ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const initialFormState = {
    title: '',
    slug: '',
    category_id: '',
    description: '',
    short_description: '',
    hero_image: '',
    client: '',
    year: '2026',
    duration: '',          // ✅ PROJECTDUUR
    is_featured: false,
    is_published: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pRes, cRes] = await Promise.all([
        supabase.from('projects').select('*, categories(name)').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name')
      ]);

      if (pRes.error) throw pRes.error;
      if (cRes.error) throw cRes.error;

      setProjects(pRes.data || []);
      setCategories(cRes.data || []);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Fout', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (project) => {
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
    try {
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

      if (error) throw error;

      toast({ title: 'Succes', description: isEditing ? 'Project bijgewerkt' : 'Project aangemaakt' });
      closeForm();
      fetchData();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Fout', description: error.message });
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase.from('projects').delete().eq('id', deleteId);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== deleteId));
      toast({ title: 'Verwijderd', description: 'Project succesvol verwijderd' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Fout', description: error.message });
    } finally {
      setDeleteId(null);
    }
  };

  const togglePublish = async (id, current) => {
    try {
      await supabase.from('projects').update({ is_published: !current }).eq('id', id);
      setProjects(projects.map(p => p.id === id ? { ...p, is_published: !current } : p));
    } catch {
      toast({ variant: 'destructive', title: 'Fout', description: 'Kon status niet wijzigen' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-400 text-sm mt-1">Beheer je projecten en cases.</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="bg-[#D4AF37] text-black">
            <Plus size={18} className="mr-2" /> Nieuw project
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:col-span-5"
            >
              <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <ImageUpload
                    value={formData.hero_image}
                    onChange={(url) => setFormData({ ...formData, hero_image: url })}
                  />

                  <input className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Titel"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                  />

                  <input className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Klant"
                    value={formData.client}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                      placeholder="Jaar"
                      value={formData.year}
                      onChange={e => setFormData({ ...formData, year: e.target.value })}
                    />

                    {/* ✅ PROJECTDUUR */}
                    <input className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                      placeholder="Projectduur (bijv. 6 weken)"
                      value={formData.duration}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>

                  <textarea className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white h-24"
                    placeholder="Korte beschrijving"
                    value={formData.short_description}
                    onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1 bg-[#D4AF37] text-black">Opslaan</Button>
                    <Button type="button" variant="outline" className="flex-1" onClick={closeForm}>Annuleren</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`lg:col-span-${showForm ? '7' : '12'}`}>
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        title="Project verwijderen"
      />
    </div>
  );
};

export default ProjectsPage;