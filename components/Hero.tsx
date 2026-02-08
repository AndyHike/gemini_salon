import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { motion } from 'framer-motion';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2072&auto=format&fit=crop"
          alt="Luxury Salon Interior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-stone-900/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream-50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block text-gold-400 tracking-[0.3em] text-sm md:text-base mb-4 uppercase font-bold">
            Est. 2024
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
            {TRANSLATIONS.hero_title[lang]}
          </h1>
          <p className="text-stone-100 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto tracking-wide">
            {TRANSLATIONS.hero_subtitle[lang]}
          </p>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block border border-white text-white px-10 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-colors duration-300"
          >
            {TRANSLATIONS.book_now[lang]}
          </motion.a>
        </motion.div>
      </div>
      
      {/* Decorative Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-stone-400 hidden md:block" />
    </section>
  );
};