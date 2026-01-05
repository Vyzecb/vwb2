import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: 'Melvin Vos',
    role: 'Founder & Lead Developer',
    description:
      'Specialist in premium webdesign, webontwikkeling en performance optimalisatie.',
    image: '/team/melvin.jpg', // zorg dat deze bestaat in /public/team/
  },
  {
    id: 2,
    name: 'Team Member 2',
    role: 'Designer',
    description: 'Verborgen teamlid',
    image: '/team/member2.jpg',
  },
  {
    id: 3,
    name: 'Team Member 3',
    role: 'Marketing',
    description: 'Verborgen teamlid',
    image: '/team/member3.jpg',
  },
];

const TeamPage = () => {
  return (
    <>
      <Helmet>
        <title>Team - Vos Web Designs</title>
        <meta
          name="description"
          content="Maak kennis met het team achter Vos Web Designs."
        />
      </Helmet>

      <main className="pt-24 pb-16 bg-[#0a0a0a]">
        {/* HEADER */}
        <section className="text-center mb-16 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Ons{' '}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Klein team. Grote focus. Persoonlijke aanpak.
          </p>
        </section>

        {/* TEAM GRID */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {/* 🔒 SLECHTS 1 TEAMLID WORDT GERENDERD */}
            {teamMembers.slice(0, 1).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#D4AF37] font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* OPTIONAL FOOTNOTE */}
          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm">
              Het team wordt binnenkort uitgebreid.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default TeamPage;