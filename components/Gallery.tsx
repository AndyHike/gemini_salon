import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { GalleryItem, directus, getImageUrl } from '../lib/directus';
import { readItems } from '@directus/sdk';
import { motion } from 'framer-motion';

interface GalleryProps {
  lang: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const result = await directus.request(readItems('gallery'));
        if (Array.isArray(result)) {
            setItems(result);
        }
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
        setError(true);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="py-32 bg-cream-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-24">
          <span className="text-gold-500 uppercase tracking-[0.3em] text-sm mb-4 block">Portfolio</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">
            {TRANSLATIONS.gallery_title[lang]}
          </h2>
          <div className="h-px w-24 bg-gold-400 mx-auto opacity-50" />
        </div>

        {items.length === 0 ? (
           <div className="text-center text-stone-400 font-light">
             {error ? "Connect your Directus instance to see images" : "Discovering beauty..."}
           </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative group aspect-[4/5] overflow-hidden rounded-2xl shadow-xl shadow-stone-200/50"
                >
                  <img
                      src={getImageUrl(item.image)}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Luxury Overlay */}
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="border border-white/30 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-white text-xs tracking-[0.4em] uppercase font-bold">Luxe Salon</span>
                    </div>
                  </div>
                </motion.div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
};