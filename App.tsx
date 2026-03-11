
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { LegalNotice } from './pages/LegalNotice';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { BlogPost } from './services/blogService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page !== 'blog') {
      setSelectedPost(null);
    }
    window.scrollTo(0, 0);
  };

  const openBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentPage('blog');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={handleNavigate} onOpenPost={openBlogPost} />;
      case 'about': return <About />;
      case 'services': return <Services />;
      case 'blog': return (
        <Blog 
          initialPost={selectedPost} 
          onClearInitialPost={() => setSelectedPost(null)} 
        />
      );
      case 'contact': return <Contact />;
      case 'legal': return <LegalNotice />;
      case 'privacy': return <PrivacyPolicy />;
      default: return <Home onNavigate={handleNavigate} onOpenPost={openBlogPost} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
