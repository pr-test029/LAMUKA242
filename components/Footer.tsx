
import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUpRight, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61566101510604";

  return (
    <footer className="bg-slate-900 text-slate-300 relative border-t-4 border-pink-600">
      {/* Texture d'arrière-plan discrète */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Colonne 1 : Branding & Logo */}
          <div className="space-y-6">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => onNavigate('home')}
            >
              <div className="relative">
                <img 
                  src="https://thumbs2.imgbox.com/12/21/uxdzy3zH_b.jpg" 
                  alt="Logo LAMUKA" 
                  className="h-16 w-16 mr-3 rounded-full object-cover border-2 border-pink-500 shadow-lg transition-transform group-hover:scale-105" 
                />
                <div className="absolute -bottom-1 -right-1 bg-pink-600 rounded-full p-1 border-2 border-slate-900">
                  <Heart size={10} className="text-white fill-current" />
                </div>
              </div>
              <span className="font-black text-2xl text-white tracking-tighter">LAMUKA</span>
            </div>
            <p className="text-slate-400 leading-relaxed italic text-sm">
              "Solidarité – Justice - Développement"
            </p>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">
              Association à but non lucratif
            </p>
            <div className="flex space-x-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-md">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Navigation Rapide */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              Explorer <div className="h-1 w-8 bg-pink-600 ml-3 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'about', label: 'À Propos' },
                { id: 'services', label: 'Nos Actions' },
                { id: 'blog', label: 'Actualités' },
                { id: 'contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => onNavigate(link.id)}
                    className="flex items-center group text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    <ArrowUpRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-pink-500" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 : Contact & Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              Nous Joindre <div className="h-1 w-8 bg-pink-600 ml-3 rounded-full"></div>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin size={20} className="text-pink-500 mr-3 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm leading-snug">20, rue KIPOUANDZA, Mfilou-NGAMABA, Brazzaville, Congo</span>
              </li>
              <li className="flex items-center group">
                <Phone size={20} className="text-pink-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">06 920 60 58 / 06 852 65 55</span>
              </li>
              <li className="flex items-center group">
                <Mail size={20} className="text-pink-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm truncate">collectiflamuka2025@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Engagement */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              Soutenir <div className="h-1 w-8 bg-pink-600 ml-3 rounded-full"></div>
            </h4>
            <div className="bg-slate-800/40 p-6 rounded-3xl border border-slate-700/50 backdrop-blur-sm shadow-inner">
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Votre soutien permet d'offrir un avenir plus digne aux femmes en situation de handicap.
              </p>
              <button 
                onClick={() => onNavigate('contact')}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-pink-500/20 active:scale-95"
              >
                Contribuer
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500 flex items-center">
            &copy; {currentYear} <span className="text-slate-300 font-semibold mx-1">Collectif LAMUKA</span> — Fait avec <Heart size={14} className="mx-1 text-pink-600 fill-current" /> pour l'inclusion.
          </div>
          <div className="flex space-x-8 text-[10px] text-slate-600 uppercase font-black tracking-[0.2em]">
            <button onClick={() => onNavigate('legal')} className="hover:text-pink-500 transition-colors uppercase">Mentions Légales</button>
            <button onClick={() => onNavigate('privacy')} className="hover:text-pink-500 transition-colors uppercase">Politique de Confidentialité</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
