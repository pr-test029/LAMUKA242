
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Shield, HeartHandshake, Users, ChevronRight, ChevronLeft, Calendar, Clock, Target, CheckCircle2, Quote, Star, Award, Scale, HeartPulse, Sparkles } from 'lucide-react';
import { fetchAllPosts, BlogPost } from '../services/blogService';

interface HomeProps {
  onNavigate: (page: string) => void;
  onOpenPost: (post: BlogPost) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenPost }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const loadPosts = async () => {
      const posts = await fetchAllPosts();
      setFeaturedPosts(posts.slice(0, 3)); // On prend les 3 derniers
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (featuredPosts.length === 0 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredPosts, isPaused]);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <Helmet>
        <title>Accueil | Collectif LAMUKA - Solidarité, Justice, Développement</title>
        <meta name="description" content="Collectif LAMUKA milite pour l'autonomisation et l'inclusion des femmes en situation de handicap au Congo. Découvrez nos actions pour la solidarité, la justice et le développement." />
        <meta name="keywords" content="LAMUKA, femmes, handicap, Congo, Brazzaville, VBG, solidarité, association" />
        <meta property="og:title" content="Accueil | Collectif LAMUKA" />
        <meta property="og:description" content="Découvrez les actions de l'association LAMUKA pour les femmes en situation de handicap au Congo." />
      </Helmet>
      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .progress-bar-active { animation: progress 5s linear forwards; }
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right { animation: fade-in-right 0.5s ease-out forwards; }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll { 
           animation: scroll 30s linear infinite; 
           width: max-content;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-3xl z-0 animate-pulse"></div>
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-100 text-pink-800 font-bold text-sm tracking-wide border border-pink-200">
              <span className="w-2 h-2 rounded-full bg-pink-600 mr-2 animate-pulse"></span>
              Collectif LAMUKA
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1]">
              Solidarité <br/>
              Justice <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Développement</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-lg border-l-4 border-pink-500 pl-6">
              Promouvoir l’autonomisation de la jeune fille et femme en situation d’handicap au Congo.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button onClick={() => onNavigate('contact')} className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl hover:bg-slate-800 transition-all flex items-center">
                J'ai besoin d'aide <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* New Featured Slider Section */}
          <div className="relative h-[500px] w-full group" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {featuredPosts.length > 0 ? (
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
                {featuredPosts.map((post, idx) => (
                  <div 
                    key={post.id} 
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
                  >
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white w-full">
                       <span className="inline-block px-3 py-1 bg-pink-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">À la une</span>
                       <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight line-clamp-2">{post.title}</h3>
                       <div className="flex items-center space-x-4 text-sm text-slate-300 mb-6">
                          <span className="flex items-center"><Calendar size={14} className="mr-1.5 text-pink-400" /> {post.date}</span>
                          <span className="flex items-center"><Clock size={14} className="mr-1.5 text-pink-400" /> {post.read_time}</span>
                       </div>
                       <button 
                        onClick={() => onOpenPost(post)}
                        className="flex items-center px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-pink-600 hover:text-white transition-all transform active:scale-95 shadow-lg"
                       >
                         Lire l'article <ArrowRight className="ml-2 w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))}

                {/* Slider Controls */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                      <ChevronLeft size={24} />
                   </button>
                   <button onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                      <ChevronRight size={24} />
                   </button>
                </div>

                {/* Progress Indicators */}
                <div className="absolute bottom-0 left-0 w-full flex h-1.5 space-x-1 px-8 mb-4 z-20">
                   {featuredPosts.map((_, idx) => (
                     <div key={idx} className="flex-1 bg-white/20 rounded-full overflow-hidden">
                        <div className={`h-full bg-pink-500 transition-all duration-300 ${idx === currentSlide ? 'progress-bar-active' : (idx < currentSlide ? 'w-full' : 'w-0')}`}></div>
                     </div>
                   ))}
                </div>
              </div>
            ) : (
              <div className="h-full w-full bg-slate-200 animate-pulse rounded-[2.5rem]"></div>
            )}
          </div>
        </div>
      </section>

      {/* Rest of the sections (Stats, Services, CTA) */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Nos Piliers d'Action</h2>
            <p className="text-slate-400 text-lg">Trois axes fondamentaux qui guident nos initiatives pour l'autonomisation et la dignité des femmes.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Scale, num: "Justice", label: "Lutte contre les VBG", desc: "Défense des droits et accompagnement psycho-juridique.", color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/20" }, 
              { icon: HeartPulse, num: "Santé", label: "Droits Sexuels", desc: "Sensibilisation et accès aux soins de santé adaptés.", color: "from-pink-500 to-rose-400", shadow: "shadow-pink-500/20" }, 
              { icon: Sparkles, num: "Avenir", label: "Entrepreneuriat", desc: "Formation et soutien à l'indépendance financière.", color: "from-yellow-500 to-orange-400", shadow: "shadow-yellow-500/20" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm p-10 rounded-[2.5rem] group border border-slate-700/50 hover:border-slate-600 transition-all duration-500 hover:-translate-y-2 hover:bg-slate-800">
                <div className={`w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-500 shadow-xl ${stat.shadow}`}>
                   <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-3 tracking-tight">
                  {stat.num}
                </div>
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${stat.color} font-black tracking-widest text-sm uppercase mb-4`}>
                  {stat.label}
                </div>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Nos Domaines d'Activités</h2>
              <div className="h-1.5 w-20 bg-pink-600 rounded-full"></div>
            </div>
            <button onClick={() => onNavigate('services')} className="hidden md:flex items-center text-pink-600 font-bold hover:text-pink-800 transition-colors">
              En savoir plus <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: "Lutte VBG", 
                desc: "Lutte contre les violences basées sur le genre. Nous offrons un accompagnement psychologique, juridique et social aux victimes. Notre objectif est de briser le silence, de prévenir ces violences par la sensibilisation et d'assurer un environnement sûr pour chaque femme.", 
                color: "bg-blue-50 text-blue-600",
                image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop"
              },
              { 
                icon: HeartHandshake, 
                title: "Santé", 
                desc: "Droit en santé sexuelle et de la reproduction. Nous militons pour un accès équitable aux soins. Cela inclut l'éducation sexuelle, la prévention des maladies, et l'accompagnement des femmes vers des services de santé inclusifs et respectueux.", 
                color: "bg-pink-50 text-pink-600",
                image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
              },
              { 
                icon: Users, 
                title: "Entrepreneuriat", 
                desc: "Formation pour l'autonomisation financière. Nous soutenons la création d'activités génératrices de revenus à travers des ateliers pratiques, des formations en gestion et des micro-financements pour l'indépendance économique.", 
                color: "bg-yellow-50 text-yellow-600",
                image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden">
                <div className="h-56 w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute -bottom-6 right-8 z-20 w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center shadow-xl border-4 border-white transform group-hover:rotate-12 transition-transform duration-300`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                </div>
                <div className="p-8 pt-10 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-8 flex-1">{item.desc}</p>
                  <div className="flex items-center text-pink-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all mt-auto">
                    Découvrir nos actions <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-200 rounded-[3rem] transform translate-x-4 translate-y-4"></div>
            <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop" alt="Equipe LAMUKA" className="relative z-10 w-full h-[500px] object-cover rounded-[3rem] shadow-2xl" />
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4">
               <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                  <Target className="w-8 h-8" />
               </div>
               <div>
                  <div className="text-3xl font-black text-slate-900">+500</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Femmes accompagnées</div>
               </div>
            </div>
          </div>
          <div className="space-y-8 pl-0 lg:pl-10">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-xs font-black uppercase tracking-widest">Qui Sommes-Nous ?</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Agir ensemble pour l'inclusion et la dignité.</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Le Collectif LAMUKA est né d'une volonté farouche de donner une voix et des opportunités aux jeunes filles et femmes en situation de handicap au Congo. Nous luttons au quotidien contre les discriminations et les violences basées sur le genre.
            </p>
            <ul className="space-y-4 text-slate-700 font-medium">
               <li className="flex items-center"><CheckCircle2 className="w-6 h-6 text-pink-500 mr-3" /> Soutien psychologique et juridique</li>
               <li className="flex items-center"><CheckCircle2 className="w-6 h-6 text-pink-500 mr-3" /> Formation professionnelle continue</li>
               <li className="flex items-center"><CheckCircle2 className="w-6 h-6 text-pink-500 mr-3" /> Sensibilisation aux droits reproductifs</li>
            </ul>
            <button onClick={() => onNavigate('about')} className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-full font-bold shadow-sm hover:border-pink-500 hover:text-pink-600 transition-all flex items-center mt-4">
              Découvrir notre histoire <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-xs font-black uppercase tracking-widest mb-4">Impact Social</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Elles ont repris le contrôle</h2>
              <p className="text-slate-500 text-lg">Découvrez les témoignages de femmes inspirantes que le Collectif a accompagnées dans leur parcours d'autonomisation.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Marie K.", role: "Entrepreneure", quote: "Grâce à LAMUKA, j'ai pu lancer mon petit commerce. Leur soutien m'a redonné confiance en mes capacités malgré mon handicap." },
                { name: "Sarah L.", role: "Bénévole", quote: "Les ateliers sur les droits sexuels m'ont permis de mieux comprendre mon corps et de me protéger. C'est un espace bienveillant." },
                { name: "Evelyne M.", role: "Etudiante", quote: "L'accompagnement juridique m'a été indispensable. LAMUKA n'est pas juste une association, c'est une famille qui se bat pour vous." }
              ].map((testi, idx) => (
                <div key={idx} className="bg-slate-50 p-10 rounded-[2.5rem] relative">
                   <Quote className="absolute top-8 right-8 w-12 h-12 text-pink-200/50" />
                   <div className="flex text-yellow-400 mb-6">
                      {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                   </div>
                   <p className="text-slate-700 leading-relaxed text-lg italic mb-8 font-medium">"{testi.quote}"</p>
                   <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-lg">{testi.name.charAt(0)}</div>
                      <div>
                         <h4 className="font-black text-slate-900">{testi.name}</h4>
                         <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">{testi.role}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-slate-900 border-t border-slate-800 overflow-hidden">
         <div className="container mx-auto px-4 text-center mb-10">
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Ils soutiennent nos actions</p>
         </div>
         <div className="relative w-full flex overflow-hidden group">
            <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
               <div className="flex shrink-0 items-center space-x-12 md:space-x-24 px-6 md:px-12 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://i.ibb.co/JRFftbwp/UNFPA-logo-svg.png" alt="UNFPA" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain bg-white p-2 rounded-xl" />
                  <img src="https://i.ibb.co/jkhYJP6n/unesco-logo-03-freelogovectors-net.png" alt="UNESCO" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain bg-white p-2 rounded-xl" />
                  <img src="https://i.ibb.co/tPktx9Dq/2019-logo-iecd-baseline-hd.png" alt="IECD" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain rounded-xl bg-white p-2" />
                  <img src="https://i.ibb.co/r2NVjV1L/UNDO-Co-GEN-Logo-PNUD-No-Slogan-largo-04.png" alt="UNDP" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain bg-white p-2 rounded-xl" />
                  <img src="https://i.ibb.co/7tpkBrVJ/armoiries-congo.jpg" alt="République du Congo" className="h-12 md:h-16 shrink-0 min-w-[80px] object-contain rounded-xl" />
                  <img src="https://i.ibb.co/W4fYcT3L/Logo-of-UNICEF-svg.png" alt="UNICEF" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain bg-white p-2 rounded-xl" />
                  <img src="https://i.ibb.co/fVPB8pnM/Flag-of-Europe-svg.png" alt="Union Européenne" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain rounded-xl" />
               </div>
               <div className="flex shrink-0 items-center space-x-12 md:space-x-24 px-6 md:px-12 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-700">
                  <img src="https://i.ibb.co/JRFftbwp/UNFPA-logo-svg.png" alt="UNFPA" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain bg-white p-2 rounded-xl" />
                  <img src="https://i.ibb.co/jkhYJP6n/unesco-logo-03-freelogovectors-net.png" alt="UNESCO" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain bg-white p-2 rounded-xl" />
                  <img src="https://i.ibb.co/tPktx9Dq/2019-logo-iecd-baseline-hd.png" alt="IECD" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain rounded-xl bg-white p-2" />
                  <img src="https://i.ibb.co/r2NVjV1L/UNDO-Co-GEN-Logo-PNUD-No-Slogan-largo-04.png" alt="UNDP" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain bg-white p-2 rounded-xl" />
                  <img src="https://i.ibb.co/7tpkBrVJ/armoiries-congo.jpg" alt="République du Congo" className="h-12 md:h-16 shrink-0 min-w-[80px] object-contain rounded-xl" />
                  <img src="https://i.ibb.co/W4fYcT3L/Logo-of-UNICEF-svg.png" alt="UNICEF" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain bg-white p-2 rounded-xl" />
                  <img src="https://i.ibb.co/fVPB8pnM/Flag-of-Europe-svg.png" alt="Union Européenne" className="h-10 md:h-14 shrink-0 min-w-[80px] object-contain rounded-xl" />
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-800"></div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
         
         <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Prêt(e) à faire la différence ?</h2>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto mb-12 leading-relaxed">
               Que ce soit par un don, du bénévolat ou un partenariat, chaque geste compte pour bâtir une société plus juste et inclusive.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <button onClick={() => onNavigate('contact')} className="px-10 py-5 bg-white text-pink-600 rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform">
                  S'engager avec nous
               </button>
               <button onClick={() => onNavigate('contact')} className="px-10 py-5 bg-pink-700/50 text-white border border-pink-400/50 rounded-full font-black uppercase tracking-widest hover:bg-pink-700 transition-colors backdrop-blur-md">
                  Faire un don
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};
