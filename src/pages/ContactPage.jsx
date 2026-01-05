import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send, Package } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    package: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    toast({
      title: 'Bericht verzonden ✉️',
      description: 'We nemen binnen 24 uur contact met u op.',
      duration: 5000
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      package: '',
      message: ''
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact – Vos Web Designs</title>
        <meta
          name="description"
          content="Start uw project bij Vos Web Designs. Kies uw dienst en pakket en ontvang binnen 24 uur reactie."
        />
      </Helmet>

      <main className="pt-24 pb-16">
        {/* HERO */}
        <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Start Uw{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  Project
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Kies een dienst en pakket – wij regelen de rest.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* FORM */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6">Contactformulier</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      name="name"
                      placeholder="Naam *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      name="phone"
                      placeholder="Telefoon"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                    />
                    <input
                      name="company"
                      placeholder="Bedrijf"
                      value={formData.company}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>

                  {/* DIENST */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Dienst
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="">Selecteer een dienst</option>
                      <option value="Webdesign">Webdesign</option>
                      <option value="Webontwikkeling">Webontwikkeling</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="SEO & Marketing">SEO & Marketing</option>
                      <option value="Performance">Performance optimalisatie</option>
                    </select>
                  </div>

                  {/* PAKKET */}
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Gekozen pakket
                    </label>
                    <select
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="">Selecteer pakket</option>
                      <option value="Starter">Starter</option>
                      <option value="Groei (Meest gekozen)">Groei (Meest gekozen)</option>
                      <option value="Pro">Pro</option>
                    </select>
                  </div>

                  {/* MESSAGE */}
                  <textarea
                    name="message"
                    placeholder="Vertel kort over uw project *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input resize-none"
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black"
                  >
                    Verstuur aanvraag
                    <Send className="ml-2" size={20} />
                  </Button>
                </form>
              </motion.div>

              {/* INFO CARD */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:sticky lg:top-28"
              >
                <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6">
                    Wat gebeurt er na uw aanvraag?
                  </h3>

                  <ul className="space-y-5 text-gray-300">
                    <li>✅ Reactie binnen 24 uur</li>
                    <li>✅ Kort kennismakingsgesprek</li>
                    <li>✅ Heldere planning & prijs</li>
                    <li>✅ Snelle projectstart</li>
                  </ul>

                  <p className="text-gray-400 text-sm mt-6">
                    Geen verplichtingen. Geen kleine lettertjes.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactPage;