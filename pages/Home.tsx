
import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, HeartHandshake, Users, ChevronRight, ChevronLeft, Calendar, Clock } from 'lucide-react';
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
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {[{ num: "Justice", label: "Lutte contre les VBG" }, { num: "Santé", label: "Droits Sexuels" }, { num: "Avenir", label: "Entrepreneuriat" }].map((stat, idx) => (
              <div key={idx} className="p-4 group cursor-default">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2 group-hover:scale-110 transition-transform">
                  {stat.num}
                </div>
                <div className="text-slate-400 font-medium tracking-widest text-sm uppercase">{stat.label}</div>
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
              { icon: Shield, title: "Lutte VBG", desc: "Lutte contre les violences basées sur le genre.", color: "bg-blue-50 text-blue-600" },
              { icon: HeartHandshake, title: "Santé", desc: "Droit en santé sexuelle et de la reproduction.", color: "bg-pink-50 text-pink-600" },
              { icon: Users, title: "Entrepreneuriat", desc: "Formation pour l'autonomisation financière.", color: "bg-yellow-50 text-yellow-600" }
            ].map((item, idx) => (
              <div key={idx} className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">{item.desc}</p>
                <div className="flex items-center text-slate-900 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all">
                  Détails <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
