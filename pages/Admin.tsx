
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { LayoutDashboard, Plus, Image as ImageIcon, LogOut, Save, Trash2, Edit, Eye, BarChart3 } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  category: string;
  views: number;
  created_at: string;
}

export const Admin: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [posts, setPosts] = useState<Post[]>([]);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Editor State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Actualité',
    author: 'Paul NDAMBA',
    read_time: '5 min',
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) fetchPosts();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchPosts();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, category, views, created_at')
      .order('created_at', { ascending: false });
    
    if (data) setPosts(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Vous devez sélectionner une image.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      setFormData({ ...formData, image_url: data.publicUrl });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) return alert("Le titre et le contenu sont obligatoires");

    const payload = { ...formData };
    
    let error;
    if (editingId) {
       const { error: err } = await supabase.from('posts').update(payload).eq('id', editingId);
       error = err;
    } else {
       const { error: err } = await supabase.from('posts').insert([payload]);
       error = err;
    }

    if (error) {
      alert("Erreur lors de la sauvegarde: " + error.message);
    } else {
      setView('list');
      setEditingId(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'Actualité',
        author: 'Paul NDAMBA',
        read_time: '5 min',
        image_url: ''
      });
      fetchPosts();
    }
  };

  const handleEdit = async (id: number) => {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single();
    if (data) {
      setFormData({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        author: data.author,
        read_time: data.read_time,
        image_url: data.image_url
      });
      setEditingId(id);
      setView('edit');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      await supabase.from('posts').delete().eq('id', id);
      fetchPosts();
    }
  };

  // --- LOGIN VIEW ---
  if (!session) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">LAMUKA Admin</h1>
            <p className="text-slate-500">Connectez-vous pour gérer le site</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="text-pink-600" />
          <span className="font-bold text-slate-900 text-lg">Tableau de Bord</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-500 hidden md:inline">{session.user.email}</span>
          <button 
            onClick={handleLogout}
            className="flex items-center text-slate-600 hover:text-red-600 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4 mr-1" /> Déconnexion
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        
        {view === 'list' && (
          <div className="space-y-8 animate-fade-in">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Articles</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-2">{posts.length}</h3>
                  </div>
                  <div className="p-3 bg-pink-50 rounded-xl text-pink-600">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Vues Totales</p>
                    <h3 className="text-3xl font-black text-slate-900 mt-2">
                      {posts.reduce((acc, curr) => acc + (curr.views || 0), 0)}
                    </h3>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-pink-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-center items-center text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => setView('edit')}>
                <Plus className="w-8 h-8 mb-2" />
                <span className="font-bold">Nouvel Article</span>
              </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">Vos Publications</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Titre</th>
                      <th className="px-6 py-4 font-semibold">Catégorie</th>
                      <th className="px-6 py-4 font-semibold text-center">Vues</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{post.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-slate-500">
                           <div className="flex items-center justify-center space-x-1">
                             <BarChart3 className="w-3 h-3" />
                             <span>{post.views}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => handleEdit(post.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {posts.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">Aucun article pour le moment.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* EDITOR VIEW */}
        {view === 'edit' && (
          <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? 'Modifier l\'article' : 'Créer un nouvel article'}
              </h2>
              <button onClick={() => { setView('list'); setEditingId(null); }} className="text-slate-500 hover:text-slate-800 font-medium">
                Annuler
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Titre de l'article</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                      placeholder="Ex: Lancement de la campagne..."
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Catégorie</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none bg-white"
                    >
                      <option>Actualité</option>
                      <option>Témoignage</option>
                      <option>Santé</option>
                      <option>Droit</option>
                      <option>Campagne</option>
                      <option>Innovation</option>
                      <option>Partenariat</option>
                    </select>
                 </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Image de couverture</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div className="text-pink-600 font-bold animate-pulse">Téléchargement en cours...</div>
                  ) : formData.image_url ? (
                    <div className="relative h-48 w-full">
                       <img src={formData.image_url} alt="Aperçu" className="h-full w-full object-contain rounded-lg" />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold opacity-0 hover:opacity-100 transition-opacity rounded-lg">Changer l'image</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-slate-400">
                      <ImageIcon className="w-10 h-10 mb-2" />
                      <span className="font-medium">Cliquez pour ajouter une image</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Résumé (Apparaît sur la carte)</label>
                <textarea 
                  value={formData.excerpt}
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                  placeholder="Un bref résumé accrocheur..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Contenu (HTML supporté)</label>
                <div className="text-xs text-gray-400 mb-2">Utilisez des balises &lt;p&gt;, &lt;h3&gt;, &lt;b&gt; pour formater votre texte.</div>
                <textarea 
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all font-mono text-sm"
                  placeholder="<p>Votre paragraphe ici...</p>"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={handleSave}
                  className="px-8 py-4 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Publier l'article
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
