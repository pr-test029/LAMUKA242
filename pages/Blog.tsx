
import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, ArrowLeft, Clock, Share2, Loader2, BookOpen } from 'lucide-react';
import { fetchAllPosts, BlogPost } from '../services/blogService';

interface BlogProps {
  initialPost?: BlogPost | null;
  onClearInitialPost?: () => void;
}

export const Blog: React.FC<BlogProps> = ({ initialPost, onClearInitialPost }) => {
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchAllPosts();
      setPosts(data);
      setLoading(false);
      
      // Si on arrive avec un article pré-sélectionné (depuis la Home)
      if (initialPost) {
        setSelectedPost(initialPost);
      }
    };
    loadData();
  }, [initialPost]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedPost(null);
    if (onClearInitialPost) onClearInitialPost();
    window.scrollTo(0, 0);
  };

  const categories = ["Tout", ...Array.from(new Set(posts.map(p => p.category)))];
  const filteredPosts = selectedCategory === "Tout" 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 text-pink-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Chargement des archives...</p>
            </div>
        </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen animate-fade-in pb-20">
        <style>{`
          .prose h3 { font-size: 1.875rem; color: #1e293b; font-weight: 800; margin-top: 2rem; }
          .prose h4 { font-size: 1.5rem; color: #db2777; font-weight: 700; margin-top: 1.5rem; }
          .prose p { margin-bottom: 1.25rem; line-height: 1.8; color: #475569; }
        `}</style>
        
        <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
            <img src={selectedPost.image_url} alt={selectedPost.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
            <div className="absolute top-6 left-6 z-20">
               <button onClick={handleBack} className="flex items-center text-white bg-slate-900/40 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 text-sm font-bold">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Retour
                </button>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 text-white container mx-auto z-20">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-pink-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">{selectedPost.category}</span>
                  <span className="flex items-center text-xs font-bold bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    <Clock className="w-3.5 h-3.5 mr-2"/> {selectedPost.read_time}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] max-w-4xl mb-6">{selectedPost.title}</h1>
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="prose prose-slate lg:prose-xl mx-auto">
              <p className="text-xl md:text-2xl font-medium text-slate-500 mb-12 italic border-l-8 border-pink-500 pl-8">
                 {selectedPost.excerpt}
              </p>
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
           <div className="bg-pink-500/10 border border-pink-500/30 p-3 rounded-2xl mb-8"><BookOpen className="w-8 h-8 text-pink-400" /></div>
           <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">L'Écho de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">nos Combats</span></h1>
           <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">Retrouvez ici tous les rapports d'activités et actualités du Collectif LAMUKA.</p>
        </div>
      </section>

      <div className="sticky top-16 z-40 py-8 -mt-10">
        <div className="container mx-auto px-4 flex justify-center overflow-x-auto scrollbar-hide">
           <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-3 flex space-x-2">
                 {categories.map((cat) => (
                   <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-8 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30' : 'text-slate-500 hover:bg-slate-50'}`}>{cat}</button>
                 ))}
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post) => (
            <article key={post.id} onClick={() => handlePostClick(post)} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2">
              <div className="relative h-72 overflow-hidden">
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 z-10"><span className="bg-white/95 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm">{post.category}</span></div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6"><Calendar className="w-3.5 h-3.5 mr-2 text-pink-500" /><span>{post.date}</span></div>
                <h2 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-pink-600 transition-colors">{post.title}</h2>
                <p className="text-slate-500 mb-8 line-clamp-3 text-sm flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                   <div className="flex items-center text-sm font-bold text-slate-900"><div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white mr-3 font-black text-xs">{post.author.charAt(0)}</div><span>{post.author}</span></div>
                   <div className="flex items-center font-black text-[10px] uppercase tracking-widest text-pink-600 group-hover:translate-x-2 transition-transform">Lire <ArrowRight className="ml-2 w-4 h-4" /></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
