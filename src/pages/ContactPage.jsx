import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

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
          content="Start uw project bij Vos Web Designs. Kies een dienst en pakket en ontvang binnen 24 uur reactie."
        />
      </Helmet>

      <main className="pt-24 pb-20 bg-[#0a0a0a]">
        {/* HERO – zelfde als Services */}
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
              <p className="text-xl text-gray-300 leading-relaxed">
                Kies een dienst en pakket – wij regelen de rest.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* FORM CARD */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-8"
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="">Selecteer dienst</option>
                      <option>Webdesign</option>
                      <option>Webontwikkeling</option>
                      <option>E-commerce</option>
                      <option>SEO & Marketing</option>
                      <option>Performance optimalisatie</option>
                    </select>

                    <select
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="">Selecteer pakket</option>
                      <option>Starter</option>
                      <option>Groei</option>
                      <option>Pro</option>
                    </select>
                  </div>

                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Vertel kort over uw project *"
                    value={formData.message}
                    onChange={handleChange}
                    required
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

              {/* INFO CARD – zelfde vibe als services packages */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-[#0f0f0f] border border-gray-800 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6">
                  Wat kunt u verwachten?
                </h3>

                <ul className="space-y-4 mb-8">
                  {[
                    'Reactie binnen 24 uur',
                    'Vrijblijvend kennismakingsgesprek',
                    'Heldere planning & prijs',
                    'Snelle projectstart'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-300">
                      <CheckCircle size={20} className="text-[#D4AF37]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-gray-800 text-gray-400 text-sm">
                  Geen verplichtingen. Geen kleine lettertjes.
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