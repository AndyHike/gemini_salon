import React, { useState, useEffect } from 'react';
import { Language, NavItem } from '../types';
import { NAV_ITEMS } from '../data';
import { getLocalizedText } from '../utils';
import { Menu, X, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = (l: Language) => {
    setLang(l);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream-50/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="p-2 border border-stone-800 rounded-full group-hover:border-gold-400 transition-colors">
            <Scissors className="w-5 h-5 text-stone-900 group-hover:text-gold-400 transition-colors" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-widest text-stone-900">LUXE</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm uppercase tracking-widest hover:text-gold-400 transition-colors duration-300"
              >
                {getLocalizedText(item, lang, 'label')}
              </a>
            ))}
          </div>
          
          <div className="h-4 w-px bg-stone-300 mx-2" />

          {/* Lang Switcher */}
          <div className="flex gap-3 text-xs font-bold tracking-widest">
            {(['en', 'uk', 'cs'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => toggleLang(l)}
                className={`${
                  lang === l ? 'text-stone-900 underline decoration-gold-400 decoration-2 underline-offset-4' : 'text-stone-400 hover:text-stone-600'
                } transition-all uppercase`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-stone-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream-50 border-t border-stone-200"
          >
            <div className="flex flex-col p-6 gap-6 items-center">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif hover:text-gold-400"
                >
                  {getLocalizedText(item, lang, 'label')}
                </a>
              ))}
              <div className="flex gap-6 pt-4 border-t border-stone-200 w-full justify-center">
                {(['en', 'uk', 'cs'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => toggleLang(l)}
                    className={`uppercase font-bold ${lang === l ? 'text-gold-400' : 'text-stone-400'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};