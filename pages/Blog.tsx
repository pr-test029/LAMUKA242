import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Share2, 
  Loader2, 
  BookOpen, 
  Eye, 
  Heart, 
  MessageCircle, 
  Send,
  User,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  fetchAllPosts, 
  BlogPost, 
  incrementViews, 
  toggleLike, 
  fetchComments, 
  addComment 
} from '../services/blogService';
import ReactMarkdown from 'react-markdown';

interface BlogProps {
  initialPost?: BlogPost | null;
  onClearInitialPost?: () => void;
}

export const Blog: React.FC<BlogProps> = ({ initialPost, onClearInitialPost }) => {
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Comments state
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState({ author: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAllPosts();
      setPosts(data);
      setLoading(false);
      
      if (initialPost && !selectedPost) {
        handlePostClick(initialPost);
      }
    };
    loadData();
  }, [initialPost]);

  const handlePostClick = async (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
    
    if (typeof post.id === 'string' && !post.id.startsWith('static_')) {
      await incrementViews(post.id);
      const comms = await fetchComments(post.id);
      setComments(comms);
    }
  };

  const handleBack = () => {
    setSelectedPost(null);
    setComments([]);
    setLiked(false);
    if (onClearInitialPost) onClearInitialPost();
    window.scrollTo(0, 0);
  };

  const handleLike = async () => {
    if (!selectedPost || typeof selectedPost.id !== 'string' || liked) return;
    setLiked(true);
    await toggleLike(selectedPost.id);
    setSelectedPost({ ...selectedPost, likes: (selectedPost.likes || 0) + 1 });
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || typeof selectedPost.id !== 'string' || !newComment.text.trim()) return;
    
    setIsSubmitting(true);
    const author = newComment.author.trim() || "Visiteur";
    await addComment(selectedPost.id, { author, text: newComment.text });
    
    const updatedComments = await fetchComments(selectedPost.id);
    setComments(updatedComments);
    setNewComment({ author: '', text: '' });
    setIsSubmitting(false);
  };

  const categories = ["Tout", ...Array.from(new Set(posts.map(p => p.category)))];
  const filteredPosts = selectedCategory === "Tout" 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  if (loading && posts.length === 0) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 text-pink-600 animate-spin mb-4" />
                <p className="text-slate-500 font-medium tracking-widest text-[10px] uppercase">Chargement des articles...</p>
            </div>
        </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="bg-white min-h-screen animate-fade-in pb-20 font-sans pt-16 md:pt-24">
        <Helmet>
          <title>{`${selectedPost.title} | Blog LAMUKA`}</title>
          <meta name="description" content={selectedPost.excerpt} />
          <meta property="og:title" content={selectedPost.title} />
          <meta property="og:description" content={selectedPost.excerpt} />
          <meta property="og:image" content={selectedPost.image_url} />
        </Helmet>
        {/* Harmonized Single Post View - RESTORED TITLE & BACK BUTTON */}
        <div className="container mx-auto px-6 mb-12">
            <button 
                onClick={handleBack} 
                className="group flex items-center text-slate-500 hover:text-pink-600 transition-colors text-xs font-black uppercase tracking-widest mb-10"
            >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Retour aux articles
            </button>
            <div className="max-w-4xl">
                <span className="inline-block px-4 py-1.5 bg-pink-50 text-pink-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-pink-100">
                    {selectedPost.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-8">
                    {selectedPost.title}
                </h1>
                <div className="flex items-center space-x-8 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-pink-500" /> {selectedPost.date}</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-pink-500" /> {selectedPost.read_time}</span>
                    <span className="flex items-center"><Eye className="w-4 h-4 mr-2 text-blue-500" /> {selectedPost.views || 0} lectures</span>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mb-20">
            <div className="relative h-[50vh] md:h-[70vh] w-full rounded-[3rem] md:rounded-[4.5rem] overflow-hidden shadow-2xl">
                <img src={selectedPost.image_url} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex items-center gap-4 mb-16 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-xl font-black">{selectedPost.author.charAt(0)}</div>
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Rédacteur expert</p>
                    <p className="text-2xl font-black text-slate-900 lowercase first-letter:uppercase">{selectedPost.author}</p>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <button onClick={handleLike} className={`px-6 py-4 rounded-2xl transition-all flex items-center gap-2 border-2 ${liked ? 'bg-red-50 text-red-600 border-red-100 scale-105 shadow-lg shadow-red-100' : 'bg-white text-slate-400 hover:text-red-500 border-slate-100'}`}>
                        <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-black">{selectedPost.likes || 0}</span>
                    </button>
                    <button className="p-4 bg-white text-slate-400 hover:text-blue-500 border border-slate-100 rounded-2xl transition-all shadow-sm"><Share2 className="w-6 h-6" /></button>
                </div>
            </div>

            <article className="prose prose-slate prose-lg lg:prose-xl mx-auto max-w-4xl">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 leading-relaxed mb-16 italic border-l-8 border-pink-500 pl-10 bg-slate-50/50 py-10 rounded-r-[3rem] tracking-tight">
                 {selectedPost.excerpt}
              </div>
              <div className="text-slate-700 leading-relaxed">
                <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
              </div>
            </article>

            {/* Comments Section */}
            <div className="mt-32 pt-20 border-t border-slate-100">
              <h3 className="text-4xl font-black text-slate-900 mb-12 flex items-center tracking-tighter">
                <MessageCircle className="w-10 h-10 text-pink-600 mr-4" />
                Débat Communautaire <span className="ml-3 text-slate-300 font-medium">({comments.length})</span>
              </h3>

              <form onSubmit={handleSubmitComment} className="bg-slate-50 p-12 rounded-[3.5rem] border-2 border-slate-100 mb-20 shadow-sm">
                 <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <input 
                      type="text" 
                      placeholder="Votre identité" 
                      value={newComment.author}
                      onChange={e => setNewComment({...newComment, author: e.target.value})}
                      className="w-full bg-white border-2 border-slate-200 px-8 py-5 rounded-2xl font-bold text-slate-900 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none"
                    />
                 </div>
                 <textarea 
                   placeholder="Partagez votre point de vue avec respect..." 
                   rows={5}
                   value={newComment.text}
                   onChange={e => setNewComment({...newComment, text: e.target.value})}
                   className="w-full bg-white border-2 border-slate-200 p-8 rounded-[2rem] font-medium text-slate-700 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none resize-none mb-8 leading-relaxed"
                 ></textarea>
                 <button disabled={isSubmitting || !newComment.text.trim()} className="bg-slate-900 text-white font-black px-12 py-6 rounded-[1.5rem] flex items-center justify-center gap-4 transition-all hover:bg-slate-800 hover:shadow-2xl shadow-xl active:scale-95 disabled:opacity-50">
                   {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                   <span className="uppercase tracking-widest text-sm">Publier la réaction</span>
                 </button>
              </form>

              <div className="space-y-10">
                {comments.map((c) => (
                  <div key={c.id} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
                     <div className="flex items-center gap-5 mb-6">
                        <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 font-black text-lg uppercase">{c.author.charAt(0)}</div>
                        <div>
                           <h4 className="font-black text-xl text-slate-900 lowercase first-letter:uppercase">{c.author}</h4>
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(c.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                     </div>
                     <p className="text-slate-600 leading-relaxed pl-4 border-l-4 border-slate-50 ml-6 text-lg">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Helmet>
        <title>Blog & Actualités | Collectif LAMUKA</title>
        <meta name="description" content="L'écho de LAMUKA : chroniques, articles et actualités sur l'inclusion, l'entrepreneuriat et les droits des femmes en situation de handicap." />
        <meta name="keywords" content="blog, LAMUKA, actualités, articles, témoignages, inclusion" />
      </Helmet>
      {/* Harmonized Hero - Match About.tsx style */}
      <section className="relative py-24 md:py-32 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[100px] animate-pulse -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8 animate-slide-up">
          <span className="inline-block py-1 px-4 rounded-full bg-pink-500/20 border border-pink-500/50 text-pink-300 text-[10px] font-black tracking-widest uppercase">
            Chroniques de Résilience
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tighter">
            L'Écho de <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 uppercase">LAMUKA</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
             Témoignages, rapports d'activités et actualités pour l'inclusion des femmes en situation de handicap au Congo.
          </p>
        </div>
      </section>

      {/* Filter Tabs - Harmonized (Rounded & White) */}
      <div className="sticky top-16 z-40 py-8 -mt-10">
        <div className="container mx-auto px-4 flex justify-center">
           <div className="bg-white/95 backdrop-blur-xl border border-slate-100 shadow-xl rounded-[2.5rem] p-3 flex flex-wrap justify-center gap-2">
                 {categories.map((cat) => (
                   <button 
                    key={cat} 
                    onClick={() => setSelectedCategory(cat)} 
                    className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-950'}`}
                   >
                     {cat}
                   </button>
                 ))}
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              onClick={() => handlePostClick(post)} 
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:border-pink-100 transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 z-10">
                    <span className="bg-white/95 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest text-pink-600 shadow-sm">{post.category}</span>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6 gap-4">
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-2 text-pink-500" /> {post.date}</span>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-2 text-pink-500" /> {post.read_time}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-pink-600 transition-colors leading-tight">{post.title}</h2>
                <p className="text-slate-500 mb-8 line-clamp-3 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                
                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                   <div className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-tighter">
                      <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white mr-3 font-black text-xs shadow-lg">{post.author.charAt(0)}</div>
                      <span className="lowercase first-letter:uppercase">{post.author}</span>
                   </div>
                   <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all">
                      <ArrowRight className="w-5 h-5" />
                   </div>
                </div>
              </div>
            </article>
          ))}
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
