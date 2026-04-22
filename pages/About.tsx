// Add missing React import
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Target, Heart, Sparkles, Shield } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen overflow-hidden">
      <Helmet>
        <title>À Propos | Collectif LAMUKA</title>
        <meta name="description" content="Découvrez l'histoire, la vision et les objectifs du Collectif LAMUKA. Promouvoir l'inclusion sociale de la femme vivant avec handicap." />
        <meta name="keywords" content="A propos, association LAMUKA, histoire, vision, objectifs, inclusion" />
      </Helmet>
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
      `}</style>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[100px] animate-float -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-float delay-100 translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-300 text-xs font-bold tracking-widest uppercase mb-6 animate-slide-up">
            Fondations Officielles
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight animate-slide-up delay-100">
            Solidarité <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Justice</span> Développement
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
            Une organisation de la société civile dédiée à la promotion et à la défense des droits des femmes vivant avec handicap en République du Congo.
          </p>
        </div>
      </section>

      {/* Préambule & Vision */}
      <section className="py-20 container mx-auto px-4 -mt-20 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-12 animate-slide-up delay-100">
          <div className="w-full md:w-1/2">
             <div className="relative">
               <img 
                 src="https://images2.imgbox.com/0f/ef/WaPp5wTw_o.jpg" 
                 alt="Collectif Lamuka - Statuts" 
                 className="rounded-3xl shadow-lg w-full h-[500px] object-cover"
               />
               <div className="absolute -bottom-6 -right-6 bg-pink-600 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                  <p className="text-sm font-black uppercase tracking-widest text-center">Inclusion<br/>Réelle</p>
               </div>
             </div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl font-black text-slate-900 border-l-4 border-pink-600 pl-4">Notre Raison d'Être</h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                Né de l'initiative de femmes leaders vivant avec handicap, le Collectif LAMUKA répond à un constat alarmant : malgré les engagements internationaux, les droits des femmes handicapées au Congo sont souvent bafoués.
              </p>
              <p>
                <b>Vulnérabilité, mendicité et exclusion sociale</b> sont les défis quotidiens que nous combattons. Notre emblème — une femme handicapée au pilon — symbolise notre <b>résilience</b> et notre détermination à rester actrices du changement.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl flex items-start gap-4 italic border border-slate-100 shadow-inner">
               <Sparkles className="text-pink-600 w-8 h-8 flex-shrink-0" />
               <p className="text-slate-700">
                 "Parce que la différence n'est pas une faiblesse, mais une richesse que la société doit apprendre à valoriser."
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Objectifs Statutaires (Art. 4) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Objectifs Statutaires</h2>
            <p className="text-slate-500">Extraits de l'Article 4 de nos statuts officiels</p>
            <div className="h-1.5 w-20 bg-pink-600 rounded-full mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-pink-200 transition-all group">
              <Target className="w-12 h-12 text-pink-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Inclusion Sociale</h3>
              <p className="text-slate-600 leading-relaxed">Promouvoir l’inclusion sociale et économique de la femme vivant avec handicap à travers l'entrepreneuriat et l'éducation.</p>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-pink-200 transition-all group">
              <Shield className="w-12 h-12 text-pink-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Lutte VBG</h3>
              <p className="text-slate-600 leading-relaxed">Mener un plaidoyer actif et constant pour la lutte contre les violences basées sur le genre à l’encontre des femmes vulnérables.</p>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-pink-200 transition-all group">
              <Heart className="w-12 h-12 text-pink-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Santé SS/SR</h3>
              <p className="text-slate-600 leading-relaxed">Sensibiliser sur la santé sexuelle et reproductive pour garantir les droits fondamentaux de chaque femme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gouvernance */}
      <section className="py-24 container mx-auto px-4">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div>
              <h2 className="text-4xl font-black mb-8">Structure Organisée</h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                Le Collectif LAMUKA fonctionne selon des règles de gestion rigoureuses basées sur ses statuts du 4 mai 2024. Le Bureau Exécutif National (BEN) assure l'exécution des décisions pour un mandat de 4 ans.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                    <p className="text-2xl font-black text-pink-500">AG</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">Assemblée Générale</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                    <p className="text-2xl font-black text-pink-500">CN</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">Conseil National</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                    <p className="text-2xl font-black text-pink-500">BEN</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">Bureau Exécutif</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                    <p className="text-2xl font-black text-pink-500">CSE</p>
                    <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">Suivi & Éval.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
