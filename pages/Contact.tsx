
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Navigation, Loader2, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isLocating, setIsLocating] = useState(false);
  const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61566101510604";
  const DESTINATION_COORDS = "-4.2687132,15.2393222"; // Coordonnées exactes du siège

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
          // Fallback si la géolocalisation est refusée
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
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-900 mb-12">Contactez-nous</h1>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          {/* Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-pink-600 pl-4">Nos Coordonnées</h2>
            <p className="text-gray-600">
              Notre équipe vous accueille au siège pour toute demande d'assistance ou de renseignement.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="bg-pink-100 p-3 rounded-2xl text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Adresse Physique</h4>
                  <p className="text-gray-600">20, rue KIPOUANDZA, Mfilou-NGAMABA</p>
                  <p className="text-gray-600 font-medium text-pink-700 italic">Terminus Avenue Mayama</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-2xl text-pink-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Urgences & WhatsApp</h4>
                  <p className="text-gray-600">06 920 60 58 / 06 852 65 55</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-2xl text-pink-600">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Emails Officiels</h4>
                  <p className="text-gray-600">collectiflamuka2025@gmail.com</p>
                  <p className="text-gray-600">louzologustavine@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-bold text-gray-900 mb-4">Suivez notre impact</h4>
              <div className="flex space-x-4">
                <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-slate-900 px-6 py-3 rounded-xl text-white hover:bg-pink-600 transition-all shadow-lg group">
                  <Facebook className="w-5 h-5 fill-current" />
                  <span className="font-bold">Rejoindre sur Facebook</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-slate-50 p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Un message ?</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Nom</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Téléphone</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" placeholder="06 xxx xx xx" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Votre Message</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-pink-600 transition-all shadow-xl active:scale-95">
                Envoyer le message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-5xl mx-auto relative group">
          <div className="absolute -top-12 left-0 right-0 flex justify-center z-10">
             <button 
              onClick={handleGetDirections}
              disabled={isLocating}
              className="flex items-center space-x-3 bg-pink-600 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-pink-700 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-75"
             >
                {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5 animate-pulse" />}
                <span>Tracer mon itinéraire (GPS)</span>
             </button>
          </div>
          
          <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
             <div className="h-[450px] w-full rounded-[1.5rem] overflow-hidden">
               <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.966952766348!2d15.23713357583648!3d-4.268713195705359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3b003a891001%3A0xe54664871d3780c1!2sCollectif%20Lamuka!5e0!3m2!1sfr!2scg!4v1716422601500!5m2!1sfr!2scg"
                title="Localisation Collectif Lamuka"
                className="filter contrast-125 saturate-100"
               ></iframe>
             </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest">
             <div className="flex items-center"><div className="w-3 h-3 bg-pink-600 rounded-full mr-2"></div> Siège Central</div>
             <div className="flex items-center"><div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div> Mfilou-Ngamaba</div>
          </div>
        </div>

      </div>
    </div>
  );
};
