import { supabase } from '@/lib/customSupabaseClient';

export const getPortfolioByIdWithImages = async (id) => {
  const { data: portfolio, error: portfolioError } = await supabase
    .from('projects')
    .select('*, categories(name)')
    .eq('id', id)
    .single();

  if (portfolioError) {
    throw portfolioError;
  }

  const { data: images, error: imageError } = await supabase
    .from('portfolio_images')
    .select('*')
    .eq('portfolio_id', id)
    .order('is_cover', { ascending: false })
    .order('sort_order', { ascending: true });

  if (imageError) {
    throw imageError;
  }

  return {
    portfolio,
    images: images || [],
  };
};
