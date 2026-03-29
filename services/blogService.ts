
import { 
  db, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc, 
  increment,
  getDoc 
} from './firebase';

export interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image_url: string;
  category: string;
  read_time: string;
  created_at: string;
  views?: number;
  likes?: number;
}

// In-memory cache to avoid redundant network calls
let cachedPosts: BlogPost[] | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION = 30000; // 30 seconds

export const STATIC_REPORTS: BlogPost[] = [
  {
    id: "static_st_1",
    title: "Les Fondements de LAMUKA : Statuts et Règlement Intérieur",
    excerpt: "Adoptés en mai 2024, ces documents définissent notre cadre d'action pour la défense des droits des femmes handicapées.",
    content: `<h3>Une Structure Solide pour un Impact Réel</h3><p>Le 4 mai 2024, lors de l'Assemblée Générale Constitutive à Brazzaville, le Collectif LAMUKA a officiellement adopté ses textes fondamentaux.</p>`,
    date: "04 Mai 2024",
    author: "NDAMBA Paul",
    image_url: "https://images2.imgbox.com/0f/ef/WaPp5wTw_o.jpg",
    category: "Institutionnel",
    read_time: "5 min",
    created_at: "2024-05-04T09:00:00Z",
    views: 124,
    likes: 12
  },
  {
    id: "static_rp_1",
    title: "Rapport d'activités : Brazzaville en Action (4ème Trimestre 2025)",
    excerpt: "Bilan des mois d'octobre à décembre 2025 : Plaidoyer international et santé reproductive.",
    content: `<h3>Octobre 2025 : Plaidoyer et Inclusion</h3><p>Participation à la causerie débat de l'Association Congolaise de Droit et Santé.</p>`,
    date: "31 Déc. 2025",
    author: "NDAMBA Paul",
    image_url: "https://images2.imgbox.com/58/64/spiZWNSY_o.jpeg",
    category: "Rapport",
    read_time: "12 min",
    created_at: "2025-12-31T18:00:00Z",
    views: 89,
    likes: 8
  }
];

export const fetchAllPosts = async (forceRefresh: boolean = false): Promise<BlogPost[]> => {
  const now = Date.now();
  if (!forceRefresh && cachedPosts && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedPosts;
  }

  try {
    const q = query(collection(db, "posts"), orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    const dbPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
    
    // Consistent merge to ensure all static and DB articles are present
    const titles = new Set(dbPosts.map(p => p.title.toLowerCase().trim()));
    const merged = [...dbPosts];
    for (const s of STATIC_REPORTS) {
      if (!titles.has(s.title.toLowerCase().trim())) {
        merged.push(s);
      }
    }
    
    cachedPosts = merged.sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    lastFetchTime = now;
    return cachedPosts;
  } catch (e) {
    console.warn("Firestore fetch error, fallback to static", e);
    return STATIC_REPORTS;
  }
};

export const createPost = async (postData: Omit<BlogPost, 'id' | 'date' | 'created_at'>) => {
  const docRef = await addDoc(collection(db, "posts"), {
    ...postData,
    date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
    views: 0,
    likes: 0,
    created_at: new Date().toISOString()
  });
  cachedPosts = null; // Invalidate cache
  return docRef.id;
};

export const updatePost = async (postId: string, postData: Partial<BlogPost>) => {
  if (postId.startsWith('static_')) return;
  const postRef = doc(db, "posts", postId);
  const { id, date, created_at, ...cleanData } = postData as any;
  await updateDoc(postRef, {
    ...cleanData,
    updated_at: new Date().toISOString()
  });
  cachedPosts = null; // Invalidate cache
};

export const deletePost = async (postId: string) => {
  if (postId.startsWith('static_')) return;
  await deleteDoc(doc(db, "posts", postId));
  cachedPosts = null; // Invalidate cache
};

export const incrementViews = async (postId: string) => {
  if (postId.startsWith('static_')) return;
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, { views: increment(1) });
};

export const toggleLike = async (postId: string) => {
  if (postId.startsWith('static_')) return;
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, { likes: increment(1) });
};

export const fetchSiteStats = async () => {
  const posts = await fetchAllPosts();
  let totalViews = 0;
  let totalLikes = 0;
  
  posts.forEach(p => {
    totalViews += (p.views || 0);
    totalLikes += (p.likes || 0);
  });

  return {
    totalArticles: posts.length,
    totalViews,
    totalLikes,
    topPosts: [...posts].sort((a,b) => (b.views||0) - (a.views||0)).slice(0, 5)
  };
};

// Comments service
export const fetchComments = async (postId: string) => {
  try {
    const q = query(
      collection(db, `posts/${postId}/comments`), 
      orderBy("created_at", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch { return []; }
};

export const addComment = async (postId: string, comment: { author: string, text: string }) => {
  await addDoc(collection(db, `posts/${postId}/comments`), {
    ...comment,
    created_at: new Date().toISOString()
  });
};
