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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await directus.request(readItems('services'));
        // Ensure result is an array before setting state
        if (Array.isArray(result)) {
            setServices(result);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  // Group services by category
  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-cream-50 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            {TRANSLATIONS.our_services[lang]}
          </h2>
          <div className="h-px w-24 bg-gold-400 mx-auto" />
        </div>

        {services.length === 0 ? (
          <div className="text-center text-stone-400 font-light">Loading services...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {categories.map((category, catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h3 className="text-2xl font-serif text-stone-800 mb-8 capitalize border-b border-stone-200 pb-4">
                  {category}
                </h3>
                
                <div className="space-y-8">
                  {services.filter(s => s.category === category).map((service) => (
                    <div key={service.id} className="group cursor-pointer">
                      <div className="flex justify-between items-baseline mb-2 relative">
                        <span className="text-lg font-medium text-stone-800 bg-cream-50 pr-4 relative z-10 group-hover:text-gold-500 transition-colors">
                          {getLocalizedText(service, lang, 'name')}
                        </span>
                        {/* Dotted line filler */}
                        <div className="absolute inset-x-0 bottom-1 border-b border-dotted border-stone-300" />
                        <span className="text-lg font-serif text-stone-600 bg-cream-50 pl-4 relative z-10">
                          {formatPrice(service.price, service.currency)}
                        </span>
                      </div>
                      {/* Optional description support */}
                      <p className="text-sm text-stone-500 italic">
                        {getLocalizedText(service, lang, 'description')}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};