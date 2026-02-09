import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        // Updated fields list: replaced 'alt' with 'title_uk'
        const result = await directus.request(readItems('gallery', {
          limit: 6,
          sort: ['-id'],
          fields: ['id', 'image', 'title_uk']
        }));
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
          <span className="text-gold-500 uppercase tracking-[0.4em] text-xs mb-4 block font-bold">Portfolio</span>
          <h2 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6 italic">
            {TRANSLATIONS.gallery_title[lang]}
          </h2>
          <div className="h-px w-20 bg-gold-400 mx-auto opacity-40" />
        </div>

        {items.length === 0 ? (
           <div className="text-center text-stone-400 font-light py-20 italic">
             {error ? "Please check your Directus connection." : "Curating our best works..."}
           </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
              {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="relative group aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-stone-300/20"
                  >
                    <img
                        src={getImageUrl(item.image)}
                        alt={item.title_uk || 'Gallery item'}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Luxury Overlay */}
                    <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[3px]">
                      <div className="border border-white/20 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-center">
                        <span className="text-white text-[10px] tracking-[0.5em] uppercase font-bold block mb-2 opacity-70">Luxe Salon</span>
                        <div className="h-px w-8 bg-gold-400 mx-auto mb-2" />
                        <span className="text-white text-xs tracking-widest uppercase italic">View Details</span>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>

            {/* Show More Button */}
            <div className="text-center">
              <Link to="/gallery">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-4 border border-stone-800 text-stone-800 text-xs uppercase tracking-[0.3em] font-bold hover:bg-stone-900 hover:text-white transition-all duration-300"
                >
                  Explore All Works
                </motion.button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};