import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { GalleryItem, directus, getImageUrl } from '../lib/directus';
import { readItems } from '@directus/sdk';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { FadeImage } from '../components/FadeImage';

interface GalleryPageProps {
  lang: Language;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ lang }) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const fetchFullGallery = async () => {
      try {
        const result = await directus.request(readItems('gallery', {
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

    fetchFullGallery();
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="pt-32 pb-24 bg-cream-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-gold-500 uppercase tracking-[0.4em] text-xs mb-4 block font-bold">Full Portfolio</span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6 italic">
            {TRANSLATIONS.gallery_title[lang]}
          </h1>
          <div className="h-px w-20 bg-gold-400 mx-auto opacity-40" />
        </div>

        {items.length === 0 ? (
           <div className="text-center text-stone-400 font-light py-20 italic">
             {error ? "Database connection issue." : "Unveiling our masterpieces..."}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 12) * 0.05 }}
                  onClick={() => setSelectedImage(item)}
                  className="relative group aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white"
                >
                  <FadeImage
                      src={getImageUrl(item.image)}
                      alt={item.title_uk || 'Salon work'}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Maximize2 className="text-white w-8 h-8 opacity-70" />
                  </div>
                </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-stone-900/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} strokeWidth={1.5} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Using FadeImage here too for smooth opening */}
               <FadeImage
                  src={getImageUrl(selectedImage.image)}
                  alt={selectedImage.title_uk}
                  containerClassName="rounded-lg shadow-2xl shadow-black/50"
                  className="max-w-full max-h-[80vh] object-contain"
                />

              <div className="mt-6 text-center text-white">
                <p className="font-serif text-xl italic tracking-wide">{selectedImage.title_uk}</p>
                <div className="h-px w-12 bg-gold-400 mx-auto mt-2 opacity-50" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};