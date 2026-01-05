// === NIEUW / AANGEPAST ===
// + description textarea
// + duration input
// + correct opgeslagen & geladen

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
  description: '',        // ✅ LANG
  hero_image: '',
  client: '',
  year: '2026',
  duration: '',           // ✅ DUUR
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
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
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
    setFormData({ ...initialFormState, ...project });
    setIsEditing(project.id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...formData };
    if (!data.slug) {
      data.slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    }

    const { error } = isEditing
      ? await supabase.from('projects').update(data).eq('id', isEditing)
      : await supabase.from('projects').insert([data]);

    if (error) {
      toast({ variant: 'destructive', title: 'Fout', description: error.message });
      return;
    }

    toast({ title: 'Succes', description: isEditing ? 'Project bijgewerkt' : 'Project aangemaakt' });
    closeForm();
    fetchData();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Button onClick={() => setShowForm(true)} className="bg-[#D4AF37] text-black">
        <Plus size={18} className="mr-2" /> Nieuw project
      </Button>

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 space-y-4"
          >
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
              value={formData.client}
              onChange={e => setFormData({ ...formData, client: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <input className="input" placeholder="Jaar"
                value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
              />

              <input className="input" placeholder="Projectduur (bijv. 6 weken)"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>

            <textarea className="input h-20" placeholder="Korte beschrijving"
              value={formData.short_description}
              onChange={e => setFormData({ ...formData, short_description: e.target.value })}
            />

            {/* ✅ DIT MISSEDE */}
            <textarea className="input h-32" placeholder="Uitgebreide projectbeschrijving"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            <div className="flex gap-3">
              <Button type="submit" className="bg-[#D4AF37] text-black">Opslaan</Button>
              <Button type="button" variant="outline" onClick={closeForm}>Annuleren</Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;