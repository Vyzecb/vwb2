
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    site_name: 'Vos Web Designs',
    site_description: 'Premium webdesign & ontwikkeling voor ambitieuze bedrijven.',
    contact_email: 'info@voswebdesigns.nl',
    contact_phone: '+31 20 123 4567',
    address_street: '',
    address_city: 'Amsterdam',
    address_postal_code: '',
    address_country: 'Nederland',
    social_instagram: '',
    social_linkedin: '',
    social_facebook: '',
    social_twitter: '',
    seo_meta_description: '',
    seo_keywords: '',
    notify_new_project: true,
    notify_new_review: true,
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching site settings:', error);
      }

      if (data) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Unexpected error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const refreshSettings = async () => {
    await fetchSettings();
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
