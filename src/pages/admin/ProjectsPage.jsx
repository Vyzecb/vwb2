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

  // ⬇️ UITGEBREID MAAR BACKWARD SAFE
  const initialFormState = {
    title: '',
    slug: '',
    category_id: '',
    short_description: '',
    description: '',       // ✅ nieuw
    hero_image: '',
    client: '',
    year: '2026',
    duration: '',          // ✅ nieuw
    is_featured: false,
    is_published: true,
  };

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
    } catch (error) {
      toast({ variant: 'destructive', title: 'Fout', description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // 🔒 BELANGRIJK: MERGE i.p.v. overwrite
  const openEdit = (project) => {
    setFormData({
      ...initialFormState,
      ...project,
    });
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

      // slug veilig genereren
      if (!dataToSend.slug && dataToSend.title) {
        dataToSend.slug = dataToSend.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '');
      }

      // 🔒 GEEN destructieve update
      const query = isEditing
        ? supabase.from('projects').update(dataToSend).eq('id', isEditing)
        : supabase.from('projects').insert([dataToSend]);

      const { error } = await query;
      if (error) throw error;

      toast({
        title: 'Succes',
        description: isEditing ? 'Project bijgewerkt' : 'Project aangemaakt',
      });

      closeForm();
      fetchData();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Fout', description: error.message });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

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
      const { error } = await supabase
        .from('projects')
        .update({ is_published: !current })
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.map(p =>
        p.id === id ? { ...p, is_published: !current } : p
      ));
    } catch {
      toast({ variant: 'destructive', title: 'Fout', description: 'Kon status niet wijzigen' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-400 text-sm mt-1">Beheer je projecten en cases.</p>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto bg-[#D4AF37] text-black hover:bg-[#b8962e]"
          >
            <Plus size={20} className="mr-2" /> Nieuw Project
          </Button>
        )}
      </div>

      {/* FORM + LIST */}
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:col-span-5 w-full order-1 lg:order-2"
            >
              <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 shadow-xl">
                <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                  <h2 className="text-lg font-bold text-white">
                    {isEditing ? 'Bewerk' : 'Nieuw'} Project
                  </h2>
                  <Button variant="ghost" size="sm" onClick={closeForm} className="h-8 w-8 p-0">
                    <X size={18} />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <ImageUpload
                    value={formData.hero_image || ''}
                    onChange={(url) => setFormData({ ...formData, hero_image: url })}
                  />

                  <input
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                    placeholder="Titel"
                    value={formData.title || ''}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                      placeholder="Jaar"
                      value={formData.year || ''}
                      onChange={e => setFormData({ ...formData, year: e.target.value })}
                    />
                    <input
                      className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white"
                      placeholder="Projectduur (bijv. 6 weken)"
                      value={formData.duration || ''}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>

                  <textarea
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white h-20"
                    placeholder="Korte beschrijving"
                    value={formData.short_description || ''}
                    onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                  />

                  <textarea
                    className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white h-32"
                    placeholder="Uitgebreide projectbeschrijving"
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1 bg-[#D4AF37] text-black">
                      Opslaan
                    </Button>
                    <Button type="button" variant="outline" className="flex-1" onClick={closeForm}>
                      Annuleren
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIST */}
        <div className={`w-full order-2 lg:order-1 ${showForm ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
            </div>
          ) : (
            projects.map(p => (
              <div key={p.id} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 flex gap-4">
                <div className="w-24 h-24 bg-black rounded overflow-hidden">
                  {p.hero_image ? (
                    <img src={p.hero_image} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-gray-600 m-auto" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.short_description || '—'}</p>
                </div>
                <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                  <Edit size={18} />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        title="Project verwijderen"
        description="Weet je zeker dat je dit project wilt verwijderen?"
      />
    </div>
  );
};

export default ProjectsPage;