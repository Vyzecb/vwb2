import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Edit, Star, Quote, Loader2, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const initialForm = {
    name: '',
    role: '',
    company: '',
    text: '',
    rating: 5,
    is_visible: true
  };

  const [formData, setFormData] = useState(initialForm);

  /* ================= FETCH ================= */
  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ================= SAVE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = isEditing
        ? await supabase.from('testimonials').update(formData).eq('id', isEditing)
        : await supabase.from('testimonials').insert([formData]);

      if (error) throw error;

      toast({ title: 'Succes', description: 'Review opgeslagen' });
      setShowForm(false);
      setIsEditing(null);
      setFormData(initialForm);
      fetchTestimonials();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Fout', description: error.message });
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(item.id);
    setShowForm(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    try {
      await supabase.from('testimonials').delete().eq('id', deleteId);
      setTestimonials(prev => prev.filter(t => t.id !== deleteId));
      toast({ title: 'Verwijderd', description: 'Review verwijderd' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Fout', description: e.message });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <>
      {/* 🔥 CRUCIALE FIX: DIALOG BUITEN FRAMER MOTION */}
      <DeleteConfirmDialog
        isOpen={!!deleteId}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        title="Review verwijderen"
        description="Weet je zeker dat je deze review wilt verwijderen?"
      />

      <div className="max-w-5xl mx-auto space-y-6 px-4 pb-24">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Testimonials</h1>
            <p className="text-gray-400 text-sm">Beheer reviews van klanten</p>
          </div>

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#D4AF37] text-black"
            >
              <Plus size={18} className="mr-2" />
              Nieuwe review
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* FORM */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="lg:col-span-4"
              >
                <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 sticky top-24">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">
                      {isEditing ? 'Bewerk review' : 'Nieuwe review'}
                    </h3>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowForm(false)}
                    >
                      <X size={18} />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                      placeholder="Naam"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                    />

                    <input
                      className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                      placeholder="Bedrijf"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />

                    <textarea
                      className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white h-32"
                      placeholder="Review tekst"
                      value={formData.text}
                      onChange={e => setFormData({ ...formData, text: e.target.value })}
                      required
                    />

                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white"
                      value={formData.rating}
                      onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                    />

                    <Button type="submit" className="w-full bg-[#D4AF37] text-black">
                      Opslaan
                    </Button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LIST */}
          <div className={`${showForm ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map(t => (
                  <div
                    key={t.id}
                    className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 flex flex-col"
                  >
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < t.rating
                                ? 'text-[#D4AF37] fill-[#D4AF37]'
                                : 'text-gray-700'
                            }
                          />
                        ))}
                      </div>

                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(t)}>
                          <Edit size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => setDeleteId(t.id)}>
                          <Trash size={16} className="text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <div className="relative pl-4 mb-4">
                      <Quote className="absolute left-0 top-0 text-[#D4AF37]/20" size={24} />
                      <p className="text-gray-300 italic text-sm">
                        "{t.text}"
                      </p>
                    </div>

                    <div className="mt-auto pt-3 border-t border-gray-800">
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.company}</p>
                    </div>
                  </div>
                ))}

                {testimonials.length === 0 && (
                  <div className="col-span-full text-center text-gray-500 py-12 border border-dashed border-gray-800 rounded-xl">
                    Geen reviews gevonden
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TestimonialsPage;