import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data';
import { Service, directus } from '../lib/directus';
import { readItems } from '@directus/sdk';
import { getLocalizedText, formatPrice } from '../utils';
import { motion } from 'framer-motion';

interface ServicesProps {
  lang: Language;
}

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await directus.request(readItems('services', {
          sort: ['category_id', 'id'] // Changed sort from category to category_id
        }));
        if (Array.isArray(result)) {
            setServices(result);
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError(true);
      }
    };

    fetchServices();
  }, []);

  // Using category_id for grouping as per DB field names
  const categories = Array.from(new Set(services.map(s => s.category_id)));

  if (error && services.length === 0) {
      return (
          <section className="py-24 text-center text-stone-400 font-light">
              <p>Please check your Directus connection.</p>
          </section>
      );
  }

  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-cream-50 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-gold-500 uppercase tracking-[0.4em] text-xs mb-4 block font-bold">Pricelist</span>
          <h2 className="font-serif text-4xl md:text-6xl text-stone-900 mb-6 italic">
            {TRANSLATIONS.our_services[lang]}
          </h2>
          <div className="h-px w-20 bg-gold-400 mx-auto opacity-40" />
        </div>

        <div className="space-y-24">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <h3 className="text-2xl font-serif text-stone-900 mb-10 capitalize tracking-[0.2em] flex items-center gap-6">
                <span className="shrink-0">{category}</span>
                <span className="h-px w-full bg-stone-200" />
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {services.filter(s => s.category_id === category).map((service) => (
                  <div 
                    key={service.id} 
                    className="group flex justify-between items-end border-b border-stone-100 pb-5 pt-2 hover:bg-white hover:px-4 -mx-4 transition-all duration-300 rounded-xl"
                  >
                    <div className="pr-8 flex-1">
                      <h4 className="text-lg md:text-xl font-medium text-stone-800 group-hover:text-gold-500 transition-colors duration-300 mb-1">
                        {getLocalizedText(service, lang, 'name')}
                      </h4>
                      {/* Fixed HTML Rendering with line-clamp and break-words */}
                      <div 
                        className="text-stone-500 text-sm font-light break-words line-clamp-2 prose-sm prose-stone"
                        dangerouslySetInnerHTML={{ __html: getLocalizedText(service, lang, 'description') }}
                      />
                    </div>
                    
                    {/* Rigid Price Alignment */}
                    <div className="text-gold-500 font-serif text-xl md:text-2xl whitespace-nowrap shrink-0 ml-4 mb-1">
                      {formatPrice(service.price)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};