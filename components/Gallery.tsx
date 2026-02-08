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

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const result = await directus.request(readItems('gallery'));
        if (Array.isArray(result)) {
            setItems(result);
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="py-24 bg-cream-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            {TRANSLATIONS.gallery_title[lang]}
          </h2>
          <div className="h-px w-24 bg-gold-400 mx-auto" />
        </div>

        {items.length === 0 ? (
           <div className="text-center text-stone-400 font-light">Loading gallery...</div>
        ) : (
            /* Masonry CSS Grid */
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {items.map((item, index) => (
                <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="break-inside-avoid relative group overflow-hidden"
                >
                <img
                    src={getImageUrl(item.image)}
                    alt={item.alt}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500" />
                </motion.div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
};