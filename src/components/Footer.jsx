
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1] bg-clip-text text-transparent">
              Vos Web Designs
            </span>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Premium webdesign & ontwikkeling voor ambitieuze bedrijven in Nederland.
            </p>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block">Snel Navigeren</span>
            <nav className="flex flex-col gap-2">
              <Link to="/portfolio" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                Portfolio
              </Link>
              <Link to="/diensten" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                Diensten
              </Link>
              <Link to="/over-ons" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                Over Ons
              </Link>
              <Link to="/werkwijze" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
                Werkwijze
              </Link>
            </nav>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block">Contact</span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} className="text-[#D4AF37]" />
                <span>info@voswebdesigns.nl</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={16} className="text-[#D4AF37]" />
                <span>+31 6 4860 8336</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block">Volg Ons</span>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Vos Web Designs. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
              Privacybeleid
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-[#D4AF37] transition-colors text-sm">
              Algemene Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
