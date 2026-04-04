
import React, { useState, useEffect } from 'react';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  genAI 
} from '../services/firebase';
import { 
  fetchAllPosts, 
  createPost, 
  updatePost,
  deletePost, 
  fetchSiteStats,
  BlogPost 
} from '../services/blogService';
import { cleanupDuplicates } from '../services/cleanupService';
import { 
  LayoutDashboard, 
  Plus, 
  LogOut, 
  Save, 
  Trash2, 
  Edit, 
  Sparkles, 
  Image as ImageIcon,
  Loader2,
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  Link as LinkIcon,
  RotateCcw,
  Wand2,
  BarChart3,
  Eye,
  Heart,
  TrendingUp,
  User as UserIcon,
  Layers,
  ChevronRight,
  Globe,
  Settings
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const ADMIN_EMAIL = "collectiflamuka2025@gmail.com";

export const Admin: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'list' | 'create'>('stats');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Editor State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Actualité',
    author: 'Paul NDAMBA',
    read_time: '5 min',
    image_url: ''
  });
  
  // AI State
  const [inputMethod, setInputMethod] = useState<'text' | 'pdf' | 'link'>('text');
  const [rawInput, setRawInput] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setUser(currentUser);
        initAdmin();
      } else if (currentUser) {
        signOut(auth);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const initAdmin = async (force: boolean = false) => {
    setLoading(true);
    try {
      if (force) {
        // Automatically cleanup any duplicate titles in Firestore
        await cleanupDuplicates();
      }
      const p = await fetchAllPosts(force);
      const s = await fetchSiteStats();
      setPosts(p);
      setStats(s);
    } catch (e) {
      console.error("Error refreshing admin data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAISuggest = async () => {
    setIsGenerating(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      let prompt = `Assistant éditorial expert pour LAMUKA. Ton style : INSTITUTIONNEL, PROFESSIONNEL. Réponds en JSON.`;
      
      const parts: any[] = [];
      if (inputMethod === 'text') prompt += `\nTexte: ${rawInput}`;
      else if (inputMethod === 'pdf' && pdfFile) {
        const reader = new FileReader();
        const base64Promise = new Promise(r => { reader.onloadend = () => r((reader.result as string).split(',')[1]); reader.readAsDataURL(pdfFile); });
        parts.push({ inlineData: { data: await base64Promise, mimeType: pdfFile.type } });
        prompt += `\nAnalyse ce PDF.`;
      } else if (inputMethod === 'link') {
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(urlInput)}`);
        const json = await res.json();
        prompt += `\nContenu extrait: ${json.contents.substring(0, 4000)}`;
      }

      prompt += `\nStructure JSON: { "title", "excerpt", "content", "category", "read_time" }`;
      prompt += `\nDans la clé "content", utilise du vrai Markdown (**gras**, ## titres, * italique) pour bien structurer ton texte. IMPORTANT : ne renvoie PAS de balises HTML !`;
      const result = await model.generateContent([prompt, ...parts]);
      const data = JSON.parse(result.response.text().match(/\{[\s\S]*\}/)?.[0] || '{}');
      
      setFormData({ ...formData, ...data });
    } catch (e: any) { alert("Erreur IA: " + e.message); } finally { setIsGenerating(false); }
  };

  const handleSave = async () => {
    setIsGenerating(true);
    try {
      if (editingId) await updatePost(editingId, formData);
      else await createPost(formData);
      alert("Enregistré avec succès !");
      resetForm();
      setActiveTab('list');
      await initAdmin(true);
    } catch (e) { alert("Erreur lors de l'enregistrement."); } finally { setIsGenerating(false); }
  };

  const handleDelete = async (postId: string) => {
    if(!window.confirm("Action irréversible. Supprimer définitivement cet article du site et de la base de données ?")) return;
    
    setIsGenerating(true);
    try {
      await deletePost(postId);
      console.log("Deletion complete, refreshing...");
      await initAdmin(true); // Force refresh to update the list and stats
      alert("L'article a été supprimé définitivement.");
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Erreur lors de la suppression.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id as string);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      read_time: post.read_time,
      image_url: post.image_url
    });
    setActiveTab('create');
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', excerpt: '', content: '', category: 'Actualité', author: 'Paul NDAMBA', read_time: '5 min', image_url: '' });
  };

  const handleGoogleLogin = () => signInWithPopup(auth, googleProvider);

  if (loading && !user) return <div className="min-h-screen bg-white flex items-center justify-center"><Loader2 className="w-10 h-10 text-pink-600 animate-spin" /></div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <LayoutDashboard className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Portail Admin</h1>
          <p className="text-slate-500 mb-10 font-medium">Connectez-vous pour piloter le contenu de LAMUKA Congo.</p>
          <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center space-x-4 bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-2xl hover:border-pink-500 transition-all hover:bg-pink-50">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="" />
            <span>S'identifier avec Google</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* BACKGROUND HEADER BAR (AS REQUESTED: NO MORE WHITE GRADIENT) */}
      <div className="bg-gradient-to-r from-pink-700 via-pink-600 to-purple-800 h-[180px] w-full absolute top-0 left-0 z-0">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Transition gradient removed for clarity */}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10 text-white">Gestionnaire LAMUKA</span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter truncate flex flex-wrap gap-x-3 items-baseline">
                   <span className="text-black">Salut</span>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 animate-gradient-x">LAMUKA !</span>
                </h1>
                <p className="text-black mt-2 font-bold opacity-90 uppercase tracking-widest text-[10px]">Espace de pilotage stratégique des contenus.</p>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/40 backdrop-blur-3xl p-2 rounded-[2rem] border border-white/10 shadow-2xl">
              {[
                { id: 'stats', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'list', label: 'Bibliothèque', icon: FileText },
                { id: 'create', label: 'Éditeur', icon: Plus },
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id as any); if(tab.id !== 'create') resetForm(); }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
              <div className="w-px h-6 bg-white/10 mx-2"></div>
              <button onClick={() => signOut(auth)} className="p-3 text-white/40 hover:text-red-400 transition-colors"><LogOut className="w-5 h-5" /></button>
            </div>
        </div>

        {activeTab === 'stats' && stats && (
          <div className="space-y-10 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Impact / Vues', val: stats.totalViews, icon: Eye, color: 'text-pink-600' },
                { label: 'Rapports Publiés', val: stats.totalArticles, icon: Layers, color: 'text-purple-600' },
                { label: 'Adhésion / Likes', val: stats.totalLikes, icon: Heart, color: 'text-red-500' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100/50 group hover:border-pink-200 transition-all hover:-translate-y-2">
                  <div className={`w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 ${s.color} border border-slate-100`}>
                    <s.icon className="w-7 h-7" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{s.val}</h3>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[3rem] p-12 shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-12">
                   <h3 className="text-2xl font-black flex items-center tracking-tight"><TrendingUp className="mr-4 text-pink-600 w-6 h-6" /> Flux Global des Lectures</h3>
                   <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><div className="w-4 h-4 rounded-full bg-pink-500"></div><span>Vues cumulées</span></div>
                </div>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={stats.topPosts}>
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#db2777" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="title" hide />
                        <YAxis hide />
                        <Tooltip contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 40px -10px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="views" stroke="#db2777" strokeWidth={5} fillOpacity={1} fill="url(#chartGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
               <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div>
                   <h3 className="text-2xl font-black tracking-tight mb-1 text-slate-900">Archives des Publications</h3>
                   <p className="text-slate-400 text-sm font-medium">Gérez vos articles institutionnels et suivis d'activités.</p>
                 </div>
                 <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-pink-600 transition-colors" />
                    <input type="text" placeholder="Rechercher..." className="bg-slate-50 border-2 border-slate-100 pl-12 pr-6 py-4 rounded-2xl text-sm font-bold focus:border-pink-500 focus:bg-white outline-none w-full md:w-64 transition-all" />
                 </div>
               </div>
               <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-left">Article & Identité</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-left">Rédacteur</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Engagement</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {posts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-all group">
                        <td className="px-10 py-8">
                          <div className="flex items-center space-x-6">
                             <img src={p.image_url} className="w-16 h-16 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" alt="" />
                             <div>
                               <p className="font-black text-slate-900 group-hover:text-pink-600 text-lg transition-colors leading-tight">{p.title}</p>
                               <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{p.category} • {p.date}</span>
                             </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex items-center space-x-3">
                             <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center font-black text-xs">{p.author.charAt(0)}</div>
                             <span className="text-sm font-bold text-slate-600 lowercase first-letter:uppercase">{p.author}</span>
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex justify-center space-x-6 text-xs font-black">
                              <span className="text-blue-500 flex items-center"><Eye className="w-3.5 h-3.5 mr-1" /> {p.views || 0}</span>
                              <span className="text-red-500 flex items-center"><Heart className="w-3.5 h-3.5 mr-1" /> {p.likes || 0}</span>
                           </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                           <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-all">
                              <button onClick={() => handleEdit(p)} className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-pink-600 rounded-xl transition-all shadow-sm"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(p.id as string)} className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
               </div>
            </div>
          </div>
        )}

        {(activeTab === 'create' || editingId) && (
          <div className="animate-fade-in-up space-y-10">
            <div className="grid lg:grid-cols-5 gap-10 items-start">
               {/* Left Assistant */}
               <div className="lg:col-span-2 space-y-8">
                  <div className="bg-slate-900 text-white rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[80px] -mt-32 -mr-32"></div>
                     <div className="flex items-center space-x-4 mb-10"><Wand2 className="text-pink-500 w-8 h-8" /><h3 className="text-2xl font-black tracking-tighter">Rédaction assistée IA</h3></div>
                     
                     <div className="flex space-x-2 p-1.5 bg-white/5 rounded-2xl mb-10 border border-white/5">
                       {['text', 'pdf', 'link'].map(m => (
                         <button key={m} onClick={() => setInputMethod(m as any)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${inputMethod === m ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:text-white'}`}>{m}</button>
                       ))}
                     </div>

                     <div className="space-y-6">
                        {inputMethod === 'text' && <textarea value={rawInput} onChange={e => setRawInput(e.target.value)} placeholder="Contenu brut ici..." className="w-full h-80 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white text-sm focus:ring-4 focus:ring-pink-500/20 outline-none resize-none transition-all" />}
                        {inputMethod === 'pdf' && (
                          <div className="h-80 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-center hover:bg-white/5 relative group/pdf transition-all">
                             <input type="file" onChange={e => setPdfFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                             <FileText className="w-12 h-12 text-slate-500 group-hover/pdf:text-pink-500 transition-colors mb-6" />
                             <p className="text-sm font-bold text-slate-400 group-hover/pdf:text-white transition-colors">{pdfFile ? pdfFile.name : "Déposez votre rapport PDF"}</p>
                          </div>
                        )}
                        {inputMethod === 'link' && <input type="url" value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="URL de l'article..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:ring-4 focus:ring-pink-500/20 outline-none transition-all" />}
                        
                        <button onClick={handleAISuggest} disabled={isGenerating} className="w-full bg-white text-slate-900 font-black py-6 rounded-[2rem] flex items-center justify-center space-x-3 transition-all hover:scale-[1.03] shadow-2xl active:scale-95 disabled:opacity-30">
                          {isGenerating ? <Loader2 className="animate-spin w-6 h-6 text-pink-600" /> : <Sparkles className="w-6 h-6 text-pink-600" />}
                          <span className="uppercase text-xs tracking-widest">Transformer en article</span>
                        </button>
                     </div>
                  </div>
               </div>

               {/* Right Editor */}
               <div className="lg:col-span-3">
                  <div className="bg-white rounded-[4rem] p-12 shadow-xl border border-slate-100 space-y-10">
                     <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2 flex items-center"><Globe className="w-3 h-3 mr-2" /> Titre de l'article</label>
                           <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-[1.5rem] font-black text-slate-900 focus:border-pink-500 transition-all outline-none" />
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2 flex items-center"><UserIcon className="w-3 h-3 mr-2" /> Auteur</label>
                           <input value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-[1.5rem] font-black text-slate-900 focus:border-pink-500 transition-all outline-none" />
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2 flex items-center"><ImageIcon className="w-3 h-3 mr-2" /> URL de l'image de couverture</label>
                        <input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 px-8 py-5 rounded-[1.5rem] font-black text-slate-900 focus:border-pink-500 transition-all outline-none" />
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] ml-2 flex items-center"><Edit className="w-3 h-3 mr-2" /> Corps de contenu (Markdown supporté)</label>
                        <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={12} className="w-full bg-slate-50 border-2 border-slate-100 p-10 rounded-[2.5rem] font-medium text-slate-700 focus:border-pink-500 transition-all outline-none resize-none leading-relaxed" />
                     </div>
                     
                     <div className="flex gap-4">
                        <button onClick={handleSave} className="flex-1 bg-slate-900 text-white font-black py-6 rounded-[2rem] flex items-center justify-center space-x-4 hover:shadow-2xl transition-all active:scale-95 group">
                          <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          <span className="uppercase tracking-widest text-sm">{editingId ? "Actualiser le rapport" : "Publier l'article"}</span>
                        </button>
                        {editingId && <button onClick={resetForm} className="bg-slate-100 text-slate-400 px-10 rounded-[2rem] hover:bg-slate-200 transition-all font-black uppercase text-[10px] tracking-widest">Annuler</button>}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </div>
  );
};
