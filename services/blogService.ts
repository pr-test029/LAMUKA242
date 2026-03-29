
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

export const fetchAllPosts = async (forceRefresh: boolean = false): Promise<BlogPost[]> => {
  const now = Date.now();
  if (!forceRefresh && cachedPosts && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedPosts;
  }

  try {
    // REPRODUCTION FIX: Only simple fetch from Firestore. No more auto-migration/duplication.
    const q = query(collection(db, "posts"), orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    const dbPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
    
    cachedPosts = dbPosts;
    lastFetchTime = now;
    return cachedPosts;
  } catch (e) {
    console.error("Firestore error in fetchAllPosts", e);
    return [];
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
  const postRef = doc(db, "posts", postId);
  const { id, date, created_at, ...cleanData } = postData as any;
  await updateDoc(postRef, {
    ...cleanData,
    updated_at: new Date().toISOString()
  });
  cachedPosts = null; // Invalidate cache
};

export const deletePost = async (postId: string) => {
  // CRITICAL FIX: Direct deletion without any "static" logic.
  try {
    await deleteDoc(doc(db, "posts", postId));
    cachedPosts = null; // Invalidate cache
    console.log(`Article ${postId} deleted definitively from Firestore.`);
  } catch (error) {
    console.error("Error deleting document from Firestore: ", error);
    throw error;
  }
};

export const incrementViews = async (postId: string) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { views: increment(1) });
  } catch (e) { console.warn("Could not increment views"); }
};

export const toggleLike = async (postId: string) => {
  try {
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { likes: increment(1) });
  } catch (e) { console.warn("Could not toggle like"); }
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
