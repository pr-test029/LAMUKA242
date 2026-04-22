
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Facebook, Navigation, Loader2, ExternalLink, Send, MessageCircle, Clock, HeartHandshake } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isLocating, setIsLocating] = useState(false);
  const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61566101510604";
  const DESTINATION_COORDS = "-4.2687132,15.2393222";

  const handleGetDirections = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${DESTINATION_COORDS}&travelmode=driving`;
          window.open(url, '_blank');
          setIsLocating(false);
        },
        () => {
          const url = `https://www.google.com/maps/dir/?api=1&destination=${DESTINATION_COORDS}`;
          window.open(url, '_blank');
          setIsLocating(false);
        }
      );
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${DESTINATION_COORDS}`;
      window.open(url, '_blank');
      setIsLocating(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-pink-100 selection:text-pink-600">
      <Helmet>
        <title>Contact & Soutien | Collectif LAMUKA</title>
        <meta name="description" content="Contactez le Collectif LAMUKA pour toute question ou pour nous soutenir. Retrouvez nos coordonnées à Brazzaville." />
        <meta name="keywords" content="contact LAMUKA, soutenir, association, Brazzaville, email, téléphone" />
      </Helmet>
      {/* Harmonized Hero Section - Match About.tsx */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 animate-slide-up">
          <span className="inline-block py-1 px-4 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-300 text-[10px] font-black tracking-widest uppercase">
            À Votre Écoute
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
            Restons en <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 uppercase">CONTACT</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
             Une question, un besoin d'aide ou une volonté de partenariat ? L'équipe de LAMUKA est à votre entière disposition.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24 -mt-16 relative z-20">
        <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {/* Info Side (2/5) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100/50">
               <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center">
                 <HeartHandshake className="w-6 h-6 text-pink-600 mr-4" />
                 Point de Contact
               </h2>
               
               <div className="space-y-10">
                  <div className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2">Adresse du Siège</h4>
                      <p className="text-lg font-bold text-slate-900">20, rue KIPOUANDZA</p>
                      <p className="text-slate-500 text-sm">Mfilou-NGAMABA, Brazzaville</p>
                      <p className="text-pink-600 text-[10px] font-black uppercase tracking-widest mt-2">Terminus Avenue Mayama</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2">Ligne Directe</h4>
                      <p className="text-lg font-bold text-slate-900">06 920 60 58</p>
                      <p className="text-lg font-bold text-slate-900">06 852 65 55</p>
                      <div className="flex items-center mt-2 text-green-600 text-[10px] font-black uppercase tracking-widest">
                         <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div> Disponible sur WhatsApp
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6 group">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2">Courrier Électronique</h4>
                      <p className="text-slate-900 font-bold border-b border-pink-100 inline-block">collectiflamuka2025@gmail.com</p>
                      <p className="text-slate-500 text-xs mt-1">Réponse garantie sous 24h</p>
                    </div>
                  </div>
               </div>

               <div className="mt-12 pt-10 border-t border-slate-50">
                  <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-slate-900 p-6 rounded-2xl text-white hover:bg-pink-600 transition-all shadow-xl group">
                     <div className="flex items-center space-x-4">
                        <Facebook className="w-6 h-6 fill-current" />
                        <span className="font-black uppercase tracking-widest text-xs">Notre Fan Page</span>
                     </div>
                     <ExternalLink className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
               </div>
            </div>

            <div className="bg-gradient-to-br from-pink-600 to-purple-800 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
               <h3 className="text-xl font-black mb-4 relative z-10 flex items-center leading-tight">Horaires de Permanence</h3>
               <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-white/60">Lundi - Vendredi</span>
                     <span className="font-black">08:00 - 16:30</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-white/60">Samedi</span>
                     <span className="font-black">09:00 - 13:00</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Form Side (3/5) */}
          <div className="lg:col-span-3">
             <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <MessageCircle className="w-12 h-12 text-pink-50" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter">Envoyer un Message</h2>
                
                <form className="space-y-8 relative z-10">
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Identité complète</label>
                        <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-2xl font-bold text-slate-900 focus:border-pink-500 focus:bg-white outline-none transition-all shadow-sm" placeholder="Votre nom" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Ligne téléphonique</label>
                        <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-2xl font-bold text-slate-900 focus:border-pink-500 focus:bg-white outline-none transition-all shadow-sm" placeholder="06 xxx xx xx" />
                      </div>
                   </div>
                   
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Adresse E-mail</label>
                      <input type="email" className="w-full bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-2xl font-bold text-slate-900 focus:border-pink-500 focus:bg-white outline-none transition-all shadow-sm" placeholder="contact@domaine.com" />
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2">Détails de votre demande</label>
                      <textarea rows={6} className="w-full bg-slate-50 border-2 border-slate-100 p-8 rounded-[2.5rem] font-medium text-slate-700 focus:border-pink-500 focus:bg-white outline-none transition-all resize-none shadow-sm leading-relaxed" placeholder="Comment LAMUKA peut vous accompagner ?"></textarea>
                   </div>

                   <button type="submit" className="w-full bg-slate-900 text-white font-black py-7 rounded-[2rem] flex items-center justify-center space-x-4 hover:bg-pink-600 hover:shadow-2xl transition-all transform active:scale-95 group shadow-xl">
                      <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                      <span className="uppercase tracking-widest text-sm">Transmettre ma demande</span>
                   </button>
                </form>
             </div>
          </div>
        </div>

        {/* Map Section - Refined */}
        <div className="max-w-7xl mx-auto mt-32 relative group">
           <div className="absolute -top-12 left-0 right-0 flex justify-center z-10">
              <button 
                onClick={handleGetDirections}
                disabled={isLocating}
                className="flex items-center space-x-4 bg-white text-slate-900 px-10 py-5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-pink-600 hover:text-white transition-all transform hover:-translate-y-2 border border-slate-100"
              >
                 {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                 <span>Localisation GPS Temps Réel</span>
              </button>
           </div>
           
           <div className="bg-white p-6 rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden">
              <div className="h-[500px] w-full rounded-[3rem] overflow-hidden">
                <iframe 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 scrolling="no" 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.966952766348!2d15.23713357583648!3d-4.268713195705359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3b003a891001%3A0xe54664871d3780c1!2sCollectif%20Lamuka!5e0!3m2!1sfr!2scg!4v1716422601500!5m2!1sfr!2scg"
                 title="Localisation Collectif Lamuka"
                 className="filter grayscale-[20%] contrast-110 saturate-125"
                ></iframe>
              </div>
              <div className="mt-8 flex justify-center gap-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                 <div className="flex items-center"><div className="w-2.5 h-2.5 bg-pink-600 rounded-full mr-3 shadow-pink-200 shadow-lg"></div> Brazzaville</div>
                 <div className="flex items-center"><div className="w-2.5 h-2.5 bg-purple-600 rounded-full mr-3"></div> Bureau National</div>
              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
