import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { LegalNotice } from './pages/LegalNotice';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Admin } from './pages/Admin';
import { BlogPost } from './services/blogService';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigate = (page: string) => {
    if (page !== '/blog') {
      setSelectedPost(null);
    }
    // Handle old format to new format
    const path = page.startsWith('/') ? page : (page === 'home' ? '/' : `/${page}`);
    navigate(path);
  };

  const openBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    navigate('/blog');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} onOpenPost={openBlogPost} />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog initialPost={selectedPost} onClearInitialPost={() => setSelectedPost(null)} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal" element={<LegalNotice />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home onNavigate={handleNavigate} onOpenPost={openBlogPost} />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
