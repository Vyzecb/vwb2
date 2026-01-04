
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import PortfolioPage from '@/pages/PortfolioPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import ServicesPage from '@/pages/ServicesPage';
import AboutPage from '@/pages/AboutPage';
import ProcessPage from '@/pages/ProcessPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsPage from '@/pages/TermsPage';

// Admin Imports
import LoginPage from '@/pages/admin/LoginPage';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardPage from '@/pages/admin/DashboardPage';
import ProjectsPage from '@/pages/admin/ProjectsPage';
import TestimonialsPage from '@/pages/admin/TestimonialsPage';
import CategoriesPage from '@/pages/admin/CategoriesPage';
import SettingsPage from '@/pages/admin/SettingsPage';

// Component to handle global SEO based on settings
const GlobalSEO = () => {
  const { settings } = useSettings();
  
  return (
    <Helmet>
      <title>{settings.site_name || 'Vos Web Designs'}</title>
      <meta name="description" content={settings.seo_meta_description || settings.site_description || 'Premium webdesign'} />
      {settings.seo_keywords && <meta name="keywords" content={settings.seo_keywords} />}
    </Helmet>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SettingsProvider>
          <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
            <GlobalSEO />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<><Header /><HomePage /><Footer /></>} />
              <Route path="/portfolio" element={<><Header /><PortfolioPage /><Footer /></>} />
              <Route path="/portfolio/:projectId" element={<><Header /><ProjectDetailPage /><Footer /></>} />
              <Route path="/diensten" element={<><Header /><ServicesPage /><Footer /></>} />
              <Route path="/over-ons" element={<><Header /><AboutPage /><Footer /></>} />
              <Route path="/werkwijze" element={<><Header /><ProcessPage /><Footer /></>} />
              <Route path="/contact" element={<><Header /><ContactPage /><Footer /></>} />
              <Route path="/privacy" element={<><Header /><PrivacyPolicyPage /><Footer /></>} />
              <Route path="/voorwaarden" element={<><Header /><TermsPage /><Footer /></>} />
              <Route path="/login" element={<LoginPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="testimonials" element={<TestimonialsPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              <Route path="*" element={<><Header /><NotFoundPage /><Footer /></>} />
            </Routes>
            <Toaster />
          </div>
        </SettingsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
