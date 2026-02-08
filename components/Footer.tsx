import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <span className="font-serif text-2xl text-white block mb-2">LUXE</span>
          <p className="text-sm">© {new Date().getFullYear()} Luxe Salon. {TRANSLATIONS.footer_rights[lang]}</p>
        </div>

        <div className="flex gap-6">
            <a href="#" className="hover:text-gold-400 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-gold-400 transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-gold-400 transition-colors"><Twitter className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};