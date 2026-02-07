
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const 404 = () => {
  return (
    <>
      <Helmet>
        <title>404 - Pagina Niet Gevonden | Vos Web Designs</title>
        <meta
          name="description"
          content="Deze pagina bestaat niet. Ga terug naar de homepage of neem contact op als u hulp nodig heeft."
        />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] pt-20 px-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#38bdf8] rounded-full filter blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#38bdf8] rounded-full filter blur-[128px]" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-9xl md:text-[200px] font-bold bg-gradient-to-r from-[#38bdf8] to-[#60a5fa] bg-clip-text text-transparent leading-none block mb-4">
              404
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Pagina Niet Gevonden
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            De pagina die u zoekt bestaat niet of is verplaatst. Geen zorgen, we helpen u graag verder.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#38bdf8] to-[#60a5fa] text-black hover:opacity-90 transition-opacity"
              >
                <Home className="mr-2" size={20} />
                Naar Homepage
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:border-[#38bdf8] hover:text-[#38bdf8]"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2" size={20} />
              Ga Terug
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-12 border-t border-gray-800"
          >
            <p className="text-gray-400 mb-4">Populaire Paginas:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/portfolio" className="text-[#38bdf8] hover:underline">
                Portfolio
              </Link>
              <Link to="/diensten" className="text-[#38bdf8] hover:underline">
                Diensten
              </Link>
              <Link to="/over-ons" className="text-[#38bdf8] hover:underline">
                Over Ons
              </Link>
              <Link to="/contact" className="text-[#38bdf8] hover:underline">
                Contact
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default 404;
