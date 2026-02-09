import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Language } from './types';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { GalleryPage } from './pages/GalleryPage';

function App() {
  const [lang, setLang] = useState<Language>('uk');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream-50 font-sans selection:bg-gold-400 selection:text-white overflow-x-hidden">
        <Navigation lang={lang} setLang={setLang} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/gallery" element={<GalleryPage lang={lang} />} />
          </Routes>
        </main>

        <Footer lang={lang} />
      </div>
    </BrowserRouter>
  );
}

export default App;