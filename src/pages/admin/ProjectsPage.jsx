import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import {
  Trash, Eye, EyeOff, Edit, Plus, X, Loader2,
  Image as ImageIcon, FolderKanban
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import ImageUpload from '@/components/admin/ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_FORM_STATE = {
  title: '',
  slug: '',
  category_id: '',
  short_description: '',
  description: '',        // ✅ nieuw
  hero_image: '',
  client: '',
  year: '2026',
  duration: '',           // ✅ nieuw
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
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  /* ===================== DATA ===================== */
  const fetchData = async () => {
    try {
      setLoading(true);
      const [pRes, cRes] = await Promise.all([
        supabase
          .from('projects')
          .select('*, categories(name)')
          .order('created_at', { ascending: false }),
        supabase
          .from('categories')
          .select('*')
          .order('name')
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

  /* ===================== EDIT ===================== */
  const openEdit = (project) => {
    // 🔒 merge i.p.v. overschrijven
    setFormData({
      ...INITIAL_FORM_STATE,
      ...project,
    });
    setIsEditing(project.id);
    setShowForm(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(null);
    setFormData(INITIAL_FORM_STATE);
  };

  /* ===================== SAVE ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { ...formData };

      // slug veilig
      if (!data.slug && data.title) {
        data.slug = data.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '');
      }

      const query = isEditing
        ? supabase.from('projects').update(data).eq('id', isEditing)
        : supabase.from('projects').insert([data]);

      const { error } = await query;
      if (error) throw error;

      toast({
        title: 'Succes',
        description: isEditing ? 'Project bijgewerkt' : 'Project aangemaakt'
      });

      closeForm();
      fetchData();
    } catch (e) {
      toast({ variant: 'destructive', title: 'Fout', description: e.message });
    }
  };

  /* ===================== DELETE ===================== */
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setProjects(prev => prev.filter(p => p.id !== deleteId));
      toast({ title: 'Verwijderd', description: 'Project succesvol verwijderd' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Fout', description: e.message });
    } finally {
      setDeleteId(null);
    }
  };

  /* ===================== PUBLISH ===================== */
  const togglePublish = async (id, current) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_published: !current })
        .eq('id', id);

      if (error) throw error;

      setProjects(prev =>
        prev.map(p => p.id === id ? { ...p, is_published: !current } : p)
      );
    } catch {
      toast({ variant: 'destructive', title: 'Fout', description: 'Kon status niet wijzigen' });
    }
  };

  /* ===================== UI ===================== */
  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-400 text-sm">Beheer je projecten en cases</p>
        </div>
        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#D4AF37] text-black"
          >
            <Plus size={18} className="mr-2" /> Nieuw project
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* FORM */}
        <AnimatePresence>
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
                    value={formData.hero_image || ''}
                    onChange={url => setFormData({ ...formData, hero_image: url })}
                  />

                  <input className="input" placeholder="Titel"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    required
                  />

                  <select className="input"
                    value={formData.category_id || ''}
                    onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                  >
                    <option value="">Selecteer categorie</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <input className="input" placeholder="Klant"
                      value={formData.client || ''}
                      onChange={e => setFormData({ ...formData, client: e.target.value })}
                    />
                    <input className="input" placeholder="Jaar"
                      value={formData.year || ''}
                      onChange={e => setFormData({ ...formData, year: e.target.value })}
                    />
                  </div>

                  <input className="input" placeholder="Projectduur (bijv. 6 weken)"
                    value={formData.duration || ''}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                  />

                  <textarea className="input h-20" placeholder="Korte beschrijving"
                    value={formData.short_description || ''}
                    onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                  />

                  <textarea className="input h-32" placeholder="Uitgebreide projectbeschrijving"
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />

                  {/* STATUS & PROMOTIE */}
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox"
                        checked={formData.is_published}
                        onChange={e => setFormData({ ...formData, is_published: e.target.checked })}
                      />
                      Online
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox"
                        checked={formData.is_featured}
                        onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                      />
                      Uitgelicht
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1 bg-[#D4AF37] text-black">Opslaan</Button>
                    <Button type="button" variant="outline" className="flex-1" onClick={closeForm}>Annuleren</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* LIST */}
        <div className={`${showForm ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 text-gray-500 border border-dashed border-gray-800 rounded-xl">
              <FolderKanban size={48} className="mx-auto mb-4 opacity-20" />
              Nog geen projecten
            </div>
          ) : (
            projects.map(p => (
              <div key={p.id} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 flex gap-4">
                <div className="w-24 h-24 bg-black rounded overflow-hidden">
                  {p.hero_image ? (
                    <img src={p.hero_image} alt={p.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="m-auto text-gray-600" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-white">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.short_description || '—'}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="ghost" onClick={() => togglePublish(p.id, p.is_published)}>
                    {p.is_published ? <Eye size={18} /> : <EyeOff size={18} />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                    <Edit size={18} />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setDeleteId(p.id)}>
                    <Trash size={18} className="text-red-500" />
                  </Button>
                </div>
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