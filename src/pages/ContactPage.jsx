import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
      title: 'Bericht Verzonden! ✉️',
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
        <title>Contact - Vos Web Designs</title>
      </Helmet>

      <main className="pt-24 pb-16">
        {/* HERO */}
        <section className="py-16 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Laten We{' '}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
                  In Gesprek Gaan
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Heeft u een project in gedachten? We horen graag over uw plannen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-16 bg-[#0a0a0a]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* FORM */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6">Stuur Een Bericht</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Naam */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Naam *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Uw naam"
                      className="input"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="uw@email.nl"
                      className="input"
                    />
                  </div>

                  {/* Telefoon */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Telefoon
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+31 6 12345678"
                      className="input"
                    />
                  </div>

                  {/* Bedrijf */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bedrijf
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Uw bedrijf"
                      className="input"
                    />
                  </div>

                  {/* Dienst */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Interesse In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Selecteer een dienst</option>
                      <option value="Webdesign">Webdesign</option>
                      <option value="Webontwikkeling">Webontwikkeling</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="SEO & Marketing">SEO & Marketing</option>
                      <option value="Anders">Anders</option>
                    </select>
                  </div>

                  {/* PAKKET (vervangt budget) */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Pakket
                    </label>
                    <select
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      className="input"
                      required
                    >
                      <option value="">Selecteer pakket</option>
                      <option value="Starter">Starter</option>
                      <option value="Groei">Groei</option>
                      <option value="Pro">Pro</option>
                    </select>
                  </div>

                  {/* Bericht */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bericht *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Vertel ons over uw project..."
                      className="input resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] text-black"
                  >
                    Verstuur Bericht
                    <Send className="ml-2" size={20} />
                  </Button>
                </form>
              </motion.div>

              {/* INFO */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:sticky lg:top-28"
              >
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6">
                    Wat Kunt U Verwachten?
                  </h3>

                  {[
                    'Snelle Reactie',
                    'Kennismakingsgesprek',
                    'Offerte op Maat',
                    'Project Start'
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 mb-4">
                      <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                        <span className="text-[#D4AF37] font-bold">
                          {i + 1}
                        </span>
                      </div>
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
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