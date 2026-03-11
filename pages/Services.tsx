import React from 'react';
import { Shield, HeartHandshake, Mic2, Users, ArrowRight, CheckCircle2, Briefcase } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen overflow-hidden">
      {/* Animations Styles */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[100px] animate-float -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-float delay-100 translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-300 text-xs font-bold tracking-widest uppercase mb-6 animate-slide-up">
            Nos Domaines d'Activités
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight animate-slide-up delay-100">
            Agir pour <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">l'Égalité</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
            Nous intervenons sur trois axes majeurs pour garantir l'autonomisation et la protection des femmes handicapées.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Service 1: Formation Entrepreneuriale */}
          <div className="group bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-yellow-200 transition-all duration-500 animate-slide-up delay-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-yellow-600 transition-colors duration-500">
                <Briefcase className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Formation Entrepreneuriale</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                L'autonomisation financière est la clé de la liberté. Nous formons les femmes à créer et gérer leurs activités.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> Création de micro-entreprises
                </li>
                <li className="flex items-center text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> Gestion financière
                </li>
              </ul>
            </div>
          </div>

          {/* Service 2: VBG */}
          <div className="group bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 animate-slide-up delay-200 overflow-hidden relative mt-0 md:mt-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-500">
                <Shield className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lutte contre les VBG</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Nous combattons activement toutes les formes de violences basées sur le genre à l'encontre des femmes handicapées.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> Prévention et sensibilisation
                </li>
                <li className="flex items-center text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> Accompagnement des victimes
                </li>
              </ul>
            </div>
          </div>

          {/* Service 3: Santé */}
          <div className="group bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-pink-200 transition-all duration-500 animate-slide-up delay-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-pink-600 transition-colors duration-500">
                <HeartHandshake className="w-8 h-8 text-pink-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Santé Sexuelle & Reproduction</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Défense du droit à la santé sexuelle et reproductive pour toutes, sans discrimination.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> Accès à l'information
                </li>
                <li className="flex items-center text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> Droits reproductifs
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};