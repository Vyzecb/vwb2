
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Trash, Loader2, Plus, Layers } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Track specific item being deleted to show loading state on button
  const [deletingId, setDeletingId] = useState(null);

  const fetchCats = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({ variant: "destructive", title: "Fout", description: "Kon categorieën niet laden" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCats(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    try {
      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const { error } = await supabase.from('categories').insert([{ name, slug }]);
      
      if (error) throw error;
      
      toast({ title: "Succes", description: "Categorie toegevoegd" });
      setName('');
      fetchCats();
    } catch (error) {
      toast({ variant: "destructive", title: "Fout", description: error.message });
    }
  };

  const handleDelete = async (id, categoryName) => {
    // 1. Simple Native Confirmation
    // This bypasses any React/Radix UI rendering issues on mobile
    if (!window.confirm(`Weet je zeker dat je "${categoryName}" wilt verwijderen?`)) {
      return;
    }

    setDeletingId(id);

    try {
      console.log("Deleting category:", id);
      
      // 2. Direct Supabase Delete
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) {
        // Handle Foreign Key Constraint (Category in use)
        if (error.code === '23503') {
           throw new Error("Deze categorie is in gebruik en kan niet worden verwijderd.");
        }
        throw error;
      }

      // 3. Optimistic UI Update - Immediately remove from list
      setCategories(current => current.filter(c => c.id !== id));
      
      toast({ 
        title: "Verwijderd", 
        description: "Categorie succesvol verwijderd" 
      });
      
    } catch (error) {
      console.error('Delete failed:', error);
      toast({ 
        variant: "destructive", 
        title: "Kon niet verwijderen", 
        description: error.message || "Er is een fout opgetreden." 
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-6 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Categorieën</h1>
        <p className="text-gray-400 text-sm">Beheer de categorieën voor je portfolio items.</p>
      </div>
      
      {/* Input Section */}
      <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input 
             placeholder="Nieuwe categorie naam..." 
             className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] transition-all" 
             value={name} onChange={e => setName(e.target.value)} required 
          />
          <Button type="submit" className="bg-[#D4AF37] text-black font-medium hover:bg-[#b8962e] h-auto py-3 sm:w-auto w-full">
            <Plus size={18} className="mr-2" />
            Toevoegen
          </Button>
        </form>
      </div>

      {/* List Section */}
      <div className="bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden shadow-sm">
         {loading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
            </div>
         ) : (
           <div className="divide-y divide-gray-800">
             {categories.map(c => (
                <div key={c.id} className="p-4 flex justify-between items-center hover:bg-[#252525] transition-colors group">
                   <div className="flex flex-col">
                     <span className="font-medium text-gray-200">{c.name}</span>
                     <span className="text-xs text-gray-500 font-mono">/{c.slug}</span>
                   </div>
                   
                   <Button 
                      size="icon" 
                      variant="ghost" 
                      disabled={deletingId === c.id}
                      className="text-gray-500 hover:text-red-400 hover:bg-red-500/10 h-12 w-12 sm:h-10 sm:w-10"
                      onClick={() => handleDelete(c.id, c.name)}
                   >
                     {deletingId === c.id ? (
                       <Loader2 size={18} className="animate-spin text-red-500" />
                     ) : (
                       <Trash size={18} />
                     )}
                   </Button>
                </div>
             ))}
             {categories.length === 0 && (
                <div className="p-12 text-center flex flex-col items-center text-gray-500 gap-2">
                   <Layers size={32} className="opacity-50" />
                   <p>Geen categorieën gevonden.</p>
                </div>
             )}
           </div>
         )}
      </div>
    </div>
  );
};

export default CategoriesPage;
