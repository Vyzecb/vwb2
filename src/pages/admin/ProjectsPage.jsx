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
    title: '', slug: '', category_id: '', description: '', short_description: '',
    hero_image: '', client: '', year: '2026', is_featured: false, is_published: true
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
      toast({ variant: "destructive", title: "Fout", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openEdit = (project) => {
    setFormData(project);
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
          dataToSend.slug = dataToSend.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      }

      const { error } = isEditing 
        ? await supabase.from('projects').update(dataToSend).eq('id', isEditing)
        : await supabase.from('projects').insert([dataToSend]);

      if (error) throw error;

      toast({ title: "Succes", description: isEditing ? "Project bijgewerkt" : "Project aangemaakt" });
      closeForm();
      fetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Fout", description: error.message });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', deleteId);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== deleteId));
      toast({ title: "Verwijderd", description: "Project succesvol verwijderd" });
    } catch (error) {
      toast({ variant: "destructive", title: "Fout", description: error.message });
    } finally {
      setDeleteId(null);
    }
  };

  const togglePublish = async (id, current) => {
    try {
      const { error } = await supabase.from('projects').update({ is_published: !current }).eq('id', id);
      if (error) throw error;
      setProjects(projects.map(p => p.id === id ? { ...p, is_published: !current } : p));
    } catch (error) {
      toast({ variant: "destructive", title: "Fout", description: "Kon status niet wijzigen" });
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
          <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto bg-[#D4AF37] text-black hover:bg-[#b8962e]">
            <Plus size={20} className="mr-2" /> Nieuw Project
          </Button>
        )}
      </div>

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
                  <h2 className="text-lg font-bold text-white">{isEditing ? 'Bewerk' : 'Nieuw'} Project</h2>
                  <Button variant="ghost" size="sm" onClick={closeForm} className="h-8 w-8 p-0">
                    <X size={18} />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Afbeelding</label>
                    <ImageUpload 
                      value={formData.hero_image} 
                      onChange={(url) => setFormData({...formData, hero_image: url})} 
                    />
                  </div>

                  <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Titel</label>
                        <input 
                          className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none transition-colors" 
                          value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">Categorie</label>
                        <select 
                          className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none appearance-none" 
                          value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}
                        >
                          <option value="">Selecteer categorie...</option>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Klant</label>
                            <input 
                            className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none" 
                            value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Jaar</label>
                            <input 
                            className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none" 
                            value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} 
                            />
                        </div>
                      </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Korte beschrijving</label>
                    <textarea 
                        className="w-full p-3 bg-black border border-gray-700 rounded-lg text-white h-20 focus:border-[#D4AF37] focus:outline-none resize-none" 
                        value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                      <label className="flex flex-col p-3 rounded-lg border border-gray-800 bg-black/50 cursor-pointer hover:border-gray-600 transition-colors">
                        <span className="text-gray-400 text-xs uppercase font-bold mb-2">Status</span>
                        <div className="flex items-center gap-2">
                           <input type="checkbox" className="rounded border-gray-700 bg-[#1a1a1a] text-[#D4AF37] focus:ring-[#D4AF37]" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} />
                           <span className={formData.is_published ? "text-green-400 text-sm font-medium" : "text-gray-500 text-sm"}>{formData.is_published ? "Online" : "Concept"}</span>
                        </div>
                      </label>
                      <label className="flex flex-col p-3 rounded-lg border border-gray-800 bg-black/50 cursor-pointer hover:border-gray-600 transition-colors">
                        <span className="text-gray-400 text-xs uppercase font-bold mb-2">Promotie</span>
                        <div className="flex items-center gap-2">
                           <input type="checkbox" className="rounded border-gray-700 bg-[#1a1a1a] text-[#D4AF37] focus:ring-[#D4AF37]" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} />
                           <span className={formData.is_featured ? "text-[#D4AF37] text-sm font-medium" : "text-gray-500 text-sm"}>{formData.is_featured ? "Uitgelicht" : "Standaard"}</span>
                        </div>
                      </label>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-800 mt-4">
                    <Button type="submit" className="flex-1 bg-[#D4AF37] text-black hover:bg-[#b8962e]">Opslaan</Button>
                    <Button type="button" variant="outline" className="flex-1 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800" onClick={closeForm}>Annuleren</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`w-full order-2 lg:order-1 transition-all duration-300 ${showForm ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
           <div className="space-y-4">
             {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
                </div>
             ) : (
               <>
                {projects.map(p => (
                  <div key={p.id} className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 flex flex-col sm:flex-row gap-4 group hover:border-[#D4AF37]/50 transition-all shadow-sm">
                      {/* Image Thumbnail */}
                      <div className="w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-black border border-gray-800 relative">
                          {p.hero_image ? (
                             <img src={p.hero_image} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-700">
                                <ImageIcon size={24} />
                             </div>
                          )}
                          <div className="absolute top-2 right-2 sm:hidden">
                             <div className={`w-2 h-2 rounded-full ${p.is_published ? 'bg-green-500' : 'bg-gray-500'}`} />
                          </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-1">
                             <h3 className="font-bold text-white text-lg truncate">{p.title}</h3>
                             {p.is_featured && <span className="text-[10px] uppercase font-bold bg-[#D4AF37] text-black px-1.5 py-0.5 rounded">Top</span>}
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-3">{p.short_description || "Geen beschrijving"}</p>
                          
                          <div className="flex items-center gap-2 mt-auto">
                            {p.categories?.name && (
                              <span className="text-xs bg-[#2a2a2a] text-gray-300 px-2 py-1 rounded border border-gray-700">
                                {p.categories.name}
                              </span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded border ${p.is_published ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                              {p.is_published ? "Online" : "Concept"}
                            </span>
                          </div>
                      </div>

                      {/* Actions */}
                      <div className="flex sm:flex-col items-center gap-2 sm:border-l border-t sm:border-t-0 border-gray-800 pt-3 sm:pt-0 sm:pl-4 justify-end sm:justify-center w-full sm:w-auto">
                        <Button size="icon" variant="ghost" onClick={() => togglePublish(p.id, p.is_published)} title={p.is_published ? "Offline halen" : "Publiceren"} className="h-9 w-9 hover:bg-gray-800">
                          {p.is_published ? <Eye className="text-green-500" size={18} /> : <EyeOff className="text-gray-500" size={18} />}
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => openEdit(p)} className="h-9 w-9 hover:bg-gray-800">
                            <Edit className="text-blue-400" size={18} />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-9 w-9" onClick={() => setDeleteId(p.id)}>
                          <Trash size={18} />
                        </Button>
                      </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="text-center py-20 text-gray-500 bg-[#1a1a1a]/50 rounded-xl border border-gray-800 border-dashed">
                    <div className="flex justify-center mb-4"><FolderKanban size={48} className="opacity-20" /></div>
                    <p>Nog geen projecten.</p>
                    <Button variant="link" onClick={() => setShowForm(true)} className="text-[#D4AF37]">Maak je eerste project aan</Button>
                  </div>
                )}
               </>
             )}
           </div>
        </div>
      </div>

      <DeleteConfirmDialog 
        isOpen={!!deleteId} 
        onConfirm={handleDelete} 
        onCancel={() => setDeleteId(null)}
        title="Project verwijderen"
        description="Weet je zeker dat je dit project wilt verwijderen? Dit kan niet ongedaan gemaakt worden."
      />
    </div>
  );
};

export default ProjectsPage;
