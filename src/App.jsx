
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
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
    <RouterProvider router={router} />
  );
}

const PublicPageLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const RootLayout = () => (
  <AuthProvider>
    <SettingsProvider>
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
        <GlobalSEO />
        <Outlet />
        <Toaster />
      </div>
    </SettingsProvider>
  </AuthProvider>
);

const routes = createRoutesFromElements(
  <Route path="/" element={<RootLayout />}>
    <Route index element={<PublicPageLayout><HomePage /></PublicPageLayout>} />
    <Route path="portfolio" element={<PublicPageLayout><PortfolioPage /></PublicPageLayout>} />
    <Route path="portfolio/:projectId" element={<PublicPageLayout><ProjectDetailPage /></PublicPageLayout>} />
    <Route path="diensten" element={<PublicPageLayout><ServicesPage /></PublicPageLayout>} />
    <Route path="over-ons" element={<PublicPageLayout><AboutPage /></PublicPageLayout>} />
    <Route path="werkwijze" element={<PublicPageLayout><ProcessPage /></PublicPageLayout>} />
    <Route path="contact" element={<PublicPageLayout><ContactPage /></PublicPageLayout>} />
    <Route path="privacy" element={<PublicPageLayout><PrivacyPolicyPage /></PublicPageLayout>} />
    <Route path="voorwaarden" element={<PublicPageLayout><TermsPage /></PublicPageLayout>} />
    <Route path="login" element={<LoginPage />} />

    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="testimonials" element={<TestimonialsPage />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>

    <Route path="*" element={<PublicPageLayout><NotFoundPage /></PublicPageLayout>} />
  </Route>
);

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

export default App;
