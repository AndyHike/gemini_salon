import React, { useState } from 'react';
import { Language } from './types';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const [lang, setLang] = useState<Language>('uk');

  return (
    <div className="min-h-screen bg-cream-50 font-sans selection:bg-gold-400 selection:text-white overflow-x-hidden">
      <Navigation lang={lang} setLang={setLang} />
      
      <main>
        <Hero lang={lang} />
        <Services lang={lang} />
        <Gallery lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
}

export default App;